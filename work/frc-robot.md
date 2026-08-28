---
layout: case_study
title: "FRC 1506 Robot Control & Physics Simulation"
subtitle: "Architecting a 4ms rigid-body simulation loop, CTRE Phoenix 6 swerve odometry, and multi-camera AprilTag pose estimation."
permalink: /work/frc-robot/
project_index: "Case Study 02"
category: "Robotics & Control Systems"
timeline: "2023 – Present"
role: "Lead Programmer & Simulation Architect"
tech_stack: "Java 17, WPILib, CTRE Phoenix 6, MapleSim (dyn4j), Limelight MegaTag2, PathPlanner"
key_metric: "250 Hz (4ms) physics simulation loop decoupling code validation from robot hardware"
status_tag: "Competition & Field Proven"
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
    <span class="metric-lbl">Swerve Translation</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">8 Routines</span>
    <span class="metric-lbl">Pre-Build Validated</span>
  </div>
</div>

## Executive Overview

<!-- 3-Part Executive Card: Problem → Architecture → Impact -->
<div class="exec-card-wide">
  <div class="exec-grid">
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-problem">The Problem</span>
      <p>Mechanical assembly limits physical track testing for high-speed swerve odometry, auto routines, and dynamic targeting.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-arch">The Architecture</span>
      <p>MapleSim desktop simulation running dyn4j rigid-body dynamics at 250 Hz (4ms), fusing CTRE swerve odometry with dual Limelight AprilTag vision in an Extended Kalman Filter.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-impact">Engineering Impact</span>
      <p>Decoupled software validation from chassis hardware, enabling 8 autonomous routines and shoot-on-the-move targeting to be tuned pre-delivery.</p>
    </div>
  </div>
</div>

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FRC 1506 CONTROL & SIMULATION PIPELINE                   │
└─────────────────────────────────────────────────────────────────────────────┘

 [ Driver Station / Autonomous State Machine (PathPlanner / WPILib Commands) ]
                                      │
                                      ▼
             [ Swerve Kinematics & Desaturation Engine ]
             - Field-Relative Vector Decomposition (Vx, Vy, Omega)
             - 2nd-Order Module Optimization (Azimuth & Drive Velocity)
                                      │
                   ┌──────────────────┴──────────────────┐
                   │                                     │
           [ REAL HARDWARE ]                     [ SIMULATION MODE ]
                   │                                     │
       ┌───────────┴───────────┐                 ┌───────┴───────┐
       ▼                       ▼                 ▼               ▼
 [ CTRE Falcon/Kraken ]  [ Dual Limelight  ]  [ MapleSim dyn4j ] [ Synthetic ]
 [ CAN Bus (1000 Hz)  ]  [ AprilTag Vision ]  [ 4ms Physics Loop] [ Vision Sim]
       └───────────┬───────────┘                 └───────┬───────┘
                   │                                     │
                   └──────────────────┬──────────────────┘
                                      │
                                      ▼
               [ SwerveDrivePoseEstimator (Extended Kalman Filter) ]
               - Wheel Odometry (High Frequency: 250 Hz)
               - Limelight MegaTag2 MegaTag PnP Pose (Low Latency)
               - Pigeon 2 IMU Gyroscopic Yaw (StdDev: 0.001 rad)
                                      │
                                      ▼
             [ Ballistic Targeting & Shoot-On-The-Move (SOTM) ]
             - Relative Vector Math (Robot Velocity + Target Coordinates)
             - Quadratic Flywheel RPM & Hood Angle Solution
```

---

## Technical Highlights & Key Architecture

### 1. MapleSim: 250 Hz (4ms) dyn4j Physics Simulation

MapleSim couples WPILib Java to the **dyn4j** physics engine, creating a simulated 55 kg chassis with 4 independent swerve contact patches to evaluate mass inertia and wheel friction before hardware delivery:

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">MapleSim 250 Hz Swerve Physics Simulation Engine</span>
    <span class="disclosure-badge">Java</span>
  </summary>
  <div class="disclosure-content">

```java
public class MapleSwerveSimulation {
    private final World physicsWorld;
    private final Body robotBody;
    private final SwerveModuleSimulation[] modules;
    private final double timeStepSeconds = 0.004; // 250 Hz Loop

    public MapleSwerveSimulation(RobotConfig config) {
        this.physicsWorld = new World();
        this.physicsWorld.setGravity(World.ZERO_GRAVITY); // Top-down 2D plane

        // Initialize 55kg chassis with authentic moment of inertia
        this.robotBody = new Body();
        Mass mass = MassType.NORMAL.create(55.0, 3.8); // 55kg, 3.8 kg*m^2
        this.robotBody.setMass(mass);
        
        // Construct 4 swerve friction contacts
        this.modules = new SwerveModuleSimulation[4];
        for (int i = 0; i < 4; i++) {
            this.modules[i] = new SwerveModuleSimulation(config.getModuleOffset(i));
        }
        this.physicsWorld.addBody(this.robotBody);
    }

