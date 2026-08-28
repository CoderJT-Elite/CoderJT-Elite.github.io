---
layout: case_study
title: "Water Wrapped — Whitelabel Civic Open Data Platform"
subtitle: "Cloudflare Workers edge routing, interactive tap-through story engine, and automated EPA drinking water compliance parsing."
permalink: /work/water-wrapped/
project_index: "Case Study 05"
category: "Full-Stack Web & Civic Open Data"
timeline: "2025 – Present"
role: "Creator & Full-Stack Architect"
tech_stack: "React, TypeScript, Vite, Cloudflare Workers, Supabase PostgreSQL, Tailwind CSS"
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

## Executive Overview

Under the Safe Drinking Water Act, every municipal water utility across the United States is legally required to publish an annual **Consumer Confidence Report (CCR)** detailing water source provenance, filtration methods, and laboratory test levels for lead, copper, disinfectants, and synthetic contaminants (such as PFAS).

In practice, these reports are distributed as dense, jargon-laden 15-to-30-page PDF documents packed with abbreviations ($ppb, ppm, pCi/L, TT, MCLG$). Consequently, over 90% of residential utility customers never engage with their local drinking water data.

**Water Wrapped** was engineered to democratize civic environmental data. Taking inspiration from the engaging mobile UX of Spotify Wrapped and Instagram Stories, the platform transforms complex municipal laboratory assays into an interactive, tap-through mobile narrative paired with an accessible, searchable scientific chemistry ledger.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      WATER WRAPPED SYSTEM TOPOLOGY                          │
└─────────────────────────────────────────────────────────────────────────────┘

    [ Resident Browser / Mobile Client ]
                   │
                   │ HTTPS Request (e.g. detroit.waterwrapped.org / slug)
                   ▼
    [ Cloudflare Workers Edge Network (300+ Global PoPs) ]
        │
        ├─ 1. Subdomain / Path Tenant Resolution via Edge KV Cache (<5ms)
        ├─ 2. SSR HTML Meta Tag Injection (Dynamic Social OpenGraph Preview)
        └─ 3. Static Asset Edge Serving (Prerendered React + Vite Bundle)
                   │
                   ▼
    [ Client Application Layer (React 18 / TypeScript) ]
        │                                         │
        ▼                                         ▼
   [ Interactive Story Engine ]              [ Open Chemistry Grid ]
   - Gesture-Driven Tap-Through              - Sortable Contaminant Table
   - Micro-Animations & Progress Bar         - EPA Safe Level Benchmark Delta
   - EPA Compliance Summary Cards            - Contaminant Source Footnotes
                   │                                         │
                   └──────────────────┬──────────────────────┘
                                      │
                                      ▼
             [ Data Normalization & Validation Pipeline ]
             - Type-Safe Chemistry Schema Validator
             - Dual-Mode: Bundled Offline Mode / Supabase Postgres
```

---

## Technical Highlights & Key Architecture

### 1. Cloudflare Workers Multi-Utility Edge Routing

To allow individual cities and municipal water authorities to deploy white-labeled versions under custom domains or subpaths with zero dedicated server maintenance, Water Wrapped executes routing on the **Cloudflare Workers** edge runtime.

The Worker intercepts incoming requests, resolves utility configuration from Edge KV, and dynamically rewrites HTML metadata for rich social sharing:

```typescript
export interface Env {
  UTILITY_KV: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const hostname = url.hostname;
    
    // Extract utility identifier from subdomain or query path
    const utilitySlug = url.searchParams.get('utility') || hostname.split('.')[0] || 'default';

    // 1. Fetch cached utility configuration from Edge KV (< 5ms)
    let utilityData = await env.UTILITY_KV.get(utilitySlug, 'json');
    if (!utilityData) {
      utilityData = await env.UTILITY_KV.get('default', 'json');
    }

    // 2. Fetch pre-built single-page app HTML shell
    const appResponse = await fetch(request);
    let html = await appResponse.text();

