# Construction Summary

This document explains how the Sapiens Subscription Services Toolkit was constructed, what is data-driven, and which assumptions underpin the demo.

## Purpose

The demo is a static internal sales/product workspace. It is designed to help a presenter explain a proposed Sapiens subscription packaging model quickly:

1. identify a customer cohort;
2. load a credible starting package;
3. adjust GWP and module scope;
4. show indicative ARR / first-year economics;
5. generate a quote-style preview for discussion.

It is **not** a production CPQ system and does not represent official Sapiens pricing.

## Application structure

- `/` — dashboard and guided starting point.
- `/modules` — services catalog grouped by modular blocks.
- `/cohorts` — customer archetypes and recommended paths.
- `/packages` — two launch package propositions.
- `/configurator` — live configuration and pricing surface.

Shared UI:

- `app/components/SiteHeader.tsx` — responsive header, compact logo, mobile nav, single primary CTA.
- `app/components/SiteFooter.tsx` — internal/caveat footer.
- `app/components/BrandLogo.tsx` — reusable Sapiens logo component.
- `app/components/HelpHint.tsx` — accessible inline explainer/tooltip component.
- `app/components/LifecyclePill.tsx` — Future Platform / Maintain / End-of-Life labels.

Global styling:

- `app/globals.css` holds brand colours, buttons, cards, nav, tooltips, responsive helpers and print styling.

## Data model

The demo is driven from static TypeScript data in `lib/data.ts` and types in `lib/types.ts`.

### Module blocks

`moduleBlocks` defines five commercial blocks:

1. Foundational Core SaaS — required base subscription.
2. Evergreen Platform — continuous updates / regression / version management.
3. Decision & Intelligence — decisioning and AI-related services.
4. Digital & Data Layer — DigitalSuite / DataSuite style services.
5. Premium AMS & Cloud Ops — managed services, cloud operations and migration support.

Each block has:

- `id`
- `name`
- `shortName`
- `description`
- `surchargeLabel`
- `surchargePercent`
- `required`
- `order`

### Modules

`modules` defines the line items that can be selected in the configurator. Each module has:

- `id`
- `name`
- `block`
- `description`
- `type` (`Platform`, `Add-on`, `Professional Service`)
- `basePrice`
- optional `surchargePercent`
- `lifecycle`
- `targetCohorts`
- optional `required` / `recommended`

Required Foundational Core modules are locked in the configurator.

### Cohorts

`cohorts` defines five buyer/customer archetypes:

- Tier 1 Enterprise
- Tier 2–3 Mid-Market
- MGAs & Specialty
- Reinsurance & Global Specialty
- Legacy On-Prem Holdouts

Each cohort includes:

- GWP range and midpoint;
- characteristics;
- recommended path;
- lifecycle mapping;
- recommended package;
- recommended module IDs;
- sales rationale.

### Launch packages

`launchPackages` defines two demo packages:

- Sapiens Horizon
- Sapiens Intelligent

Each package includes target cohorts, included modules, pricing-model copy, timeline, status, value proposition, value bullets, guardrail and surcharge summary.

### Benchmark configurations

`benchmarkConfigs` provides three quick-start scenarios:

- Horizon — Mid-Market Carrier
- Intelligent — Growing MGA
- Intelligent — Tier 1 Hybrid Bridge

These load a cohort, package, module set and GWP in one click.

## Pricing model

Pricing lives in `lib/pricing.ts`.

### Scale factor

The demo uses this formula:

```text
F_scale = 1 + 0.25 × log10(GWP / $10M)
```

It is clamped to `[1.0, 2.2]`.

The reference GWP is `$10,000,000`.

### Calculation steps

For each selected module:

1. `scaled = module.basePrice × F_scale`
2. `surcharge = scaled × module surcharge percentage`
3. Premium AMS modules are grouped into managed cloud / AMS ops.
4. Non-AMS modules contribute to base platform ARR and surcharge ARR.
5. Professional services are estimated as:

```text
$350,000 + $220,000 × (F_scale - 1)
```

6. Annual recurring revenue = base platform ARR + surcharge ARR + cloud/AMS ARR.
7. First-year total = annual recurring revenue + professional services.

## What is real vs illustrative

Real/publicly supported:

- Sapiens is an insurance technology/software company.
- Public positioning includes AI-powered insurance platform language, outcomes such as faster time-to-value, optimised decision-making and personalised experiences.
- Public lines/solution areas include Property & Casualty, Life & Pensions, and Reinsurance.
- Public product/platform terms include IDITSuite for Property & Casualty, CoreSuite for Life & Pensions, DigitalSuite, DataSuite, Decision Management, Reinsurance, Underwriting P&C, Platform for Property & Casualty, Platform for Life & Pensions, and Cloud Services.

Derived/reasonable:

- Grouping public capabilities into Digital & Data, Decision & Intelligence, Cloud Ops and subscription-style modules.
- Customer cohorts based on insurer size, operating complexity and migration profile.
- Lifecycle segmentation language such as Future Platform, Maintain and End of Life.

Illustrative/dummy:

- Package names `Sapiens Horizon` and `Sapiens Intelligent` unless validated by internal Sapiens material.
- June 30 launch date/status.
- All module prices, surcharges, GWP scaling and professional services estimates.
- Quote IDs and quote preview output.
- Fit-warning logic.

## Current limitations

- Static data only; no database or persistence.
- No user accounts or permissions.
- No CRM/CPQ/finance integration.
- No official pricing authority.
- No validated source-of-truth product taxonomy from Sapiens internal teams.
- Public-site terminology research was constrained to visible public content, not internal Sapiens collateral.

## Recommended next steps if this becomes client-facing

1. Replace illustrative package/module/pricing data with Sapiens-approved source data.
2. Add explicit source references for every product and commercial term.
3. Connect to CRM/CPQ or export to a structured proposal format.
4. Add formal accessibility testing.
5. Add authentication and role-based access if used beyond a closed demo.
