---
layout: case_study
title: "FRC 1506 Robot Control & Physics Simulation"
subtitle: "250 Hz rigid-body physics simulation, CTRE Phoenix 6 swerve odometry, and multi-camera AprilTag pose fusion."
permalink: /work/frc-robot/
project_index: "Case Study 02"
category: "Robotics & Control Systems"
timeline: "2023 – Present"
role: "Lead Programmer & Simulation Architect"
tech_stack: "Java 17, WPILib, CTRE Phoenix 6, MapleSim (dyn4j), Limelight MegaTag2, PathPlanner"
key_metric: "250 Hz (4ms) physics loop decoupling software validation from robot hardware"
status_tag: "Competition Proven"
live_url: ""
github_url: "https://github.com/CoderJT-Elite/2026-Rebuild"
prev_project_url: "/work/chaseup/"
prev_project_title: "ChaseUp — SaaS Compliance Platform"
next_project_url: "/work/form-analyzer/"
next_project_title: "Form Analyzer — On-Device ML Coaching"
description: "Technical case study of FIRST Robotics Team 1506 autonomous control architecture, desktop physics simulation, and multi-sensor pose fusion."
---

<!-- Stat Highlight Metric Ribbon -->
<div class="cs-metric-ribbon">
  <div class="metric-stat">
    <span class="metric-val">250 Hz</span>
    <span class="metric-lbl">4ms Physics Loop</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">&lt; 2.5 cm</span>
    <span class="metric-lbl">15s Odometry Drift</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">4.5 m/s</span>
    <span class="metric-lbl">Swerve Speed</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">8 Routines</span>
    <span class="metric-lbl">Pre-Build Validated</span>
  </div>
</div>

## Executive Overview

<div class="exec-card-wide">
  <div class="exec-grid">
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-problem">The Problem</span>
      <p>Mechanical assembly timelines limit physical track testing for high-speed swerve odometry, autonomous routines, and dynamic targeting.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-arch">The Architecture</span>
      <p>MapleSim desktop simulation running dyn4j physics at 250 Hz, fusing CTRE swerve odometry with dual Limelight vision in an Extended Kalman Filter.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-impact">Engineering Impact</span>
      <p>Decoupled software validation from hardware, enabling 8 autonomous routines and shoot-on-the-move targeting to be tuned pre-delivery.</p>
    </div>
  </div>
</div>

```
[ PathPlanner Autonomous Commands ] ──► [ Swerve Kinematics & Desaturation ]
                                                    │
                 ┌──────────────────────────────────┴──────────────────────────────────┐
                 ▼                                                                     ▼
       [ Physical Robot Hardware ]                                           [ MapleSim dyn4j Sim ]
       - CTRE Kraken/Falcon Swerve                                           - 250 Hz (4ms) Physics Loop
       - Dual Limelight MegaTag2 Vision                                      - Synthetic AprilTag Pipeline
                 │                                                                     │
                 └──────────────────────────────────┬──────────────────────────────────┘
                                                    ▼
                               [ Extended Kalman Filter (EKF) ]
                                                    │
                                                    ▼
                               [ Shoot-on-the-Move Ballistic Math ]
```

---

## Technical Architecture

### 1. MapleSim: 250 Hz dyn4j Physics Simulation
Simulates chassis inertia (55 kg) and 4 swerve contact patches to evaluate pathing routines on desktop CPUs:

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">MapleSim Swerve Physics Simulation Loop</span>
    <span class="disclosure-badge">Java</span>
  </summary>
  <div class="disclosure-content">

```java
public class MapleSwerveSimulation {
    private final World physicsWorld = new World();
    private final Body robotBody = new Body();
    private final SwerveModuleSimulation[] modules = new SwerveModuleSimulation[4];

    public MapleSwerveSimulation(RobotConfig config) {
        physicsWorld.setGravity(World.ZERO_GRAVITY);
        robotBody.setMass(MassType.NORMAL.create(55.0, 3.8));
        for (int i = 0; i < 4; i++) {
            modules[i] = new SwerveModuleSimulation(config.getModuleOffset(i));
        }
        physicsWorld.addBody(robotBody);
    }

    public void updatePhysics(SwerveModuleState[] states) {
        for (int i = 0; i < 4; i++) {
            Vector2 force = modules[i].computeFrictionForce(states[i], robotBody.getLinearVelocity(), robotBody.getAngularVelocity());
            robotBody.applyForce(force, modules[i].getPositionOnRobot());
        }
        physicsWorld.step(1, 0.004); // 250 Hz Loop
    }
}
```

  </div>
</details>

---

### 2. Multi-Sensor Pose Fusion (Limelight MegaTag2 + EKF)
Fuses 250 Hz wheel odometry with dual optical Limelight coprocessors, scaling covariance dynamically based on target distance:

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">Dynamic Optical Covariance Pose Estimator</span>
    <span class="disclosure-badge">Java</span>
  </summary>
  <div class="disclosure-content">

```java
public void addVisionMeasurement(LimelightResults visionUpdate) {
    if (!visionUpdate.hasValidTargets()) return;

    Pose2d estimatedPose = visionUpdate.getBotPose2d();
    double timestamp = Timer.getFPGATimestamp() - visionUpdate.getLatencySeconds();
    double tagDistance = visionUpdate.getAvgTagDistance();

    // Scale measurement standard deviations based on optical distance
    double xyStdDev = 0.03 * Math.pow(tagDistance, 1.8);
    double thetaStdDev = 0.05 * Math.pow(tagDistance, 1.5);

    poseEstimator.setVisionMeasurementStdDevs(VecBuilder.fill(xyStdDev, xyStdDev, thetaStdDev));
    poseEstimator.addVisionMeasurement(estimatedPose, timestamp);
}
```

  </div>
</details>

---

## Key Takeaways & Verification

- **Sim Determinism**: 250 Hz physics loop executes in &lt; 0.8ms compute time per frame, validating 8 auto routines pre-hardware.
- **Odometry Precision**: Multi-camera vision fusion reduced cumulative autonomous path drift to &lt; 2.5 cm over 15-second cycles.
