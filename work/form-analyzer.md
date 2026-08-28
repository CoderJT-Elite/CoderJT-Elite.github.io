---
layout: case_study
title: "Form Analyzer — On-Device Biomechanical ML Feedback"
subtitle: "Rotation-invariant 3D Vector Triad Dot Product geometry, asynchronous inference gating, and real-time posture coaching on edge devices."
permalink: /work/form-analyzer/
project_index: "Case Study 03"
category: "Edge Computer Vision & Machine Learning"
timeline: "2023 – Present"
role: "Mobile & ML Developer / Researcher"
tech_stack: "Flutter, Dart, Google ML Kit, Android NDK, 3D Vector Geometry"
key_metric: "Zero-latency on-device processing maintaining 30–60 FPS with 0 server transmissions"
status_tag: "Published Research (IEEE ISEC 2026)"
live_url: "https://coderjt-elite.github.io/form_analyzer/"
github_url: ""
research_url: "/about#research"
prev_project_url: "/work/frc-robot/"
prev_project_title: "FRC 1506 Robot Control & Physics Simulation"
next_project_url: "/work/neon-racer-3d/"
next_project_title: "Neon Racer 3D — Browser WebGL & Dynamics"
description: "Technical case study of Form Analyzer: on-device biomechanical pose analysis using 3D Vector Triad Dot Product geometry. Published at IEEE ISEC 2026."
---

<!-- Stat Highlight Metric Ribbon -->
<div class="cs-metric-ribbon">
  <div class="metric-stat">
    <span class="metric-val">30–60 FPS</span>
    <span class="metric-lbl">On-Device Inference</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">0 ms</span>
    <span class="metric-lbl">Cloud Latency</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">33 Landmarks</span>
    <span class="metric-lbl">3D Spatial Tracking</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">IEEE ISEC 2026</span>
    <span class="metric-lbl">Peer-Reviewed Paper</span>
  </div>
</div>

## Executive Overview

<!-- 3-Part Executive Card: Problem → Architecture → Impact -->
<div class="exec-card-wide">
  <div class="exec-grid">
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-problem">The Problem</span>
      <p>Cloud-based fitness analysis applications suffer from 200–800ms round-trip latency, high server streaming costs, and significant user privacy vulnerabilities when transmitting workout footage.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-arch">The Architecture</span>
      <p>Edge Flutter client integrating Google ML Kit pose landmark detectors, a rotation-invariant 3D Vector Triad Dot Product engine, and an asynchronous <code>isBusy</code> frame lock guard.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-impact">Engineering Impact</span>
      <p>Zero cloud latency with local real-time audio coaching, 60 FPS viewport smoothness, and verified rotation invariance across oblique camera angles (IEEE ISEC 2026).</p>
    </div>
  </div>
</div>

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FORM ANALYZER ON-DEVICE PIPELINE                         │
└─────────────────────────────────────────────────────────────────────────────┘

    [ Camera Stream (30–60 FPS RGB YUV420 Image Stream) ]
                             │
                             ▼
    [ Asynchronous Inference Lock (isBusy Guard Gate) ]
        │                                         │
        ├─ (If isBusy == true)                    └─ (If isBusy == false)
        ▼                                         ▼
   [ Drop Frame / Maintain UI Flow ]       [ Acquire Frame Lock ]
                                                  │
                                                  ▼
                                     [ Google ML Kit Pose Detector ]
                                     - 33 3D Spatial Landmarks (X, Y, Z, Prob)
                                     - Coordinate Normalization & Confidence Filter
                                                  │
                                                  ▼
                                     [ 3D Vector Triad Engine ]
                                     - Extract Proximal, Vertex, Distal Nodes
                                     - Direction Vectors u = A - B, v = C - B
                                     - Solve Theta via Law of Cosines Dot Product
                                                  │
                                                  ▼
                                     [ Exercise State Machine (FSM) ]
                                     - Hysteresis Gating (Start -> Eccentric -> 
                                       Inflection -> Concentric -> Rep Complete)
                                     - Depth & Cadence Violation Detection
                                                  │
                                                  ▼
                                     [ Real-Time Audio / UI Feedback ]
                                     - Low-Latency Android Text-To-Speech
                                     - 60 FPS Visual Feedback HUD Overlay