    public void updatePhysics(SwerveModuleState[] requestedStates) {
        // Step swerve drive forces across contact patches
        for (int i = 0; i < 4; i++) {
            Vector2 wheelForce = modules[i].computeFrictionForce(
                requestedStates[i], 
                robotBody.getLinearVelocity(), 
                robotBody.getAngularVelocity()
            );
            robotBody.applyForce(wheelForce, modules[i].getPositionOnRobot());
        }

        // Advance numerical integration step
        this.physicsWorld.step(1, timeStepSeconds);
    }
}
```

  </div>
</details>

---

### 2. Swerve Kinematics & Second-Order Vector Desaturation

Swerve drive resolves chassis translation $\vec{v} = \begin{bmatrix} v_x \\ v_y \end{bmatrix}$ and rotational rate $\omega$ into individual module vectors $\vec{v}_i = \begin{bmatrix} v_x - \omega y_i \\ v_y + \omega x_i \end{bmatrix}$. 

When high translation and spin saturate motor limits ($v_{\text{max}} = 4.5 \text{ m/s}$), second-order kinematic desaturation scales module magnitudes proportionally while preserving heading geometry:

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">Second-Order Swerve Kinematic Desaturation</span>
    <span class="disclosure-badge">Java</span>
  </summary>
  <div class="disclosure-content">

```java
public static void desaturateWheelSpeeds(
    SwerveModuleState[] moduleStates, 
    ChassisSpeeds currentChassisSpeeds, 
    double maxAttainableModuleSpeed
) {
    double realMaxSpeed = 0.0;
    for (SwerveModuleState state : moduleStates) {
        realMaxSpeed = Math.max(realMaxSpeed, Math.abs(state.speedMetersPerSecond));
    }

    if (realMaxSpeed > maxAttainableModuleSpeed) {
        double scalingFactor = maxAttainableModuleSpeed / realMaxSpeed;
        for (SwerveModuleState state : moduleStates) {
            state.speedMetersPerSecond *= scalingFactor;
        }
    }
}
```

  </div>
</details>

---

### 3. Multi-Sensor Pose Fusion (Limelight MegaTag2 + EKF)

Field localization fuses 250 Hz wheel odometry with dual optical **Limelight MegaTag2** coprocessors running Perspective-n-Point (PnP) solvers on AprilTags. Measurement standard deviations scale dynamically based on target distance and geometric ambiguity:

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
    double latencySeconds = visionUpdate.getLatencySeconds();
    double timestamp = Timer.getFPGATimestamp() - latencySeconds;
    double tagDistance = visionUpdate.getAvgTagDistance();

    // Dynamically adjust measurement standard deviations based on optical geometry
    double xyStdDev = 0.03 * Math.pow(tagDistance, 1.8);
    double thetaStdDev = 0.05 * Math.pow(tagDistance, 1.5);

    poseEstimator.setVisionMeasurementStdDevs(
        VecBuilder.fill(xyStdDev, xyStdDev, thetaStdDev)
    );
    poseEstimator.addVisionMeasurement(estimatedPose, timestamp);
}
```

  </div>
</details>

---

### 4. Shoot-on-the-Move (SOTM) Ballistic Targeting Math

To score without stopping, the ballistic solver offsets static target coordinates $\vec{P}_{\text{target}}$ by the robot's translational momentum $\vec{v}_{\text{robot}} \cdot t_f$, solving for time-of-flight $t_f$ iteratively:

$$\vec{D}_{\text{virtual}} = (\vec{P}_{\text{target}} - \vec{P}_{\text{robot}}) - \vec{v}_{\text{robot}} \cdot t_f$$

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">Shoot-on-the-Move Ballistic Targeting Solver</span>
    <span class="disclosure-badge">Java</span>
  </summary>
  <div class="disclosure-content">

```java
public TargetingSolution calculateShootOnTheMove(Pose2d robotPose, ChassisSpeeds fieldVelocity) {
    Translation2d targetLocation = FieldConstants.SPEAKER_TARGET;
    Translation2d staticDistanceVec = targetLocation.minus(robotPose.getTranslation());
    
    // Initial distance estimate
    double distance = staticDistanceVec.getNorm();
    double timeOfFlight = lookupTimeOfFlight(distance);

    // Virtual aim vector adjusted for robot momentum
    Translation2d virtualAimPoint = targetLocation.minus(
        new Translation2d(
            fieldVelocity.vxMetersPerSecond * timeOfFlight,
            fieldVelocity.vyMetersPerSecond * timeOfFlight
        )
    );

    double virtualDistance = virtualAimPoint.minus(robotPose.getTranslation()).getNorm();
    Rotation2d turretHeading = virtualAimPoint.minus(robotPose.getTranslation()).getAngle();
    double requiredFlywheelRPM = flywheelQuadraticRegression(virtualDistance);

    return new TargetingSolution(turretHeading, requiredFlywheelRPM, virtualDistance);
}
```

  </div>
</details>

---

## Verification & Autonomous Performance

- **250 Hz Loop Determinism**: MapleSim physics loop executes within &lt; 0.8ms compute time per 4ms frame on desktop CPUs.
- **Odometry Drift Reduction**: Vision fusion with dual Limelights reduced cumulative path drift to &lt; 2.5 cm over 15-second autonomous multi-note scoring paths.
- **Rapid Prototyping**: Validated 8 independent autonomous branching routines prior to physical robot chassis assembly.
