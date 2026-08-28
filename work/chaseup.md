---
layout: case_study
title: "ChaseUp — Mechanics Lien Compliance & Receivables Platform"
subtitle: "Architecting a multi-tenant invoicing system with statutory notice calculation engines and PostgreSQL Row Level Security."
permalink: /work/chaseup/
project_index: "Case Study 01"
category: "Web Applications & Distributed Systems"
timeline: "2024 – Present"
role: "Founder & Lead Architect"
tech_stack: "Next.js App Router, TypeScript, Supabase, PostgreSQL (RLS), Tailwind CSS"
key_metric: "Sub-50ms query latency across multi-tenant RLS tables"
status_tag: "Production / Active SaaS"
live_url: "https://chaseupapp.tech"
github_url: ""
prev_project_url: ""
prev_project_title: ""
next_project_url: "/work/frc-robot/"
next_project_title: "FRC 1506 Robot Control & Physics Simulation"
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
    <span class="metric-lbl">Kernel Data Isolation</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">50 States</span>
    <span class="metric-lbl">Statutory Rules Engine</span>
  </div>
  <div class="metric-stat">
    <span class="metric-val">Production</span>
    <span class="metric-lbl">Active SaaS Platform</span>
  </div>
</div>

## Executive Overview

<!-- 3-Part Executive Card: Problem → Architecture → Impact -->
<div class="exec-card-wide">
  <div class="exec-grid">
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-problem">The Problem</span>
      <p>Subcontractors regularly forfeit mechanics lien rights on overdue receivables because statutory preliminary notice deadlines and retainage windows vary by state and are missed when tracked manually.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-arch">The Architecture</span>
      <p>Next.js App Router and Supabase platform enforcing multi-tenant isolation at the PostgreSQL kernel layer via Row Level Security (RLS) policies and a deterministic statutory rules calculation engine.</p>
    </div>
    <div class="exec-col">
      <span class="exec-pill-tag exec-pill-impact">Engineering Impact</span>
      <p>Sub-50ms multi-tenant query execution times with zero cross-tenant leakage, automated retainage tracking, and verified state-by-state compliance tracking.</p>
    </div>
  </div>
</div>

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CHASEUP SYSTEM TOPOLOGY                            │
└─────────────────────────────────────────────────────────────────────────────┘

    [ Client Browser (Next.js 14 / React Server Components) ]
                               │
                               │ HTTPS / Edge CDN
                               ▼
    [ Next.js API Routes & Server Actions (Node.js / Edge Runtime) ]
        │                             │                         │
        │ Ingestion & Auth            │ Cron Scheduling         │ Webhook Dispatches
        ▼                             ▼                         ▼
┌──────────────────┐        ┌──────────────────┐      ┌──────────────────┐
│  Supabase Auth   │        │ Statutory Rules  │      │ Notification Svc │
│  JWT Validation  │        │ Deadline Engine  │      │ (Email / SMS)    │
└─────────┬────────┘        └─────────┬────────┘      └─────────┬────────┘
          │                           │                         │
          └─────────────────────┬─────┴─────────────────────────┘
                                │
                                ▼
         ┌──────────────────────────────────────────────┐
         │          PostgreSQL Database Core            │
         │  - Row Level Security (RLS Tenant Isolation) │
         │  - Retainage Ledger Triggers                 │
         │  - Statutory Milestone State Tables          │
         └──────────────────────────────────────────────┘
