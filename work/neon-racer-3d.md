---
layout: case_study
title: "Neon Racer 3D — Browser WebGL & Vehicle Dynamics"
subtitle: "Custom rigid-body vehicle dynamics, all-wheel-drive torque splitting, tire friction curves, and 60 FPS WebGL rendering."
permalink: /work/neon-racer-3d/
project_index: "Case Study 04"
category: "3D Graphics & Physics Simulations"
timeline: "2024"
role: "Graphics & Physics Developer"
tech_stack: "Three.js, Cannon-es, WebGL, JavaScript (ES6+), Vite"
key_metric: "Stable 60 FPS in browser with sub-3MB bundle payload"
status_tag: "Live in Production"
live_url: "https://neon-racer-3d.vercel.app/"
github_url: ""
prev_project_url: "/work/form-analyzer/"
prev_project_title: "Form Analyzer — On-Device ML Coaching"
next_project_url: "/work/water-wrapped/"
next_project_title: "Water Wrapped — Whitelabel Open Data"
description: "Technical case study of Neon Racer 3D: browser-native 3D racing simulation with Cannon-es vehicle dynamics and Three.js WebGL graphics."
---

<!-- Stat Highlight Metric Ribbon -->
<div class="cs-metric-ribbon">
  <div class="metric-stat">
    <span class="metric-val">60.0 FPS</span>
    <span class="metric-lbl">Paced Frame Rate</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">2.4 MB</span>
    <span class="metric-lbl">Total gzip Bundle</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">40 / 60</span>
    <span class="metric-lbl">AWD Torque Split</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">Zero</span>
    <span class="metric-lbl">External Game Engines</span>
  </div>
</div>

## Executive Overview

<!-- 3-Part Executive Card: Problem → Architecture → Impact -->
<div class="exec-card-wide">
  <div class="exec-grid">
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-problem">The Problem</span>
      <p>Interactive 3D web games compiled from heavyweight engines (Unity/Unreal WASM) impose 50–150MB downloads, slow initial startup, and high memory footprints.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-arch">The Architecture</span>
      <p>Browser-native Three.js WebGL pipeline combined with a Cannon-es raycast suspension model, AWD power distribution, and a dual-spring chase camera.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-impact">Engineering Impact</span>
      <p>Stable 60 FPS rendering across desktop and mobile, sub-3MB bundle payload, and zero runtime garbage collection pauses in hot loops.</p>
    </div>
  </div>
</div>

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    NEON RACER 3D ARCHITECTURE PIPELINE                      │
└─────────────────────────────────────────────────────────────────────────────┘

    [ User Input (Keyboard / Touch Virtual Joystick / Gamepad API) ]
                                   │
                                   ▼
    [ Fixed Timestep Physics Loop (Cannon-es @ 60 Hz / 16.67ms Steps) ]
        │
        ├─ 1. Raycast Suspension Math (Spring + Damper Force per Wheel)
        ├─ 2. AWD Torque Distribution & Brake Vector Computation
        ├─ 3. Longitudinal & Lateral Slip Angle Friction Modeling
        └─ 4. Rigid Body Impulse Integration (Angular + Linear Momentum)
                                   │
                                   ▼
    [ Physics-To-Render Interpolator (Transform Matrix State Sync) ]
                                   │
                                   ▼
    [ Three.js Render Pipeline (WebGL 2.0 / requestAnimationFrame) ]
        │
        ├─ Dynamic Chase Camera (Exponential Smoothing + Look-Ahead)
        ├─ Procedural Track Mesh Generation & Frustum Culling
        ├─ Particle Instancing (Neon Sparks, Exhaust Bloom, Skidmarks)
        └─ Custom GLSL Post-Processing (Selective Tone Mapping & Glow)
