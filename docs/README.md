# Sapiens Subscription Toolkit · Demo Guide

This document is the operating manual for the **Sapiens Subscription Services
Toolkit** demo. It explains what the demo is for, who it is aimed at, how to
run it in front of a stakeholder, and where its boundaries are.

## Executive summary: what the toolkit does

The toolkit is a **password-gated internal sales/product demo** that shows how
Sapiens could package subscription services into a clearer, repeatable sales
conversation.

In plain English, it lets a presenter:

1. Pick the type of insurer they are talking about.
2. Create or refine the cohort if the existing model does not fit.
3. Assign the right proposed package and module set to that cohort.
4. Capture niche use-case intelligence such as Finland compliance checks,
   SaaS migration or SAS analytics modernisation.
5. Adjust customer scale using GWP.
6. Add or remove subscription modules.
7. See indicative recurring revenue, implementation services and first-year
   economics update live.
8. Generate a quote-style preview for discussion.
9. Ask the AI Deal Advisor to summarise the opportunity, flag risks, suggest
   upsell angles and provide sales talking points using the live admin context.

It is designed to make the proposed subscription model easy to understand in a
stakeholder meeting. It is **not** an official pricing engine, CRM, CPQ system or
customer-facing portal.

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

The toolkit demonstrates five things working together:

1. A **services catalog** organised around five modular blocks
   (Foundational Core, Evergreen, Decision & Intelligence, Digital & Data,
   Premium AMS).
2. A **cohort mapping** view that proposes a recommended path and module
   set for common customer archetypes.
3. A **Second Brain** operating page that lets the team create additional
   cohorts, sort/filter them, assign proposed packages, map modules, and
   capture niche sales-intelligence packs.
4. The **June 30 launch packages** — Sapiens Horizon and Sapiens
   Intelligent — packaged on top of the modular blocks.
5. A **live configurator** that lets the seller pick a cohort, load a
   package or benchmark, scale by GWP, toggle modules, see warnings and
   produce a quote preview.
6. An **AI Deal Advisor** side drawer that receives both the static toolkit
   data and the admin-configured cohort/package/module branches, then can
   analyse the current deal, explain the package logic, flag risks and suggest
   commercial talking points.

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
7. They click **Analyse with AI** to get a deal-read: strengths, risks,
   potential add-ons and presenter talking points.

Because the toolkit is opinionated, the seller never starts from a blank
form — every interaction starts from a credible default.

## 4. Outcome

After a 5-minute walkthrough, the stakeholder should:

- Understand the five modular blocks and how Sapiens packages them.
- Be able to repeat the cohort → package → quote mental model on their own.
- Be able to defend why a given module set is right for a given cohort.
- Know which numbers are *real* vs. *illustrative* (see the audit doc).

## 5. How the flow works

The demo has seven routes:

| Route | Purpose |
| --- | --- |
| `/` | Landing dashboard. Sets the story, shows portfolio at a glance, lists the four pillars and surfaces the two launch packages. |
| `/modules` | Services catalog. The full module list grouped by the five blocks, with base ARR anchors and target cohorts. |
| `/cohorts` | Customer cohorts, each with a recommended path, lifecycle mapping and module set. |
| `/packages` | The two June 30 launch packages — Horizon and Intelligent — with target cohorts, value props and included modules. |
| `/brain` | Second Brain. Admin operating page for creating cohorts, sorting/filtering, assigning packages/modules, generating niche use-case sales packs and exposing the live AI knowledge branch. |
| `/configurator` | The live tool. Pick a cohort, load a package or benchmark, scale by GWP, toggle modules, see warnings, generate a quote and analyse the deal with AI. |
| `/settings` | Editing surface for adjusting demo modules and blocks. Changes persist in browser storage for the demo. |
| `/docs` | In-app knowledge base. Explains the demo, construction, terminology caveats, pricing maths and AI layer. |

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
   - Click **Analyse with AI**. Explain that the advisor receives the current
     cohort, package, selected modules, pricing breakdown and warnings, then
     turns that context into deal guidance.
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
- **Browser persistence only.** Cohort, package-assignment and module edits are
  saved to browser local storage for the password-gated demo. There is still no
  server database, CRM or CPQ persistence layer.
- **No external integrations.** There is no Salesforce or Sapiens Finance
  integration. The admin-configured knowledge snapshot is passed into the AI
  endpoint as context for sales advice.
- **AI is optional.** Without `ANTHROPIC_API_KEY`, the Deal Advisor runs in
  safe fallback mode. With the key configured server-side, it uses Anthropic to
  generate richer responses from the embedded knowledge base and current deal
  context.
- **No accessibility audit yet.** Tooltips are keyboard accessible and
  use ARIA correctly, but a full WCAG pass has not been done.

## 8. Where to look in the code

- `app/page.tsx` — landing dashboard.
- `app/configurator/ConfiguratorClient.tsx` — the live configurator.
- `app/components/DealAdvisor.tsx` — the global AI side drawer.
- `app/api/ai/chat/route.ts` — server-only Anthropic/fallback chat endpoint.
- `lib/ai/knowledge.ts` — embedded AI knowledge and fallback deal-advice logic.
- `app/cohorts/page.tsx`, `app/modules/page.tsx`, `app/packages/page.tsx`
  — the supporting views.
- `lib/data.ts` — modules, cohorts, packages, benchmarks.
- `lib/pricing.ts` — `calculateScaleFactor` and `calculatePricing`.
- `app/components/HelpHint.tsx` — the inline tooltip / explainer
  component used across the toolkit.

See `construction-summary.md` for the full data model and pricing
formula. See `pricing-maths.md` for a plain-English explanation of GWP,
F_scale, surcharges, ARR and first-year total.
