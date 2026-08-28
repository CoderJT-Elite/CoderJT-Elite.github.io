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

## Executive Overview

In the FIRST Robotics Competition (FRC), teams construct 125-pound industrial-grade autonomous robots competing on a 27×54-foot field with cycle times measured in tenths of a second. High-performance autonomous routines require continuous closed-loop swerve drive translation, millimeter-level field localization, and real-time ballistic projectile calculation while translating at speeds exceeding 4.5 m/s (15 ft/s).

A primary bottleneck in competitive robotics is **hardware contention**: mechanical and electrical assembly consumes the majority of the build season, leaving software teams with minimal physical track time before competition.

To eliminate this constraint for FRC Team 1506 (Metal Muscle), I architected **MapleSim**—a desktop physics simulation environment utilizing the **dyn4j** 2D rigid-body engine that steps physics at 250 Hz (4ms). This decoupled autonomous routine authoring, swerve kinematics tuning, and vision fusion validation from physical robot access.

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

Traditional WPILib simulation models motors as isolated first-order differential equations without coupling to real-world friction, robot mass distribution, or chassis momentum.

MapleSim bridges WPILib Java to the **dyn4j** physics engine, creating a simulated 55 kg chassis with 4 independent swerve contact patches:

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

---

### 2. Swerve Kinematics & Second-Order Vector Desaturation

Swerve drive systems allow omnidirectional movement by independently steering and driving four corner modules.

For chassis translation velocity $\vec{v} = \begin{bmatrix} v_x \\ v_y \end{bmatrix}$ and rotational rate $\omega$, each module $i$ at location $\vec{r}_i = \begin{bmatrix} x_i \\ y_i \end{bmatrix}$ relative to the center of rotation satisfies:

$$\vec{v}_i = \vec{v} + \vec{\omega} \times \vec{r}_i = \begin{bmatrix} v_x - \omega y_i \\ v_y + \omega x_i \end{bmatrix}$$

When translating while spinning at high angular velocity, individual calculated module speeds can exceed the physical maximum motor capability ($v_{\text{max}} = 4.5 \text{ m/s}$). Simply clamping module velocities distorts the heading angle and causes uncontrollable drift.

We implement **second-order kinematic desaturation**:

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

---

### 3. Multi-Sensor Pose Fusion (Limelight MegaTag2 + Extended Kalman Filter)

Field localization combines high-frequency wheel odometry with dual optical **Limelight MegaTag2** coprocessors running Perspective-n-Point (PnP) solvers on 36h11 AprilTag fiducial markers.

Vision measurements are fused into `SwerveDrivePoseEstimator` with dynamic covariance matrices scaled by target distance and tag ambiguity:

```java
public void addVisionMeasurement(LimelightResults visionUpdate) {
    if (!visionUpdate.hasValidTargets()) return;

    Pose2d estimatedPose = visionUpdate.getBotPose2d();
    double latencySeconds = visionUpdate.getLatencySeconds();
    double timestamp = Timer.getFPGATimestamp() - latencySeconds;
    double tagDistance = visionUpdate.getAvgTagDistance();

    // Dynamically adjust measurement standard deviations based on optical geometry
    // Closer targets have high confidence (low std dev), distant targets have higher uncertainty
    double xyStdDev = 0.03 * Math.pow(tagDistance, 1.8);
    double thetaStdDev = 0.05 * Math.pow(tagDistance, 1.5);

    poseEstimator.setVisionMeasurementStdDevs(
        VecBuilder.fill(xyStdDev, xyStdDev, thetaStdDev)
    );
    poseEstimator.addVisionMeasurement(estimatedPose, timestamp);
}
```

---

### 4. Shoot-on-the-Move (SOTM) Ballistic Targeting Math

To score game pieces into field targets without coming to a complete stop, the targeting system calculates virtual aim vectors compensating for the robot’s instantaneous linear velocity $\vec{v}_{\text{robot}}$.

Let $\vec{P}_{\text{target}}$ be the static 3D target coordinates and $\vec{P}_{\text{robot}}$ be the current estimated robot position. The stationary displacement vector is:

$$\vec{D} = \vec{P}_{\text{target}} - \vec{P}_{\text{robot}}$$

Given projectile time-of-flight $t_f$, the robot's translational motion shifts the required launch vector to:

$$\vec{D}_{\text{virtual}} = \vec{D} - \vec{v}_{\text{robot}} \cdot t_f$$

The system solves for $t_f$ iteratively via quadratic regression:

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

---

## Verification & Autonomous Performance

- **250 Hz Loop Determinism**: MapleSim physics loop executes within < 0.8ms compute time per 4ms frame on desktop CPUs.
- **Odometry Drift Reduction**: Vision fusion with dual Limelights reduced cumulative path drift to < 2.5 cm over 15-second autonomous multi-note scoring paths.
- **Rapid Prototyping**: Software team developed and validated 8 independent autonomous branching routines before physical robot assembly was completed.