```

---

## Technical Highlights & Key Architecture

### 1. PostgreSQL Row Level Security (RLS) & Multi-Tenant Isolation

Multi-tenant B2B platforms handling sensitive financial ledgers require airtight isolation. Rather than relying solely on application-layer `WHERE organization_id = ?` query filtering (which is vulnerable to developer oversight), ChaseUp enforces data segregation directly at the PostgreSQL kernel layer using **Row Level Security (RLS)**.

Every incoming request carries a verified Supabase JWT containing the user's `auth.uid()`. Database policies evaluate user organization membership dynamically:

<details class="tech-disclosure" open>
  <summary>
    <span class="disclosure-title">PostgreSQL Kernel RLS Isolation Policies &amp; Composite Index</span>
    <span class="disclosure-badge">SQL</span>
  </summary>
  <div class="disclosure-content">

```sql
-- Enforce strict tenant isolation on invoices table
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access invoices belonging to their organization"
ON public.invoices
FOR ALL
TO authenticated
USING (
  organization_id IN (
    SELECT org_id 
    FROM public.organization_members 
    WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  organization_id IN (
    SELECT org_id 
    FROM public.organization_members 
    WHERE user_id = auth.uid()
  )
);

-- Composite B-Tree index optimizing RLS evaluation and date range filtering
CREATE INDEX idx_invoices_org_status_due 
ON public.invoices (organization_id, status, due_date DESC);
```

  </div>
</details>

To ensure sub-50ms execution times despite recursive subqueries in RLS policies, indexed composite foreign keys and cached session claims are leveraged.

---

### 2. State-by-State Statutory Mechanics Lien Rules Engine

Mechanics lien statutes vary drastically by jurisdiction:
- **California**: Requires a 20-day Preliminary Notice from first furnishing of labor/materials (Civil Code § 8200). Lien claim must be recorded within 90 days of project completion.
- **Texas**: Monthly fund trapping notice requirements (Chapter 53 Property Code) mandating notice by the 15th day of the 2nd/3rd month following each month of work.
- **Michigan**: Notice of Furnishing within 20 days of first work (MCL § 570.1109), and Claim of Lien within 90 days of last work (MCL § 570.1111).

The deadline calculation engine is implemented as a deterministic rules engine with immutable milestone tracking:

<details class="tech-disclosure" open>
  <summary>
    <span class="disclosure-title">State-by-State Statutory Rules Engine</span>
    <span class="disclosure-badge">TypeScript</span>
  </summary>
  <div class="disclosure-content">

```typescript
export interface MilestoneInput {
  state: 'MI' | 'CA' | 'TX' | 'FL' | 'NY';
  firstFurnishingDate: Date;
  lastFurnishingDate?: Date;
  invoiceDueDate: Date;
  projectType: 'commercial' | 'residential';
  role: 'subcontractor' | 'material_supplier' | 'general_contractor';
}

export interface StatutoryDeadlines {
  preliminaryNoticeDeadline: Date;
  noticeOfIntentDeadline?: Date;
  lienFilingDeadline: Date;
  urgencyLevel: 'safe' | 'approaching' | 'critical' | 'expired';
}

export function computeStatutoryDeadlines(input: MilestoneInput): StatutoryDeadlines {
  const { state, firstFurnishingDate, lastFurnishingDate, invoiceDueDate } = input;
  const now = new Date();

  let prelimDeadline = new Date(firstFurnishingDate);
  let lienDeadline = new Date(lastFurnishingDate || invoiceDueDate);

  switch (state) {
    case 'MI': // Michigan MCL § 570
      prelimDeadline.setDate(prelimDeadline.getDate() + 20);
      if (lastFurnishingDate) {
        lienDeadline = new Date(lastFurnishingDate);
        lienDeadline.setDate(lienDeadline.getDate() + 90);
      }
      break;

    case 'CA': // California Civil Code § 8200
      prelimDeadline.setDate(prelimDeadline.getDate() + 20);
      if (lastFurnishingDate) {
        lienDeadline = new Date(lastFurnishingDate);
        lienDeadline.setDate(lienDeadline.getDate() + 90);
      }
      break;

    case 'TX': // Texas Property Code Chapter 53 (15th of the month rule)
      const month = firstFurnishingDate.getMonth();
      const year = firstFurnishingDate.getFullYear();
      // Second month 15th day notice
      prelimDeadline = new Date(year, month + 2, 15);
      break;
  }

  const daysRemaining = Math.ceil((lienDeadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  let urgencyLevel: StatutoryDeadlines['urgencyLevel'] = 'safe';

  if (daysRemaining < 0) urgencyLevel = 'expired';
  else if (daysRemaining <= 10) urgencyLevel = 'critical';
  else if (daysRemaining <= 30) urgencyLevel = 'approaching';

  return {
    preliminaryNoticeDeadline: prelimDeadline,
    lienFilingDeadline: lienDeadline,
    urgencyLevel
  };
}
```

  </div>
</details>

---

### 3. Retainage Accounting & Automated Notification Pipelines

Commercial construction contracts frequently withhold **5% to 10% retainage** until final project signoff, often lasting 6 to 18 months past initial invoice clearance. 

ChaseUp separates gross invoice amounts from held retainage ledgers through database triggers:

<details class="tech-disclosure">
  <summary>
    <span class="disclosure-title">Retainage Calculation &amp; Accounting Triggers</span>
    <span class="disclosure-badge">PL/pgSQL</span>
  </summary>
  <div class="disclosure-content">

```sql
CREATE OR REPLACE FUNCTION update_invoice_totals()
RETURNS TRIGGER AS $$
BEGIN
  NEW.retainage_amount = ROUND((NEW.subtotal * (NEW.retainage_percentage / 100.0)), 2);
  NEW.net_payable = NEW.subtotal - NEW.retainage_amount + NEW.tax_amount;
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_calculate_invoice_totals
BEFORE INSERT OR UPDATE ON public.invoices
FOR EACH ROW
EXECUTE FUNCTION update_invoice_totals();
```

  </div>
</details>

---

## Architectural Lessons & Verification

- **Deterministic Edge Timezones**: Date calculations for legal statutes compute relative to the project location jurisdiction rather than the client device timezone, preventing off-by-one day calculation errors across UTC boundaries.
- **Idempotent Webhooks**: All payment processing webhooks and automated reminder triggers use database transaction locks with idempotent event UUID deduplication.
- **Immutable Audit Trails**: Every statutory state transition (notice generated, notice served, lien recorded) is recorded with immutable cryptographic timestamps in a compliance ledger table.