```

---

## Technical Highlights & Mathematical Formulation

### 1. 3D Vector Triad Dot Product Formulation

Standard 2D angular heuristics in mobile apps compute planar angles via $\arctan2(y_2 - y_1, x_2 - x_1)$. However, if a user stands at an oblique angle to the smartphone camera, 2D projections collapse depth, causing perspective foreshortening errors of up to $35^\circ$.

To achieve true **viewpoint and rotation invariance**, Form Analyzer constructs 3D spatial direction vectors from landmark coordinate triads $(P_1, P_2, P_3)$ where $P_2$ represents the joint vertex (e.g. knee or elbow), $P_1$ is the proximal joint (e.g. hip or shoulder), and $P_3$ is the distal joint (e.g. ankle or wrist).

Let $P_i = (x_i, y_i, z_i)$ represent landmark spatial coordinates:

$$\vec{u} = P_1 - P_2 = \begin{bmatrix} x_1 - x_2 \\ y_1 - y_2 \\ z_1 - z_2 \end{bmatrix}, \quad \vec{v} = P_3 - P_2 = \begin{bmatrix} x_3 - x_2 \\ y_3 - y_2 \\ z_3 - z_2 \end{bmatrix}$$

Using the geometric definition of the inner dot product:

$$\vec{u} \cdot \vec{v} = \|\vec{u}\| \|\vec{v}\| \cos\theta \implies \theta = \arccos\left( \frac{u_x v_x + u_y v_y + u_z v_z}{\sqrt{u_x^2 + u_y^2 + u_z^2} \sqrt{v_x^2 + v_y^2 + v_z^2}} \right)$$

<details class="tech-disclosure" open>
  <summary>
    <span class="disclosure-title">3D Vector Triad Dot Product Angle Engine</span>
    <span class="disclosure-badge">Dart</span>
  </summary>
  <div class="disclosure-content">

```dart
class VectorTriadCalculator {
  /// Calculates the interior joint angle in degrees from three 3D landmarks
  static double calculateJointAngle({
    required PoseLandmark proximal,
    required PoseLandmark vertex,
    required PoseLandmark distal,
  }) {
    // 1. Construct relative direction vectors originating from vertex
    final double ux = proximal.x - vertex.x;
    final double uy = proximal.y - vertex.y;
    final double uz = proximal.z - vertex.z;

    final double vx = distal.x - vertex.x;
    final double vy = distal.y - vertex.y;
    final double vz = distal.z - vertex.z;

    // 2. Compute inner dot product
    final double dotProduct = (ux * vx) + (uy * vy) + (uz * vz);

    // 3. Compute vector magnitudes (Euclidean norms)
    final double magU = math.sqrt(ux * ux + uy * uy + uz * uz);
    final double magV = math.sqrt(vx * vx + vy * vy + vz * vz);

    if (magU < 0.0001 || magV < 0.0001) return 180.0;

    // 4. Solve for theta with floating point bounds clamping [-1.0, 1.0]
    final double cosTheta = (dotProduct / (magU * magV)).clamp(-1.0, 1.0);
    final double angleRadians = math.acos(cosTheta);

    return angleRadians * (180.0 / math.pi);
  }
}
```

  </div>
</details>

---

### 2. Asynchronous Inference Lock (`isBusy` Guard)

Smartphone camera sensors deliver image streams at 30 to 60 frames per second. However, running neural network pose estimation on mobile CPU/GPU hardware requires 15–35ms per frame. If frames are queued sequentially without backpressure, the application accumulates an unbounded memory buffer, causing memory pressure and severe UI frame dropping.

We engineered an asynchronous lock pattern (`isBusy` gating) that drops intermediate camera frames while ML inference is executing, keeping the camera preview perfectly smooth at 60 FPS:

<details class="tech-disclosure" open>
  <summary>
    <span class="disclosure-title">Asynchronous isBusy Inference Gating Guard</span>
    <span class="disclosure-badge">Dart</span>
  </summary>
  <div class="disclosure-content">

```dart
class PoseDetectorService {
  final PoseDetector _poseDetector = PoseDetector(
    options: PoseDetectorOptions(
      mode: PoseDetectionMode.stream,
      modelArchitecture: PoseDetectionModel.base,
    ),
  );

  bool _isBusy = false;

  void processCameraImage(CameraImage image, Function(List<Pose>) onPosesDetected) async {
    // If the ML model is currently evaluating a frame, discard new frame to maintain 60 FPS UI
    if (_isBusy) return;
    _isBusy = true;

    try {
      final inputImage = _convertCameraImageToInputImage(image);
      final List<Pose> poses = await _poseDetector.processImage(inputImage);
      if (poses.isNotEmpty) {
        onPosesDetected(poses);
      }
    } catch (e) {
      debugPrint('ML Inference error: $e');
    } finally {
      // Release lock for the next available frame
      _isBusy = false;
    }
  }
}
```

  </div>
</details>

---

### 3. Biomechanical Finite State Machine (FSM)

Repetition counting and form feedback are orchestrated through a deterministic Finite State Machine with hysteresis bands to avoid jitter at boundary angles:

```
[ START / STANDING ]  (Angle >= 160°)
         │
         │ Descending motion
         ▼
  [ ECCENTRIC PHASE ]  (160° > Angle > 95°)
         │
         │ Reached proper depth
         ▼
 [ INFLECTION DEPTH ]  (Angle <= 90°) ────► [ DEPTH ACHIEVED AUDIO CUE ]
         │
         │ Ascending motion
         ▼
 [ CONCENTRIC PHASE ]  (95° < Angle < 160°)
         │
         │ Returned to standing
         ▼
[ REP COMPLETED ]      (Angle >= 160°) ────► [ INCREMENT REP & LOG CADENCE ]
```

---

## Scholarly Publication & Citation

This research was accepted and published at the **16th IEEE Integrated STEM Education Conference (ISEC 2026)**.

<div style="margin: 2rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
  <button type="button" class="btn-primary" data-bibtex-id="tewolde2026machine">
    Cite This Research (BibTeX)
  </button>
  <a href="{{ '/about' | relative_url }}#research" class="btn-link">View All 4 IEEE Publications →</a>
</div>
