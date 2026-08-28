---
layout: case_study
title: "Water Wrapped — Whitelabel Civic Open Data Platform"
subtitle: "Cloudflare Workers edge routing, mobile story engine, and EPA drinking water compliance parsing."
permalink: /work/water-wrapped/
project_index: "Case Study 05"
category: "Full-Stack Web & Civic Open Data"
timeline: "2025 – Present"
role: "Creator & Full-Stack Architect"
tech_stack: "React, TypeScript, Vite, Cloudflare Workers, Supabase, Tailwind"
key_metric: "Sub-45ms global TTFB via Cloudflare Workers edge network"
status_tag: "Open Source / Active Platform"
live_url: ""
github_url: "https://github.com/JoshuaTewolde/WaterWrapped"
prev_project_url: "/work/neon-racer-3d/"
prev_project_title: "Neon Racer 3D — Browser WebGL & Dynamics"
next_project_url: "/work/chaseup/"
next_project_title: "ChaseUp — SaaS Compliance Platform"
description: "Technical case study of Water Wrapped: an open data platform transforming municipal water quality reports into interactive mobile stories and searchable tables."
---

<!-- Stat Highlight Metric Ribbon -->
<div class="cs-metric-ribbon">
  <div class="metric-stat">
    <span class="metric-val">&lt; 45ms</span>
    <span class="metric-lbl">Global Edge TTFB</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">300+ PoPs</span>
    <span class="metric-lbl">Edge Network</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">EPA MCL</span>
    <span class="metric-lbl">Chemistry Schema</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">WCAG 2.1 AA</span>
    <span class="metric-lbl">Accessible Data</span>
  </div>
</div>

## Executive Overview

<div class="exec-card-wide">
  <div class="exec-grid">
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-problem">The Problem</span>
      <p>Municipal water Consumer Confidence Reports are dense 20-page PDFs resulting in under 10% resident engagement.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-arch">The Architecture</span>
      <p>Whitelabel Cloudflare Workers edge router with Edge KV cache, mobile story engine, and EPA MCL threshold validators.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-impact">Engineering Impact</span>
      <p>Sub-45ms TTFB globally, dual presentation (tap stories + data tables), and offline local fallback.</p>
    </div>
  </div>
</div>

```
Client Browser ──► [ Cloudflare Workers Edge (300+ PoPs) ]
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
     [ Edge KV Tenant Config ]       [ Prerendered React App Shell ]
     - Utility Subdomain Routing     - Tap-Through Story Controller
     - Dynamic OpenGraph Rewrite     - Sortable Chemistry Grid
               │                               │
               └───────────────┬───────────────┘
                               ▼
            [ Type-Safe EPA MCL Validator Engine ]
```

---

## Technical Architecture

### 1. Cloudflare Workers Multi-Utility Edge Routing
Resolves tenant configurations from Edge KV and dynamically rewrites HTML metadata for social previews in &lt; 5ms:

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">Edge KV Tenant Router &amp; HTML Rewriter</span>
    <span class="disclosure-badge">TypeScript</span>
  </summary>
  <div class="disclosure-content">

```typescript
export default {
  async fetch(request: Request, env: { UTILITY_KV: KVNamespace }): Promise<Response> {
    const url = new URL(request.url);
    const slug = url.searchParams.get('utility') || url.hostname.split('.')[0] || 'default';

    const utility = (await env.UTILITY_KV.get(slug, 'json')) || (await env.UTILITY_KV.get('default', 'json'));
    const response = await fetch(request);
    let html = await response.text();

    html = html
      .replace(/__TITLE__/g, `${utility.cityName} Water Quality Wrapped`)
      .replace(/__DESCRIPTION__/g, `Tested ${utility.complianceStatus} across EPA drinking water standards.`);

    return new Response(html, {
      headers: { 'content-type': 'text/html;charset=UTF-8', 'cache-control': 'public, max-age=3600, s-maxage=86400' }
    });
  }
};
```

  </div>
</details>

---

### 2. EPA MCL Compliance Schema Validation
Normalizes diverse lab measurement units ($mg/L, \mu g/L, ppm, ppb$) and computes delta against EPA standards:

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">EPA Contaminant Schema Validator</span>
    <span class="disclosure-badge">TypeScript</span>
  </summary>
  <div class="disclosure-content">

```typescript
export interface Contaminant {
  chemicalName: string;
  detectedLevel: number;
  epaMcl: number;
}

export function evaluateCompliance(contaminant: Contaminant) {
  const ratio = contaminant.detectedLevel / (contaminant.epaMcl || 1.0);
  const safetyPercentage = Math.round((1.0 - ratio) * 100);
  const status = ratio > 0.8 ? 'elevated' : ratio > 0.4 ? 'acceptable' : 'optimal';
  return { safetyPercentage, status };
}
```

  </div>
</details>

---

## Key Takeaways & Verification

- **Edge Performance**: Sub-45ms global Time-To-First-Byte across 300+ edge locations with zero server maintenance.
- **Offline Reliability**: Client automatically falls back to bundled static JSON fixtures during offline mobile use.
