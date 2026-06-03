# Goal 002 — Finish Sapiens Configurator and Package Pages

## Context
Previous Claude run reached max turns after upgrading data, pricing, home, modules, header/footer, and adding `/cohorts`. Build currently fails because old pages still import old symbols:
- `app/configurator/page.tsx` imports `calculateTASC`, now replaced by `calculatePricing`.
- `app/packages/page.tsx` imports `packages`, now replaced by `launchPackages`.
- CSS has a Google Fonts `@import` warning because `@import url(...)` is below rules; move it before `@import "tailwindcss"` or otherwise fix ordering.

## Objective
Finish the implementation so the app builds and the core sales toolkit is actually meaty.

## Tasks
1. Rewrite `app/configurator/page.tsx` against the new data model:
   - Use `modules`, `cohorts`, `launchPackages`, `benchmarkConfigs`, `moduleBlocks`, `getBlockById` as needed from `lib/data`.
   - Use `calculatePricing`, `formatCurrency`, `formatGWP` from `lib/pricing`.
   - Cohort selector.
   - Package preset buttons for Horizon and Intelligent.
   - Benchmark/example config buttons.
   - GWP slider/input.
   - Group module toggles by modular block.
   - Show pricing breakdown: base platform ARR, surcharge/add-on ARR, cloud/AMS ops, pro services, first-year total, annual ARR.
   - Show F_scale formula explanation and current scale factor.
   - Generate Quote must show an on-page quote preview panel, not `alert()`.
   - Show fit warnings/recommendations: foundational core missing, legacy needs migration bridge, MGA benefits from digital/data, package/cohort mismatch.
2. Rewrite `app/packages/page.tsx` using `launchPackages` and the new module data:
   - Horizon and Intelligent only.
   - Show target cohorts, included modules, value bullets, pricing model description, timeline, guardrail.
3. Fix `app/globals.css` import ordering warning.
4. Run `npm run lint` and `npm run build`; fix all failures.
5. Commit all changes locally with message `Upgrade Sapiens subscription toolkit demo`.

## Constraints
- Work only in `/home/minigeek/sapiens-subscription-demo`.
- Do not install, add, upgrade, or regenerate dependencies.
- Do not push.
