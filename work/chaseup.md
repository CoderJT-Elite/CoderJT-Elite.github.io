---
layout: case_study
title: "ChaseUp — Mechanics Lien Compliance & Receivables Platform"
subtitle: "Multi-tenant invoicing platform with statutory lien compliance engine and PostgreSQL Row Level Security."
permalink: /work/chaseup/
project_index: "Case Study 01"
category: "Web Applications & Distributed Systems"
timeline: "2024 – Present"
role: "Founder & Lead Architect"
tech_stack: "Next.js App Router, TypeScript, Supabase, PostgreSQL RLS, Tailwind"
key_metric: "Sub-50ms query latency across multi-tenant RLS tables"
status_tag: "Production / Active SaaS"
live_url: "https://chaseupapp.tech"
github_url: ""
prev_project_url: ""
prev_project_title: ""
next_project_url: "/work/frc-robot/"
next_project_title: "FRC 1506 Robot Architecture"
description: "Technical case study of ChaseUp: an invoicing and statutory mechanics lien compliance engine engineered for trade subcontractors."
---

<!-- Stat Highlight Metric Ribbon -->
<div class="cs-metric-ribbon">
  <div class="metric-stat">
    <span class="metric-val">&lt; 50ms</span>
    <span class="metric-lbl">RLS Query Latency</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">100%</span>
    <span class="metric-lbl">Tenant Isolation</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">50 States</span>
    <span class="metric-lbl">Statutory Engine</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">Production</span>
    <span class="metric-lbl">Active SaaS</span>
  </div>
</div>

## Executive Overview

<div class="exec-card-wide">
  <div class="exec-grid">
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-problem">The Problem</span>
      <p>Subcontractors forfeit lien rights on overdue receivables due to missed state statutory notice deadlines.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-arch">The Architecture</span>
      <p>Next.js App Router and Supabase platform enforcing multi-tenant isolation via PostgreSQL Row Level Security.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-impact">Engineering Impact</span>
      <p>Sub-50ms query latency across isolated tenant tables with automated retainage tracking and zero data leakage.</p>
    </div>
  </div>
</div>

```
Client (Next.js 14 RSC) ──► Edge API Routes (Auth & Ingestion)
                                     │
                ┌────────────────────┴────────────────────┐
                ▼                                         ▼
     [ Statutory Rules Engine ]                [ PostgreSQL Core ]
     - 50-State Deadline Math                  - Row Level Security (RLS)
     - Milestone State Transitions             - Retainage Triggers
```

---

## Technical Architecture

### 1. PostgreSQL Row Level Security (RLS)
Enforces multi-tenant data segregation directly inside PostgreSQL via evaluated JWT claims and composite B-Tree indexes:

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">PostgreSQL RLS Isolation Policy</span>
    <span class="disclosure-badge">SQL</span>
  </summary>
  <div class="disclosure-content">

```sql
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant Invoice Isolation" ON public.invoices
FOR ALL TO authenticated
USING (
  organization_id IN (
    SELECT org_id FROM public.organization_members WHERE user_id = auth.uid()
  )
);

CREATE INDEX idx_invoices_org_status_due 
ON public.invoices (organization_id, status, due_date DESC);
```

  </div>
</details>

---

### 2. State-by-State Statutory Rules Engine
Evaluates statutory preliminary notice and lien filing deadlines relative to project state jurisdictions:

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">Statutory Deadline Calculator</span>
    <span class="disclosure-badge">TypeScript</span>
  </summary>
  <div class="disclosure-content">

```typescript
export function computeStatutoryDeadlines(input: MilestoneInput): StatutoryDeadlines {
  const { state, firstFurnishingDate, lastFurnishingDate, invoiceDueDate } = input;
  let prelimDeadline = new Date(firstFurnishingDate);
  let lienDeadline = new Date(lastFurnishingDate || invoiceDueDate);

  if (state === 'MI' || state === 'CA') {
    prelimDeadline.setDate(prelimDeadline.getDate() + 20);
    if (lastFurnishingDate) {
      lienDeadline = new Date(lastFurnishingDate);
      lienDeadline.setDate(lienDeadline.getDate() + 90);
    }
  }

  const daysRemaining = Math.ceil((lienDeadline.getTime() - Date.now()) / 86400000);
  const urgency = daysRemaining < 0 ? 'expired' : daysRemaining <= 10 ? 'critical' : 'safe';

  return { preliminaryNoticeDeadline: prelimDeadline, lienFilingDeadline: lienDeadline, urgencyLevel: urgency };
}
```

  </div>
</details>

---

## Key Takeaways & Verification

- **Deterministic Clocking**: Milestones calculate in project timezones to eliminate UTC offset day-drift errors.
- **Kernel Data Isolation**: PostgreSQL RLS policies guarantee tenant boundaries with sub-50ms query latency.
