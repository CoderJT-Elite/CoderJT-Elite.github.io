---
layout: case_study
title: "Neon Racer 3D — Browser WebGL & Vehicle Dynamics"
subtitle: "Rigid-body vehicle dynamics, AWD torque splitting, and 60 FPS Three.js WebGL graphics."
permalink: /work/neon-racer-3d/
project_index: "Case Study 04"
category: "3D Graphics & Physics Simulations"
timeline: "2024"
role: "Graphics & Physics Developer"
tech_stack: "Three.js, Cannon-es, WebGL, JavaScript, Vite"
key_metric: "Stable 60 FPS in browser with sub-3MB bundle payload"
status_tag: "Live in Production"
live_url: "https://neon-racer-3d.vercel.app/"
github_url: ""
prev_project_url: "/work/form-analyzer/"
prev_project_title: "Form Analyzer — On-Device ML Coaching"
next_project_url: "/work/water-wrapped/"
next_project_title: "Water Wrapped — Civic Open Data"
description: "Technical case study of Neon Racer 3D: browser-native 3D racing simulation with Cannon-es vehicle dynamics and Three.js WebGL graphics."
---

<!-- Stat Highlight Metric Ribbon -->
<div class="cs-metric-ribbon">
  <div class="metric-stat">
    <span class="metric-val">60.0 FPS</span>
    <span class="metric-lbl">Frame Rate</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">2.4 MB</span>
    <span class="metric-lbl">gzip Payload</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">40 / 60</span>
    <span class="metric-lbl">AWD Torque Split</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">Zero</span>
    <span class="metric-lbl">Game Engines</span>
  </div>
</div>

## Executive Overview

<div class="exec-card-wide">
  <div class="exec-grid">
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-problem">The Problem</span>
      <p>3D web games compiled from heavyweight game engines (Unity/Unreal) impose 50–150MB downloads and GC frame drops.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-arch">The Architecture</span>
      <p>Browser-native Three.js WebGL pipeline combined with Cannon-es raycast suspension, AWD power distribution, and smooth chase camera math.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-impact">Engineering Impact</span>
      <p>Stable 60 FPS rendering on integrated GPUs, sub-3MB bundle payload, and zero runtime garbage collection pauses.</p>
    </div>
  </div>
</div>

```
[ User Input / Gamepad API ] ──► [ Fixed Timestep Physics (Cannon-es @ 60 Hz) ]
                                             │
               ┌─────────────────────────────┴─────────────────────────────┐
               ▼                                                           ▼
     [ Raycast Suspension Math ]                                 [ AWD Torque & Slip Model ]
     - 4 Downward Raycasts                                       - 40% Front / 60% Rear Bias
     - Hooke's Law Spring & Damper                               - Speed-Damped Steering
               │                                                           │
               └─────────────────────────────┬─────────────────────────────┘
                                             ▼
                        [ Transform State Interpolator ]
                                             │
                                             ▼
                        [ Three.js WebGL Render Pipeline ]
                        - Dual-Spring Look-Ahead Camera
                        - Instanced Particle Systems & Shaders
```

---

## Technical Architecture

### 1. Raycast Suspension & Vehicle Dynamics
Casts 4 vertical rays from chassis corners to compute surface contact and apply suspension forces:

$$F_{\text{suspension}} = k \cdot (L_0 - L) - c \cdot v_{\text{suspension}}$$

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">Raycast Suspension Controller</span>
    <span class="disclosure-badge">JavaScript</span>
  </summary>
  <div class="disclosure-content">

```javascript
class VehiclePhysicsController {
  constructor(world, chassisBody) {
    this.vehicle = new CANNON.RaycastVehicle({ chassisBody: chassisBody, indexRightAxis: 0, indexUpAxis: 1, indexForwardAxis: 2 });
    const opts = { radius: 0.35, directionLocal: new CANNON.Vec3(0, -1, 0), suspensionStiffness: 45, suspensionRestLength: 0.4, frictionSlip: 2.8 };

    const hw = 0.85, hl = 1.35, y = -0.1;
    this.vehicle.addWheel({ ...opts, chassisConnectionPointLocal: new CANNON.Vec3(-hw, y, hl) });  // FL
    this.vehicle.addWheel({ ...opts, chassisConnectionPointLocal: new CANNON.Vec3(hw, y, hl) });   // FR
    this.vehicle.addWheel({ ...opts, chassisConnectionPointLocal: new CANNON.Vec3(-hw, y, -hl) }); // BL
    this.vehicle.addWheel({ ...opts, chassisConnectionPointLocal: new CANNON.Vec3(hw, y, -hl) });  // BR
    this.vehicle.addToWorld(world);
  }
}
```

  </div>
</details>

---

### 2. AWD Torque Splitting & Look-Ahead Camera
Splits drive torque 40/60 and tracks chassis motion using exponential look-ahead interpolation:

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">AWD Power &amp; Camera Interpolation</span>
    <span class="disclosure-badge">JavaScript</span>
  </summary>
  <div class="disclosure-content">

```javascript
updateVehicleInputs(inputs, deltaTime) {
  const maxForce = 1800;
  this.vehicle.applyEngineForce(inputs.throttle * maxForce * 0.4, 0); // FL
  this.vehicle.applyEngineForce(inputs.throttle * maxForce * 0.4, 1); // FR
  this.vehicle.applyEngineForce(inputs.throttle * maxForce * 0.6, 2); // BL
  this.vehicle.applyEngineForce(inputs.throttle * maxForce * 0.6, 3); // BR

  const speed = this.vehicle.chassisBody.velocity.length();
  const steer = inputs.steer * 0.48 * Math.max(0.45, 1.0 - (speed / 45.0));
  this.vehicle.setSteeringValue(steer, 0);
  this.vehicle.setSteeringValue(steer, 1);
}
```

  </div>
</details>

---

## Key Takeaways & Verification

- **Frame Rate & Memory**: Continuous 60.0 FPS with zero runtime garbage collection pauses via pre-allocated vector scratchpads.
- **Payload Efficiency**: Entire application (Vite + Three.js + Cannon-es + shaders + SFX) ships at **2.4 MB gzip**.
