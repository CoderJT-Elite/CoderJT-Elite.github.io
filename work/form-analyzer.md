---
layout: case_study
title: "Form Analyzer — On-Device Biomechanical ML Feedback"
subtitle: "Rotation-invariant 3D Vector Triad Dot Product geometry and asynchronous inference gating on mobile devices."
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
prev_project_title: "FRC 1506 Robot Architecture"
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
    <span class="metric-val">33 Nodes</span>
    <span class="metric-lbl">3D Spatial Tracking</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">IEEE 2026</span>
    <span class="metric-lbl">Published Paper</span>
  </div>
</div>

## Executive Overview

<div class="exec-card-wide">
  <div class="exec-grid">
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-problem">The Problem</span>
      <p>Cloud-based fitness coaching apps suffer from 200–800ms latency, bandwidth costs, and privacy risks from uploading video feeds.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-arch">The Architecture</span>
      <p>Edge Flutter client combining Google ML Kit pose detection with rotation-invariant 3D Vector Triad geometry and async frame gating.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-impact">Engineering Impact</span>
      <p>Zero cloud latency, 60 FPS viewport smoothness, and verified rotation invariance across oblique camera angles (IEEE ISEC 2026).</p>
    </div>
  </div>
</div>

```
[ Camera YUV420 Stream (60 FPS) ] ──► [ isBusy Inference Guard ]
                                                 │
                     ┌───────────────────────────┴───────────────────────────┐
                     ▼                                                       ▼
           [ Drop Frame (if Busy) ]                                [ Acquire Frame Lock ]
                                                                             │
                                                                             ▼
                                                                [ Google ML Kit 3D Poses ]
                                                                             │
                                                                             ▼
                                                                [ 3D Vector Triad Engine ]
                                                                - Direction Vectors u, v
                                                                - Dot Product Theta Solve
                                                                             │
                                                                             ▼
                                                                [ Biomechanical FSM Cues ]
```

---

## Technical Architecture

### 1. 3D Vector Triad Dot Product Geometry
Evaluates interior joint angles from 3D spatial landmarks $(\vec{u} = P_1 - P_2, \vec{v} = P_3 - P_2)$, eliminating 2D planar foreshortening error:

$$\theta = \arccos\left( \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\| \|\vec{v}\|} \right)$$

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">3D Vector Triad Angle Engine</span>
    <span class="disclosure-badge">Dart</span>
  </summary>
  <div class="disclosure-content">

```dart
class VectorTriadCalculator {
  static double calculateJointAngle({
    required PoseLandmark proximal,
    required PoseLandmark vertex,
    required PoseLandmark distal,
  }) {
    final double ux = proximal.x - vertex.x, uy = proximal.y - vertex.y, uz = proximal.z - vertex.z;
    final double vx = distal.x - vertex.x, vy = distal.y - vertex.y, vz = distal.z - vertex.z;

    final double dotProduct = (ux * vx) + (uy * vy) + (uz * vz);
    final double magU = math.sqrt(ux * ux + uy * uy + uz * uz);
    final double magV = math.sqrt(vx * vx + vy * vy + vz * vz);

    if (magU < 0.0001 || magV < 0.0001) return 180.0;
    final double cosTheta = (dotProduct / (magU * magV)).clamp(-1.0, 1.0);
    return math.acos(cosTheta) * (180.0 / math.pi);
  }
}
```

  </div>
</details>

---

### 2. Asynchronous Inference Gating (`isBusy` Guard)
Prevents backpressure by discarding intermediate camera frames during active neural net evaluation:

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">Asynchronous Frame Locking Service</span>
    <span class="disclosure-badge">Dart</span>
  </summary>
  <div class="disclosure-content">

```dart
class PoseDetectorService {
  final PoseDetector _detector = PoseDetector(options: PoseDetectorOptions(mode: PoseDetectionMode.stream));
  bool _isBusy = false;

  void processCameraImage(CameraImage image, Function(List<Pose>) onPoses) async {
    if (_isBusy) return;
    _isBusy = true;
    try {
      final inputImage = _convertCameraImage(image);
      final poses = await _detector.processImage(inputImage);
      if (poses.isNotEmpty) onPoses(poses);
    } finally {
      _isBusy = false;
    }
  }
}
```

  </div>
</details>

---

## Key Takeaways & Verification

- **Edge Privacy & Latency**: 100% on-device execution delivers instantaneous audio cues with 0 bytes transmitted off-device.
- **Academic Publication**: Peer-reviewed and published at the 16th IEEE Integrated STEM Education Conference (ISEC 2026).

<div style="margin-top: 1rem;">
  <button type="button" class="btn-primary" data-bibtex-id="tewolde2026machine">Cite Paper (BibTeX)</button>
</div>
