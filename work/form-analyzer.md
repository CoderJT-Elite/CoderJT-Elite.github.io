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
      <p>Cloud-based fitness coaching apps suffer from 200–800ms latency, high streaming costs, and user privacy risks from sending video feeds over the network.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-arch">The Architecture</span>
      <p>Edge Flutter client integrating Google ML Kit pose detection, a rotation-invariant 3D Vector Triad Dot Product engine, and asynchronous <code>isBusy</code> frame locking.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-impact">Engineering Impact</span>
      <p>Zero server latency, 60 FPS viewport smoothness, and verified rotation invariance across oblique camera angles (IEEE ISEC 2026).</p>
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

Planar 2D angular heuristics ($\arctan2$) collapse depth at oblique camera angles, causing foreshortening errors up to $35^\circ$. Form Analyzer evaluates true interior joint angles via 3D direction vectors $(\vec{u}, \vec{v})$ originating at joint vertex $P_2$:

$$\vec{u} = P_1 - P_2, \quad \vec{v} = P_3 - P_2 \implies \theta = \arccos\left( \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\| \|\vec{v}\|} \right)$$

<details class="tech-disclosure">
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

Smartphone camera sensors stream at 30–60 FPS while mobile neural net inference requires 15–35ms per frame. An asynchronous `isBusy` gate discards intermediate frames during active inference, preventing memory pressure and preserving 60 FPS viewport smoothness:

<details class="tech-disclosure">
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

Repetition counting and coaching triggers are orchestrated through a deterministic state machine with angular hysteresis bands to prevent jitter:

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

This research was published at the **16th IEEE Integrated STEM Education Conference (ISEC 2026)**.

<div style="margin: 1.5rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
  <button type="button" class="btn-primary" data-bibtex-id="tewolde2026machine">
    Cite This Research (BibTeX)
  </button>
  <a href="{{ '/about' | relative_url }}#research" class="btn-link">View All 4 IEEE Publications →</a>
</div>
