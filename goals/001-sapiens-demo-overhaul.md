# Goal 001 — Sapiens Demo Overhaul

## Objective
Turn the current thin Next.js demo into a credible internal Sapiens Subscription Services Toolkit that answers the VP request:

> Build a services catalog, model mapping to different customer cohorts, and a simple-to-use but meaty toolkit sales can use to configure the right package.

## Hard constraints
- Work in `/home/minigeek/sapiens-subscription-demo` only.
- Do **not** install, add, upgrade, or regenerate dependencies. Use the current Next.js 16 / React 19 / Tailwind 4 setup and existing lockfile.
- Do not touch secrets or `.env`.
- Do not delete existing work unless replacing it with better implementation.
- Keep it demo-only: no backend, no external APIs.
- Run `npm run lint` and `npm run build` before finishing. Fix failures.
- Commit changes locally when done. Do not push unless instructed by orchestrator.

## Brand guide to apply
Use a polished Sapiens enterprise-SaaS treatment:
- Typography: DM Sans for large headings at 300 weight, Inter for body/UI, Open Sans for small labels.
- Colours: Navy `#0D256F`, deep ink `#050E31`, orange `#FF5900` for primary CTA, cool greys, airy white/blue surfaces.
- Style: light, spacious, professional internal tool. Not a toy SaaS landing page.
- Buttons: clear primary/accent/ghost treatments.
- Cards/tables: crisp, generous spacing, subtle borders/shadows, clean enterprise dashboard feel.
- Logo treatment: use a credible text/logo mark if no asset exists. Do not invent childish iconography.

## Strategy document context
Use this source of truth from `/home/minigeek/162-Playbook/bot/03-finals/sapiens_subscription_strategy.md`:

### Modular catalog blocks
1. Foundational Core SaaS — hosting, security, environments, 24/7 service desk, 99.5% SLA. Base subscription, non-negotiable for all new SaaS customers.
2. Evergreen Platform — continuous updates, automated regression, version management. Add-on +15%.
3. Decision & Intelligence — Sapiens Decision + AI-powered rules and automation. Add-on +20–25%.
4. Digital & Data Layer — DigitalSuite portals + DataSuite real-time analytics. Add-on +15–20%.
5. Premium AMS & Cloud Ops — dedicated support, minor configuration, managed operations. Add-on +15–20%.

### Cohorts
- Tier 1 Enterprise — GWP > $1B. Complex legacy estates, multi-line, long implementation cycles. Slow migration from Maintain → Future Platform.
- Tier 2–3 Mid-Market — GWP $100M–$1B. Standardization appetite, cost sensitive, need speed. Direct to SaaS platform. Future Platform.
- MGAs & Specialty — GWP < $100M. Agile, API-first, growth-oriented. Pay-as-you-grow SaaS + Digital layer. Future Platform.
- Reinsurance & Global Specialty — niche. Complex treaties, reporting heavy. Platform + Data + Decision modules. Future Platform.
- Legacy On-Prem Holdouts — mixed. Highly customized, resistant to full rip-and-replace. SaaS Migration Bridge / hybrid. Maintain → Future pilot.

### June 30 launch packages
- Sapiens Horizon / Evergreen Core: target Tier 2–3 carriers and legacy transitioners. Includes Foundational Core SaaS + Evergreen Platform. Value: 40%+ lower TCO vs on-prem, automatic compliance updates, elimination of compounding technical debt. Pricing: Base ARR indexed by GWP + 15% Evergreen surcharge. Timeline 4–7 months.
- Sapiens Intelligent / Advanced: target MGAs, digital carriers, modernising Tier 1/2. Includes Horizon + DigitalSuite + DataSuite + Decision & Intelligence. Value: 50%+ reduction in manual underwriting/claims work, faster digital channel launches, real-time analytics. Pricing: Base ARR + 50–60% combined surcharges. Timeline 6–10 months.
- Guardrail: position as Beta Migration Program, 12-month phased implementation. Billing starts after successful go-live.

## Required UX / product improvements

### 1. Shared app shell
- Add a proper Sapiens-style header/navigation across all pages.
- Pages should include Dashboard/Home, Services Catalog, Cohort Mapping, Configurator, Launch Packages.
- Home should make the demo’s purpose obvious and show the three pillars: catalog, cohort mapping, sales toolkit.

### 2. Services Catalog
- Build a credible catalog view grouped by the five modular blocks, not just a flat table.
- Include module name, description, block/category, lifecycle, target cohorts, pricing basis, surcharge where relevant.
- Add summary stats: Future Platform count, Maintain count, End of Life count, total base ARR range.
- Make lifecycle visually clear.

### 3. Cohort Mapping
- Add a dedicated `/cohorts` page.
- For each cohort, show: GWP range, characteristics, recommended path, lifecycle state, recommended package, recommended modules.
- Include a simple Future Platform / Maintain / End of Life mapping visual per cohort.
- Show why each cohort gets that route — this is strategic sales enablement, not just labels.

### 4. Sales Configurator — core feature
Make this the meaty tool.
- User can choose a cohort.
- User can apply package presets: Horizon and Intelligent.
- User can toggle modules/add-ons.
- GWP slider/input affects pricing.
- Show `F_scale` formula explanation and current value.
- Show detailed pricing breakdown:
  - base platform ARR
  - surcharge/add-on ARR
  - cloud/AMS ops
  - implementation/pro services
  - first-year total
  - ongoing annual ARR
- Show package fit warnings/recommendations, e.g. missing foundational core, legacy cohort should include transition bridge, MGA benefits from Digital/Data.
- Generate Quote should produce an on-page quote preview panel/modal, not `alert()`. Include cohort, selected modules, pricing, assumptions, timeline, and sales notes.
- Add saved example configurations (static/in-memory is fine) or benchmark cards.

### 5. Launch Packages
- Replace generic package names with June 30 packages: Sapiens Horizon and Sapiens Intelligent.
- Show target cohorts, included modules, value proposition, pricing logic, timeline, and beta migration guardrail.

## Data model improvements
Update `lib/types.ts`, `lib/data.ts`, and `lib/pricing.ts` as needed.
Recommended fields:
- Module: id, name, block, description, type, basePrice, surchargePercent optional, lifecycle, targetCohorts, required/recommended flags.
- Cohort: id, name, gwpRange, characteristics, recommendedPath, lifecycleMapping, recommendedPackageId, recommendedModuleIds, salesRationale.
- Package: id, name, subtitle, targetCohorts, modules, pricingModel, timeline, valueProposition, guardrail, surchargeSummary.

## Verification
Before finishing:
1. Run `npm run lint`.
2. Run `npm run build`.
3. Inspect git diff and ensure no dependency changes unless already present.
4. Commit with message: `Upgrade Sapiens subscription toolkit demo`.
5. Report changed files and any known caveats.

## Expected outcome
A substantially better app that MK can review visually and show as a credible demo direction — not merely a prompt or plan.