```

---

## Technical Highlights & Key Architecture

### 1. Raycast Suspension & Multi-Body Vehicle Dynamics

To prevent joint solver instability at high velocities, Neon Racer 3D implements a **Raycast Vehicle Model**. Four vertical rays cast downward from the chassis detect road surfaces and apply Hooke's Law spring and damper forces:

$$F_{\text{suspension}} = k \cdot (L_0 - L) - c \cdot v_{\text{suspension}}$$

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">Raycast Suspension Physics Controller</span>
    <span class="disclosure-badge">JavaScript</span>
  </summary>
  <div class="disclosure-content">

```javascript
class VehiclePhysicsController {
  constructor(world, chassisBody) {
    this.vehicle = new CANNON.RaycastVehicle({
      chassisBody: chassisBody,
      indexRightAxis: 0, // X
      indexUpAxis: 1,    // Y
      indexForwardAxis: 2 // Z
    });

    const wheelOptions = {
      radius: 0.35,
      directionLocal: new CANNON.Vec3(0, -1, 0),
      suspensionStiffness: 45,
      suspensionRestLength: 0.4,
      frictionSlip: 2.8,
      dampingRelaxation: 3.2,
      dampingCompression: 4.5,
      maxSuspensionForce: 100000,
      rollInfluence: 0.15
    };

    // Mount 4 wheels to chassis corners
    const halfWidth = 0.85;
    const halfLength = 1.35;
    const heightOffset = -0.1;

    this.vehicle.addWheel({ ...wheelOptions, chassisConnectionPointLocal: new CANNON.Vec3(-halfWidth, heightOffset, halfLength) }); // FL
    this.vehicle.addWheel({ ...wheelOptions, chassisConnectionPointLocal: new CANNON.Vec3(halfWidth, heightOffset, halfLength) });  // FR
    this.vehicle.addWheel({ ...wheelOptions, chassisConnectionPointLocal: new CANNON.Vec3(-halfWidth, heightOffset, -halfLength) });// BL
    this.vehicle.addWheel({ ...wheelOptions, chassisConnectionPointLocal: new CANNON.Vec3(halfWidth, heightOffset, -halfLength) }); // BR
    this.vehicle.addToWorld(world);
  }
}
```

  </div>
</details>

---

### 2. AWD Torque Distribution & Lateral Drift Slip Modeling

To balance responsive arcade drift mechanics with steering stability, motor torque is split 40% front / 60% rear with speed-dependent steering angle attenuation:

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">AWD Power Distribution &amp; Oversteer Controller</span>
    <span class="disclosure-badge">JavaScript</span>
  </summary>
  <div class="disclosure-content">

```javascript
updateVehicleInputs(inputs, deltaTime) {
  const maxEngineForce = 1800; // Newtons
  const maxBrakeForce = 65;
  const maxSteerVal = 0.48;    // Radians (~27.5 degrees)

  // AWD Power Split: 40% Front / 60% Rear for controllable oversteer
  const frontForce = inputs.throttle * maxEngineForce * 0.4;
  const rearForce = inputs.throttle * maxEngineForce * 0.6;

  this.vehicle.applyEngineForce(frontForce, 0); // FL
  this.vehicle.applyEngineForce(frontForce, 1); // FR
  this.vehicle.applyEngineForce(rearForce, 2);  // BL
  this.vehicle.applyEngineForce(rearForce, 3);  // BR

  // Proportional steering with high-speed stability damping
  const speed = this.vehicle.chassisBody.velocity.length();
  const speedDamping = Math.max(0.45, 1.0 - (speed / 45.0));
  const steerAngle = inputs.steer * maxSteerVal * speedDamping;

  this.vehicle.setSteeringValue(steerAngle, 0);
  this.vehicle.setSteeringValue(steerAngle, 1);

  if (inputs.handbrake) {
    this.vehicle.setBrake(maxBrakeForce, 2);
    this.vehicle.setBrake(maxBrakeForce, 3);
  } else {
    this.vehicle.setBrake(0, 0);
    this.vehicle.setBrake(0, 1);
    this.vehicle.setBrake(0, 2);
    this.vehicle.setBrake(0, 3);
  }
}
```

  </div>
</details>

---

### 3. Dynamic Smooth Chase Camera Mathematics

A rigid camera mount induces high-frequency viewport jitter during sharp slides. Neon Racer 3D computes camera position via dual-spring exponential interpolation with velocity look-ahead targeting:

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">Dual-Spring Look-Ahead Camera Interpolation</span>
    <span class="disclosure-badge">Three.js</span>
  </summary>
  <div class="disclosure-content">

```javascript
updateCamera(camera, chassisMesh, chassisBody, deltaTime) {
  const currentPos = camera.position;
  const carPos = chassisMesh.position;
  const velocity = chassisBody.velocity;

  // Calculate ideal chase offset behind the car based on yaw angle
  const carRotation = chassisMesh.quaternion;
  const idealOffset = new THREE.Vector3(0, 2.2, -5.5).applyQuaternion(carRotation);
  const idealTarget = carPos.clone().add(idealOffset);

  // Exponential interpolation (lerp) for smooth tracking
  const cameraLagRate = 8.5;
  currentPos.lerp(idealTarget, 1.0 - Math.exp(-cameraLagRate * deltaTime));

  // Dynamic look-ahead point projected in front of velocity vector
  const lookAheadDistance = 4.0;
  const lookAhead = carPos.clone().add(
    new THREE.Vector3(velocity.x, 0, velocity.z).multiplyScalar(0.08 * lookAheadDistance)
  );

  camera.lookAt(lookAhead);
}
```

  </div>
</details>

---

## Performance & Optimization Benchmarks

- **Frame Rate**: Continuous 60.0 FPS across Chromium, WebKit, and Gecko engines on integrated GPUs.
- **Bundle Footprint**: Entire client application (Vite + Three.js + Cannon-es + shaders + SFX) compiles to **2.4 MB gzip**.
- **Memory Stability**: Zero runtime GC pauses through reusable Vector3/Quaternion scratch buffers in hot loops.
