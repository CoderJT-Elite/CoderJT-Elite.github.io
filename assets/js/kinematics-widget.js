/**
 * Interactive Engineering Kinematics & Vector Geometry Visualizer
 * Dual Mode:
 *   1. Swerve Drive Kinematics (WPILib / CTRE Phoenix 6 Vector Resolution)
 *   2. 3D Vector Triad Dot Product Geometry (Form Analyzer / IEEE ISEC 2026)
 */

(function () {
  'use strict';

  var canvas, ctx;
  var currentMode = 'swerve'; // 'swerve' | 'triad'
  var animFrameId = null;

  // Swerve State
  var swerveState = {
    vx: 0,        // m/s [-4.5, 4.5]
    vy: 2.5,      // m/s [-4.5, 4.5]
    omega: 1.2,   // rad/s [-6.0, 6.0]
    isDraggingJoy: false,
    trackWidth: 0.6,  // meters (24 inches)
    wheelBase: 0.6,   // meters (24 inches)
    maxSpeed: 4.5     // m/s
  };

  // Vector Triad State (Coordinates in normalized canvas space)
  var triadState = {
    A: { x: 180, y: 80, z: 0, label: 'Proximal (Hip/Shoulder)', drag: false },
    B: { x: 260, y: 220, z: 0, label: 'Vertex (Knee/Elbow)', drag: false },
    C: { x: 380, y: 160, z: 0, label: 'Distal (Ankle/Wrist)', drag: false },
    activePoint: null,
    dragRadius: 18
  };

  function getThemeColors() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      isDark: isDark,
      bg: isDark ? '#16171a' : '#ffffff',
      grid: isDark ? '#23252b' : '#edeae3',
      chassis: isDark ? '#2e3038' : '#e5e2da',
      chassisBorder: isDark ? '#4d505c' : '#b8b4a8',
      wheel: isDark ? '#a1a1aa' : '#4d4b45',
      accent: isDark ? '#e07a38' : '#b45309',
      accentCyan: isDark ? '#38bdf8' : '#0284c7',
      textPrimary: isDark ? '#f4f3ed' : '#141413',
      textMuted: isDark ? '#8c8980' : '#7d7a72',
      vectorLine: isDark ? '#fbbf24' : '#d97706'
    };
  }

  function resizeCanvas() {
    if (!canvas) return;
    var rect = canvas.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
  }

  /* ── 1. Swerve Drive Calculations & Rendering ────────────────── */
  function computeSwerveModules() {
    var L = swerveState.wheelBase;
    var W = swerveState.trackWidth;
    var R = Math.hypot(L, W);

    var vx = swerveState.vx;
    var vy = swerveState.vy;
    var omega = swerveState.omega;

    // Module positions relative to center: FL, FR, BL, BR
    var modules = [
      { id: 'FL', name: 'Front Left',  x: -W/2, y:  L/2 },
      { id: 'FR', name: 'Front Right', x:  W/2, y:  L/2 },
      { id: 'BL', name: 'Back Left',   x: -W/2, y: -L/2 },
      { id: 'BR', name: 'Back Right',  x:  W/2, y: -L/2 }
    ];

    var maxCalculatedSpeed = 0;
    var results = modules.map(function (m) {
      // V_i = V_chassis + omega x r_i
      // V_ix = Vx - omega * y
      // V_iy = Vy + omega * x
      var vix = vx - omega * m.y;
      var viy = vy + omega * m.x;
      var speed = Math.hypot(vix, viy);
      var angleRad = Math.atan2(viy, vix);
      var angleDeg = (angleRad * 180 / Math.PI);
      if (speed > maxCalculatedSpeed) maxCalculatedSpeed = speed;
      return {
        id: m.id,
        name: m.name,
        relX: m.x,
        relY: m.y,
        vx: vix,
        vy: viy,
        speed: speed,
        angleRad: angleRad,
        angleDeg: angleDeg
      };
    });

    // Second-order desaturation if exceeding maxSpeed
    if (maxCalculatedSpeed > swerveState.maxSpeed) {
      var desatRatio = swerveState.maxSpeed / maxCalculatedSpeed;
      results.forEach(function (r) {
        r.speed *= desatRatio;
        r.vx *= desatRatio;
        r.vy *= desatRatio;
      });
    }

    return results;
  }

  function drawSwerveSimulation(width, height) {
    var colors = getThemeColors();
    var cx = width / 2;
    var cy = height / 2;
    var scale = Math.min(width, height) * 0.42; // Scale factor

    // Background & grid
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    var gridSize = 40;
    for (var x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (var y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Chassis Box
    var chassisW = scale * 0.82;
    var chassisH = scale * 0.82;
    ctx.save();
    ctx.translate(cx, cy);

    // Robot Frame
    ctx.fillStyle = colors.chassis;
    ctx.strokeStyle = colors.chassisBorder;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-chassisW/2, -chassisH/2, chassisW, chassisH, 8);
    ctx.fill();
    ctx.stroke();

    // Robot Orientation Indicator (Front triangle)
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.moveTo(0, -chassisH/2 - 14);
    ctx.lineTo(10, -chassisH/2 - 2);
    ctx.lineTo(-10, -chassisH/2 - 2);
    ctx.closePath();
    ctx.fill();

    // Center Coordinate Crosshair
    ctx.strokeStyle = colors.textMuted;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(-chassisW/2, 0);
    ctx.lineTo(chassisW/2, 0);
    ctx.moveTo(0, -chassisH/2);
    ctx.lineTo(0, chassisH/2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Swerve Modules
    var modules = computeSwerveModules();
    modules.forEach(function (mod) {
      // In canvas, y is down, in robotics y is up/forward
      var px = (mod.relX / swerveState.trackWidth) * (chassisW * 0.78);
      var py = -(mod.relY / swerveState.wheelBase) * (chassisH * 0.78);

      ctx.save();
      ctx.translate(px, py);

      // Wheel Pod Mount
      ctx.fillStyle = colors.bg;
      ctx.strokeStyle = colors.chassisBorder;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Steered Wheel (Rotated by angle)
      ctx.save();
      // Robotics angle: 0 = +X (Right), 90 = +Y (Forward). In canvas: 0 = +X, 90 = +Y (Down).
      // Canvas angle = -angleRad
      ctx.rotate(-mod.angleRad);

      ctx.fillStyle = colors.wheel;
      ctx.beginPath();
      ctx.roundRect(-6, -14, 12, 28, 3);
      ctx.fill();

      // Wheel tread pattern
      ctx.strokeStyle = colors.bg;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-6, -5); ctx.lineTo(6, -5);
      ctx.moveTo(-6, 0);  ctx.lineTo(6, 0);
      ctx.moveTo(-6, 5);  ctx.lineTo(6, 5);
      ctx.stroke();

      ctx.restore(); // Steered wheel

      // Velocity Vector Arrow
      var vectorLen = (mod.speed / swerveState.maxSpeed) * 48;
      if (vectorLen > 2) {
        var vxScreen = Math.cos(-mod.angleRad) * vectorLen;
        var vyScreen = Math.sin(-mod.angleRad) * vectorLen;

        ctx.strokeStyle = colors.accent;
        ctx.fillStyle = colors.accent;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(vxScreen, vyScreen);
        ctx.stroke();

        // Arrowhead
        var headAngle = Math.atan2(vyScreen, vxScreen);
        var headLen = 7;
        ctx.beginPath();
        ctx.moveTo(vxScreen, vyScreen);
        ctx.lineTo(vxScreen - headLen * Math.cos(headAngle - Math.PI / 6), vyScreen - headLen * Math.sin(headAngle - Math.PI / 6));
        ctx.lineTo(vxScreen - headLen * Math.cos(headAngle + Math.PI / 6), vyScreen - headLen * Math.sin(headAngle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
      }

      // Module Label
      ctx.fillStyle = colors.textPrimary;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(mod.id, 0, 28);

      ctx.restore(); // Module
    });

    // Center translation/rotation vector
    var chassisSpeed = Math.hypot(swerveState.vx, swerveState.vy);
    if (chassisSpeed > 0.1) {
      var transAngle = Math.atan2(-swerveState.vy, swerveState.vx);
      var cVecLen = (chassisSpeed / swerveState.maxSpeed) * 60;
      var cvx = Math.cos(transAngle) * cVecLen;
      var cvy = Math.sin(transAngle) * cVecLen;

      ctx.strokeStyle = colors.accentCyan;
      ctx.fillStyle = colors.accentCyan;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(cvx, cvy);
      ctx.stroke();

      var chAngle = Math.atan2(cvy, cvx);
      ctx.beginPath();
      ctx.moveTo(cvx, cvy);
      ctx.lineTo(cvx - 8 * Math.cos(chAngle - Math.PI / 6), cvy - 8 * Math.sin(chAngle - Math.PI / 6));
      ctx.lineTo(cvx - 8 * Math.cos(chAngle + Math.PI / 6), cvy - 8 * Math.sin(chAngle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore(); // Center translate

    // Update Telemetry Display in DOM
    updateSwerveTelemetry(modules);
  }

  function updateSwerveTelemetry(modules) {
    var telemetryEl = document.getElementById('swerveTelemetry');
    if (!telemetryEl) return;

    var rowsHtml = modules.map(function (m) {
      return '<tr>' +
        '<td style="font-weight:600;">' + m.id + '</td>' +
        '<td>' + m.speed.toFixed(2) + ' m/s</td>' +
        '<td>' + m.angleDeg.toFixed(1) + '°</td>' +
        '<td>[' + m.vx.toFixed(2) + ', ' + m.vy.toFixed(2) + ']</td>' +
      '</tr>';
    }).join('');

    telemetryEl.innerHTML =
      '<table class="telemetry-table">' +
        '<thead><tr><th>Module</th><th>Speed</th><th>Azimuth</th><th>Vector [Vx,Vy]</th></tr></thead>' +
        '<tbody>' + rowsHtml + '</tbody>' +
      '</table>';
  }

  /* ── 2. Vector Triad Dot Product Calculations & Rendering ────── */
  function computeTriadGeometry() {
    var A = triadState.A;
    var B = triadState.B;
    var C = triadState.C;

    // Direction vectors originating from vertex B
    var ux = A.x - B.x;
    var uy = A.y - B.y;
    var uz = (A.z || 0) - (B.z || 0);

    var vx = C.x - B.x;
    var vy = C.y - B.y;
    var vz = (C.z || 0) - (B.z || 0);

    var dotProduct = (ux * vx) + (uy * vy) + (uz * vz);
    var magU = Math.hypot(ux, uy, uz);
    var magV = Math.hypot(vx, vy, vz);

    var cosTheta = 0;
    var angleRad = 0;
    var angleDeg = 0;

    if (magU > 0.001 && magV > 0.001) {
      cosTheta = Math.max(-1, Math.min(1, dotProduct / (magU * magV)));
      angleRad = Math.acos(cosTheta);
      angleDeg = angleRad * (180 / Math.PI);
    }

    return {
      u: { x: ux, y: uy, z: uz, mag: magU },
      v: { x: vx, y: vy, z: vz, mag: magV },
      dotProduct: dotProduct,
      cosTheta: cosTheta,
      angleRad: angleRad,
      angleDeg: angleDeg
    };
  }

  function drawTriadSimulation(width, height) {
    var colors = getThemeColors();
    var geom = computeTriadGeometry();

    // Canvas background
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, width, height);

    // Subtle coordinate grid
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    var gridSize = 40;
    for (var x = 0; x < width; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (var y = 0; y < height; y += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    var A = triadState.A;
    var B = triadState.B;
    var C = triadState.C;

    // Limb Segment Bones (Vectors)
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    // Segment B -> A (Vector u)
    ctx.beginPath();
    ctx.moveTo(B.x, B.y);
    ctx.lineTo(A.x, A.y);
    ctx.stroke();

    // Segment B -> C (Vector v)
    ctx.beginPath();
    ctx.moveTo(B.x, B.y);
    ctx.lineTo(C.x, C.y);
    ctx.stroke();

    // Angle Arc at Vertex B
    var startAngle = Math.atan2(A.y - B.y, A.x - B.x);
    var endAngle = Math.atan2(C.y - B.y, C.x - B.x);

    // Adjust for proper interior sweep
    var diff = endAngle - startAngle;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;

    ctx.save();
    ctx.strokeStyle = colors.accentCyan;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(B.x, B.y, 42, startAngle, startAngle + diff, diff < 0);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Draw Joint Nodes
    var nodes = [
      { pt: A, name: 'Joint A (Hip)', isVertex: false },
      { pt: B, name: 'Joint B (Knee Vertex)', isVertex: true },
      { pt: C, name: 'Joint C (Ankle)', isVertex: false }
    ];

    nodes.forEach(function (n) {
      ctx.save();
      ctx.fillStyle = n.isVertex ? colors.accent : colors.textPrimary;
      ctx.strokeStyle = colors.bg;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(n.pt.x, n.pt.y, n.isVertex ? 10 : 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Outer ring for dragging feedback
      if (triadState.activePoint === n.pt) {
        ctx.strokeStyle = colors.accentCyan;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(n.pt.x, n.pt.y, 16, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = colors.textPrimary;
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(n.name, n.pt.x + 14, n.pt.y + 4);

      ctx.restore();
    });

    // Angle Overlay Tag near Vertex
    var midArcAngle = startAngle + diff / 2;
    var tagX = B.x + Math.cos(midArcAngle) * 65;
    var tagY = B.y + Math.sin(midArcAngle) * 65;

    ctx.fillStyle = colors.bg;
    ctx.strokeStyle = colors.chassisBorder;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(tagX - 32, tagY - 14, 64, 26, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = colors.accent;
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(geom.angleDeg.toFixed(1) + '°', tagX, tagY + 4);

    // Update DOM telemetry & formula calculation
    updateTriadTelemetry(geom);
  }

  function updateTriadTelemetry(geom) {
    var telemetryEl = document.getElementById('triadTelemetry');
    if (!telemetryEl) return;

    var angle = geom.angleDeg;
    var postureState = 'Neutral Position';
    var badgeClass = 'state-neutral';

    if (angle >= 160) {
      postureState = 'Full Extension (Eccentric Lockout)';
      badgeClass = 'state-extension';
    } else if (angle <= 95 && angle >= 80) {
      postureState = 'Parallel Depth (Optimal Inflection)';
      badgeClass = 'state-optimal';
    } else if (angle < 80) {
      postureState = 'Deep Flexion / Over-compression';
      badgeClass = 'state-flexion';
    }

    telemetryEl.innerHTML =
      '<div class="triad-formula-card">' +
        '<div class="formula-header">' +
          '<span class="formula-badge">Vector Triad Formulation</span>' +
          '<span class="fsm-status ' + badgeClass + '">' + postureState + '</span>' +
        '</div>' +
        '<div class="formula-math">' +
          '<code>' +
            '\\vec{u} = \\langle ' + geom.u.x.toFixed(1) + ', ' + geom.u.y.toFixed(1) + ' \\rangle, \\quad ' +
            '\\vec{v} = \\langle ' + geom.v.x.toFixed(1) + ', ' + geom.v.y.toFixed(1) + ' \\rangle<br>' +
            '\\vec{u} \\cdot \\vec{v} = ' + geom.dotProduct.toFixed(1) + '<br>' +
            '\\|\\vec{u}\\| = ' + geom.u.mag.toFixed(1) + ', \\quad \\|\\vec{v}\\| = ' + geom.v.mag.toFixed(1) + '<br>' +
            '\\theta = \\arccos\\left(\\frac{' + geom.dotProduct.toFixed(1) + '}{' + (geom.u.mag * geom.v.mag).toFixed(1) + '}\\right) = <strong>' + geom.angleDeg.toFixed(2) + '°</strong>' +
          '</code>' +
        '</div>' +
      '</div>';
  }

  /* ── 3. Animation & Rendering Loop ───────────────────────────── */
  function render() {
    if (!canvas || !ctx) return;
    var rect = canvas.getBoundingClientRect();
    var width = rect.width;
    var height = rect.height;

    if (currentMode === 'swerve') {
      drawSwerveSimulation(width, height);
    } else {
      drawTriadSimulation(width, height);
    }

    animFrameId = requestAnimationFrame(render);
  }

  /* ── 4. Interactive Controls & Event Listeners ───────────────── */
  function initEvents() {
    // Mode Switching
    var swerveTab = document.getElementById('tabSwerve');
    var triadTab = document.getElementById('tabTriad');
    var swerveControls = document.getElementById('swerveControlsSection');
    var triadControls = document.getElementById('triadControlsSection');

    function setMode(mode) {
      currentMode = mode;
      if (swerveTab && triadTab) {
        swerveTab.classList.toggle('active', mode === 'swerve');
        swerveTab.setAttribute('aria-selected', mode === 'swerve');
        triadTab.classList.toggle('active', mode === 'triad');
        triadTab.setAttribute('aria-selected', mode === 'triad');
      }
      if (swerveControls) swerveControls.style.display = mode === 'swerve' ? 'block' : 'none';
      if (triadControls) triadControls.style.display = mode === 'triad' ? 'block' : 'none';
      var swerveExplainer = document.getElementById('labExplainerSwerve');
      var triadExplainer = document.getElementById('labExplainerTriad');
      if (swerveExplainer) swerveExplainer.style.display = mode === 'swerve' ? 'flex' : 'none';
      if (triadExplainer) triadExplainer.style.display = mode === 'triad' ? 'flex' : 'none';

      // Auto position triad points cleanly relative to canvas size
      if (mode === 'triad' && canvas) {
        var rect = canvas.getBoundingClientRect();
        var w = rect.width;
        var h = rect.height;
        triadState.A = { x: w * 0.28, y: h * 0.22, z: 0, label: 'Hip' };
        triadState.B = { x: w * 0.48, y: h * 0.65, z: 0, label: 'Knee' };
        triadState.C = { x: w * 0.72, y: h * 0.35, z: 0, label: 'Ankle' };
      }
    }

    if (swerveTab) swerveTab.addEventListener('click', function () { setMode('swerve'); });
    if (triadTab) triadTab.addEventListener('click', function () { setMode('triad'); });

    // Swerve Presets
    document.querySelectorAll('[data-swerve-preset]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-swerve-preset]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var preset = btn.getAttribute('data-swerve-preset');
        if (preset === 'forward') {
          swerveState.vx = 0; swerveState.vy = 3.5; swerveState.omega = 0;
        } else if (preset === 'strafe') {
          swerveState.vx = 3.5; swerveState.vy = 0; swerveState.omega = 0;
        } else if (preset === 'rotate') {
          swerveState.vx = 0; swerveState.vy = 0; swerveState.omega = 4.0;
        } else if (preset === 'orbit') {
          swerveState.vx = 2.5; swerveState.vy = 0; swerveState.omega = 2.2;
        } else if (preset === 'diagonal') {
          swerveState.vx = 2.8; swerveState.vy = 2.8; swerveState.omega = 1.5;
        }
        updateSlidersFromState();
      });
    });

    // Triad Presets
    document.querySelectorAll('[data-triad-preset]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-triad-preset]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        if (!canvas) return;
        var rect = canvas.getBoundingClientRect();
        var w = rect.width;
        var h = rect.height;
        var preset = btn.getAttribute('data-triad-preset');

        if (preset === 'standing') {
          triadState.A = { x: w * 0.5, y: h * 0.15, z: 0, label: 'Hip' };
          triadState.B = { x: w * 0.5, y: h * 0.52, z: 0, label: 'Knee' };
          triadState.C = { x: w * 0.5, y: h * 0.88, z: 0, label: 'Ankle' };
        } else if (preset === 'optimal') {
          triadState.A = { x: w * 0.25, y: h * 0.45, z: 0, label: 'Hip' };
          triadState.B = { x: w * 0.52, y: h * 0.45, z: 0, label: 'Knee' };
          triadState.C = { x: w * 0.52, y: h * 0.85, z: 0, label: 'Ankle' };
        } else if (preset === 'deep') {
          triadState.A = { x: w * 0.24, y: h * 0.55, z: 0, label: 'Hip' };
          triadState.B = { x: w * 0.58, y: h * 0.42, z: 0, label: 'Knee' };
          triadState.C = { x: w * 0.52, y: h * 0.85, z: 0, label: 'Ankle' };
        } else if (preset === 'quarter') {
          triadState.A = { x: w * 0.35, y: h * 0.25, z: 0, label: 'Hip' };
          triadState.B = { x: w * 0.52, y: h * 0.52, z: 0, label: 'Knee' };
          triadState.C = { x: w * 0.52, y: h * 0.85, z: 0, label: 'Ankle' };
        }
      });
    });

    // Swerve Sliders
    var sliderVx = document.getElementById('sliderVx');
    var sliderVy = document.getElementById('sliderVy');
    var sliderOmega = document.getElementById('sliderOmega');

    function updateSlidersFromState() {
      if (sliderVx) sliderVx.value = swerveState.vx;
      if (sliderVy) sliderVy.value = swerveState.vy;
      if (sliderOmega) sliderOmega.value = swerveState.omega;
    }

    if (sliderVx) sliderVx.addEventListener('input', function (e) { swerveState.vx = parseFloat(e.target.value); });
    if (sliderVy) sliderVy.addEventListener('input', function (e) { swerveState.vy = parseFloat(e.target.value); });
    if (sliderOmega) sliderOmega.addEventListener('input', function (e) { swerveState.omega = parseFloat(e.target.value); });

    // Triad Interactive Dragging
    function getCanvasCoords(e) {
      var rect = canvas.getBoundingClientRect();
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function handlePointerDown(e) {
      if (currentMode !== 'triad') return;
      var pos = getCanvasCoords(e);
      var points = [triadState.A, triadState.B, triadState.C];
      for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        if (Math.hypot(pos.x - pt.x, pos.y - pt.y) <= triadState.dragRadius) {
          triadState.activePoint = pt;
          if (e.cancelable) e.preventDefault();
          break;
        }
      }
    }

    function handlePointerMove(e) {
      if (currentMode !== 'triad' || !triadState.activePoint) return;
      var pos = getCanvasCoords(e);
      var rect = canvas.getBoundingClientRect();
      // Clamp within canvas boundaries
      triadState.activePoint.x = Math.max(15, Math.min(rect.width - 15, pos.x));
      triadState.activePoint.y = Math.max(15, Math.min(rect.height - 15, pos.y));
      if (e.cancelable) e.preventDefault();
    }

    function handlePointerUp() {
      triadState.activePoint = null;
    }

    if (canvas) {
      canvas.addEventListener('mousedown', handlePointerDown);
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);

      canvas.addEventListener('touchstart', handlePointerDown, { passive: false });
      window.addEventListener('touchmove', handlePointerMove, { passive: false });
      window.addEventListener('touchend', handlePointerUp);
    }

    window.addEventListener('resize', resizeCanvas);
  }

  /* ── 5. Lifecycle Initialization ─────────────────────────────── */
  function init() {
    canvas = document.getElementById('kinematicsCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resizeCanvas();
    initEvents();
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
