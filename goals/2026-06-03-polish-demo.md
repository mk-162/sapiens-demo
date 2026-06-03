# Goal: Polish Sapiens Subscription Toolkit for demo usability

## Objective
Turn the current Sapiens Subscription Toolkit into a usable, stakeholder-ready demo: clean responsive navigation, smaller logo, clear tooltips/explainers, complete end-to-end demo flow, docs, and terminology audit against the real Sapiens business.

## Project
Operate only in `/home/minigeek/sapiens-subscription-demo`. Confirm this before editing. Do not touch other repos.

## Hard constraints
- Do not install packages, run npm install, change package dependencies, or regenerate lockfiles.
- Use existing Next.js 16 / React / Tailwind setup only.
- Keep Sapiens navy/orange/white enterprise styling.
- No secrets or credentials.
- Make the demo easier for a non-technical sales/product stakeholder to understand.
- Use frontend design best practice / frontend-design skill principles: tight spacing, clear hierarchy, no wrapping nav clutter, mobile-first responsive behaviour, obvious interaction states, accessible labels.

## Specific fixes requested by MK
1. Logo/header
   - Halve the visible Sapiens logo size.
   - Header must feel tidy and professional.
   - Avoid text wrapping in nav/header.
   - The configurator CTA must not appear when already on `/configurator`.
   - Remove duplicate navigation semantics: `Configurator` and `Open Configurator` both go to the same page. Keep one clear primary action where useful, but not duplicated/current-page clutter.
   - Navigation must work on mobile. Add a simple mobile nav/menu if needed.

2. Tooltips/explainers
   - Add inline help/tooltips or small explainer affordances for confusing concepts: package preset, benchmark configuration, cohort, GWP, F_scale, modular blocks, surcharges, pricing breakdown, quote preview, fit warnings.
   - Tooltips must be accessible and not rely solely on hover; visible helper text is acceptable.
   - Add a short “How to use this demo” sequence/section in the configurator so MK knows what to click first, second, third.

3. End-to-end feature completeness
   - Review all current pages/routes: `/`, `/modules`, `/cohorts`, `/packages`, `/configurator`.
   - Ensure the demo tells a coherent story: goal, use, outcome.
   - Ensure key demo features are present: choose cohort, load package, load benchmark, adjust GWP, toggle modules, see warnings/recommendations, view pricing, generate quote preview, understand what is real vs illustrative.
   - Add missing links/CTAs so user can move through the flow logically.

4. Mobile/responsive
   - Header nav must be usable on mobile.
   - Main pages and configurator must not overflow horizontally.
   - Cards/buttons should stack cleanly.
   - Long labels should not destroy layout.

5. Product/terminology audit + docs
   - Research public Sapiens business terminology from official public sources where possible.
   - Audit product/module/package/cohort terminology in `lib/data.ts` and page copy.
   - Create `docs/` folder with at least:
     - `docs/README.md`: detailed explainer for demo purposes. Cover: goal, audience, use case, outcome, how the flow works, demo script/talk track, limitations.
     - `docs/construction-summary.md`: how this demo was constructed: data model, routes, pricing formula, assumptions, what is real vs illustrative.
     - `docs/sapiens-terminology-audit.md`: table/list comparing demo terms vs public Sapiens terminology, marking Real/Publicly supported, Derived/Reasonable, Illustrative/Dummy, and recommended caveats.
   - In UI, add a caveat that pricing and some package/commercial constructs are indicative/internal, not official Sapiens pricing.

## Suggested implementation details
- Add a reusable tooltip/help component if useful, but no new deps.
- Add a mobile menu in `SiteHeader.tsx` using local state.
- Use compact nav labels if needed: Dashboard, Catalog, Cohorts, Packages, Configurator.
- Consider adding `docs` nav link only if it improves usability; docs can be repo-only.
- Add a route-level or homepage “Start here” CTA to configurator and explainer.
- Improve quote preview to be mobile-safe and clearer.

## Verification
After edits:
- Run `npm run lint`.
- Run `npm run build`.
- Report changed files and any caveats.
- Do not commit unless asked by Hermes; Hermes will inspect and commit.
