# Sapiens Subscription Toolkit · Demo Guide

This document is the operating manual for the **Sapiens Subscription Services
Toolkit** demo. It explains what the demo is for, who it is aimed at, how to
run it in front of a stakeholder, and where its boundaries are.

If you are a non-technical reader, start at the top and read straight through.
If you are technical and want the data model and build details, jump to
`construction-summary.md`. If you want to know which terms are real Sapiens
language vs. things we invented for demo purposes, jump to
`sapiens-terminology-audit.md`. If the pricing formula is confusing, jump to
`pricing-maths.md`.

---

## 1. Goal of the demo

Show stakeholders a **single, opinionated workspace** that takes a Sapiens
seller (or sales-adjacent stakeholder) from "this is the customer" to
"this is the configured Sapiens subscription with a credible price" in
under five minutes.

The toolkit demonstrates four things working together:

1. A **services catalog** organised around five modular blocks
   (Foundational Core, Evergreen, Decision & Intelligence, Digital & Data,
   Premium AMS).
2. A **cohort mapping** view that proposes a recommended path and module
   set for five common customer archetypes.
3. The **June 30 launch packages** — Sapiens Horizon and Sapiens
   Intelligent — packaged on top of the modular blocks.
4. A **live configurator** that lets the seller pick a cohort, load a
   package or benchmark, scale by GWP, toggle modules, see warnings and
   produce a quote preview.

The goal is *not* to ship a real CPQ tool. The goal is to make the
subscription story easier to tell.

## 2. Audience

- **Primary:** Sapiens sales leadership / sales enablement / pre-sales —
  the people who actually walk through this in front of customers or
  internal stakeholders.
- **Secondary:** Product and finance stakeholders who want to pressure-test
  the packaging, cohort model and pricing storyline.
- **Tertiary:** Engineering / design reviewers checking that the
  experience fits Sapiens' brand and enterprise UX expectations.

It is explicitly **not** a customer-facing tool. The footer and inline
caveats reinforce this.

## 3. Use case

A typical session:

1. The seller has just left a meeting with (e.g.) a mid-market US carrier.
2. They open the toolkit on a laptop or shared screen.
3. They go to the **Configurator** and pick the cohort that matches
   ("Tier 2–3 Mid-Market").
4. The Horizon package preset auto-loads with a sensible GWP and module
   selection.
5. They adjust GWP, toggle add-ons, and answer "what if we added AI
   underwriting?" in real time.
6. They click **Generate quote preview** to produce a quote-shaped artefact
   they can screenshot or print.

Because the toolkit is opinionated, the seller never starts from a blank
form — every interaction starts from a credible default.

## 4. Outcome

After a 5-minute walkthrough, the stakeholder should:

- Understand the five modular blocks and how Sapiens packages them.
- Be able to repeat the cohort → package → quote mental model on their own.
- Be able to defend why a given module set is right for a given cohort.
- Know which numbers are *real* vs. *illustrative* (see the audit doc).

## 5. How the flow works

The demo has five routes:

| Route | Purpose |
| --- | --- |
| `/` | Landing dashboard. Sets the story, shows portfolio at a glance, lists the three pillars and surfaces the two launch packages. |
| `/modules` | Services catalog. The full module list grouped by the five blocks, with base ARR anchors and target cohorts. |
| `/cohorts` | The five customer cohorts, each with a recommended path, lifecycle mapping and module set. |
| `/packages` | The two June 30 launch packages — Horizon and Intelligent — with target cohorts, value props and included modules. |
| `/configurator` | The live tool. Pick a cohort, load a package or benchmark, scale by GWP, toggle modules, see warnings, generate a quote. |

The header shows a single primary CTA ("Start configuring") that
disappears when the user is already on `/configurator`, so there is no
duplicate navigation noise.

## 6. Demo script / talk track

A suggested 5-minute walkthrough. Adjust to your audience.

1. **Open the home page (≈45s).** Frame the problem: Sapiens has a broad
   subscription portfolio. This toolkit is how we make every
   conversation start from the same opinionated point of view.
2. **Click "Start here · Open the Configurator" (≈2 min).**
   - Mention the **How to use this demo** strip — three steps from
     cohort to quote.
   - Pick the cohort that matches your scenario.
   - Watch the GWP, F_scale multiplier, recommended modules and
     pricing recalculate.
   - Toggle a couple of modules to show the live update.
   - Point at the **fit warnings / recommendations** — these are demo
     heuristics, not a real deal desk, but they signal where Sapiens
     would intervene.
   - Click **Generate quote preview**. Stop and let the audience read
     it.
3. **Hop to `/cohorts` (≈45s).** Use this to defend the recommended
   module set: every cohort has a recommended path, a lifecycle
   mapping and a `salesRationale` string.
4. **Hop to `/packages` (≈45s).** Anchor on the two June 30 packages.
   Mention the **Beta Migration Programme** guardrail — billing tied to
   go-live milestones.
5. **Close (≈30s).** Re-read the **Demo notice** caveat: prices and
   commercial constructs are illustrative for stakeholder
   conversations.

## 7. Limitations

- **Pricing is illustrative.** All numbers (base prices, surcharges,
  F_scale formula, professional services anchor) are demo constructs.
  Real Sapiens commercial terms are negotiated deal-by-deal.
- **Cohort and package names are partly inventoried by us.** Horizon and
  Intelligent are demo packaging — see the terminology audit.
- **No persistence.** Refresh the page and you lose configuration
  state. Use a screenshot or the **Generate quote preview** print view
  to capture a configuration.
- **No external integrations.** There is no Salesforce, no Sapiens
  Finance, no auth. The toolkit is read-only against a static
  `lib/data.ts`.
- **No accessibility audit yet.** Tooltips are keyboard accessible and
  use ARIA correctly, but a full WCAG pass has not been done.

## 8. Where to look in the code

- `app/page.tsx` — landing dashboard.
- `app/configurator/ConfiguratorClient.tsx` — the live configurator.
- `app/cohorts/page.tsx`, `app/modules/page.tsx`, `app/packages/page.tsx`
  — the supporting views.
- `lib/data.ts` — modules, cohorts, packages, benchmarks.
- `lib/pricing.ts` — `calculateScaleFactor` and `calculatePricing`.
- `app/components/HelpHint.tsx` — the inline tooltip / explainer
  component used across the toolkit.

See `construction-summary.md` for the full data model and pricing
formula. See `pricing-maths.md` for a plain-English explanation of GWP,
F_scale, surcharges, ARR and first-year total.