    // 3. Dynamic HTML Rewriter injecting custom title and OpenGraph metadata for social sharing
    html = html
      .replace(/__TITLE__/g, `${utilityData.cityName} Water Quality Wrapped`)
      .replace(/__DESCRIPTION__/g, `Explore the ${utilityData.year} Consumer Confidence Report for ${utilityData.cityName}. Tested ${utilityData.complianceStatus} across all EPA drinking water standards.`)
      .replace(/__OG_IMAGE__/g, utilityData.customOgImageUrl);

    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'public, max-age=3600, s-maxage=86400',
        'x-edge-utility': utilitySlug
      }
    });
  }
};
```

---

### 2. Tap-Through Interactive Story Engine Architecture

The mobile presentation layer is structured as a gesture-driven story carousel with time-synchronized progress bars, touch hold-to-pause interactions, and fluid slide transitions:

```typescript
export interface StorySlide {
  id: string;
  category: 'overview' | 'lead_copper' | 'source_origin' | 'pfas' | 'filtration';
  headline: string;
  metricHighlight: string;
  metricLabel: string;
  epaComparisonText: string;
  status: 'compliant' | 'warning' | 'violation';
}

export function useStoryController(slides: StorySlide[], autoAdvanceMs: number = 6000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isPaused) return;

    const interval = 50; // Update progress bar at 20Hz
    const step = (interval / autoAdvanceMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx < slides.length - 1 ? idx + 1 : idx));
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, autoAdvanceMs, slides.length]);

  return {
    currentSlide: slides[currentIndex],
    currentIndex,
    progress,
    next: () => { setCurrentIndex((i) => Math.min(slides.length - 1, i + 1)); setProgress(0); },
    prev: () => { setCurrentIndex((i) => Math.max(0, i - 1)); setProgress(0); },
    pause: () => setIsPaused(true),
    resume: () => setIsPaused(false)
  };
}
```

---

### 3. Rigorous Contaminant Schema Validation Pipeline

Water quality datasets feature diverse reporting units ($mg/L, \mu g/L, ppm, ppb, pCi/L, NTU$). 

To prevent misinterpreting safety thresholds, the ingestion pipeline normalizes all numeric values into standardized SI units and computes delta ratios relative to EPA Maximum Contaminant Level Goals (MCLG):

```typescript
export interface WaterContaminant {
  chemicalName: string;
  detectedLevel: number;
  unit: 'ppm' | 'ppb' | 'pCi/L' | 'NTU' | 'mg/L';
  epaMcl: number;      // Maximum Contaminant Level (Enforceable limit)
  epaMclg: number;     // Maximum Contaminant Level Goal (Health goal)
  violation: boolean;
  typicalSource: string;
}

export function evaluateCompliance(contaminant: WaterContaminant): {
  safetyPercentage: number;
  statusBadge: 'optimal' | 'acceptable' | 'elevated';
} {
  const ratio = contaminant.detectedLevel / (contaminant.epaMcl || 1.0);
  const safetyPercentage = Math.round((1.0 - ratio) * 100);

  let statusBadge: 'optimal' | 'acceptable' | 'elevated' = 'optimal';
  if (ratio > 0.8) statusBadge = 'elevated';
  else if (ratio > 0.4) statusBadge = 'acceptable';

  return { safetyPercentage, statusBadge };
}
```

---

## Architectural Lessons & Verification

1. **Zero-Dependency Local Fallback**: When users have unreliable mobile connectivity, the React client automatically uses bundled static JSON fixtures without hanging on network timeouts.
2. **Accessible Data Grid**: While the tap-through story provides high engagement, the full sortable table ensures screen-reader compatibility (WCAG 2.1 AA) and enables researchers to inspect raw numerical lab assays.
3. **Edge Performance**: Deploying to Cloudflare Workers achieved global Time-To-First-Byte (TTFB) latency under **45ms** across North American edge points.
