# Goal 001 — Build the whizzy repo-style Sapiens operating system

## Objective
Turn the current Sapiens demo from a static toolkit with a hidden Brain DB into a polished, demo-ready operating system with a clear end-to-end workflow like the reference repo MK shared: research → validate → map → compose → demo/export.

## Non-negotiable context
- Target project: `/home/minigeek/sapiens-subscription-demo`.
- Confirm you are operating in this repo and not any other repo.
- Existing stack: Next.js 16.2.7, React 19, Tailwind v4, no extra UI libraries.
- Do **not** install, add, upgrade, or regenerate dependencies. Use existing packages only.
- Keep demo password gate working.
- Do not expose secrets. Do not read or commit `.env`.
- Build a visually impressive frontend, not just data plumbing.
- This has to be visible on the site, not buried in code.

## Current problem
MK cannot see meaningful progress on the live site. The current `/brain` work is too understated and does not communicate the repo-style product/workflow system. The user expected a whizzy frontend and clear operating workflow.

## Product shape to build
Create a coherent app experience called **Sapiens Platform Brain** with an obvious workflow:

1. **Command Centre / Workflow Dashboard**
   - Make the homepage or `/brain` hero clearly show the system workflow.
   - Use a polished “operating system” style: cards, gradients, status rails, timeline, progress indicators, relationship graph-style panels, confidence badges, source counters.
   - Above the fold should immediately say what the product does:
     - research Sapiens product intelligence
     - validate assets
     - map products to cohorts/use cases
     - compose sales/proposal packs
     - inject approved context into AI Deal Advisor
   - Include demo stats from the current brain assets: asset count, validated/review status, source count, product areas.

2. **Workflow rail**
   - Add a persistent or prominent 5-step workflow:
     1. Capture signals
     2. Validate product intelligence
     3. Map product/cohort fit
     4. Compose sales pack
     5. Advise/export
   - Each step should have clear UI, status, and CTA anchors to sections.

3. **Brain asset board**
   - Current Markdown assets should be shown as attractive cards, not a plain admin form.
   - Cards need status, confidence, source count, region, product fit tags, buyer signals.
   - Search/filter/status should remain, but make it feel like an intelligence board.

4. **Product relationship map**
   - Add a visual panel that shows relationships:
     - Brain asset → products/modules → cohorts/use cases → proposal/composer output.
   - This can be CSS-based; no external graph dependency.
   - It must make the “system” legible during a demo.

5. **Use-case / proposal composer**
   - Make the generator more prominent and demo-ready.
   - User chooses a template/use case, buyer name, client need.
   - Output should look like a generated proposal/sales pack with sections, discovery questions, sales angles, risks, and recommended Sapiens products/modules.
   - Add copy/export-friendly formatted output area.

6. **Validation / source workflow**
   - Show source URLs, validation status, last reviewed, owner.
   - Include visible next actions like “Needs product validation”, “Approved for demo”, “Needs source check”.
   - If save-to-Git cannot work on Vercel, present it honestly as “local/Git-backed workflow” and provide a Markdown export/copy fallback.

7. **AI context preview**
   - Show the compiled AI brain context in a polished preview.
   - Explain that validated brain entries power the Deal Advisor.
   - Include a CTA to open Deal Advisor.

8. **Navigation cleanup**
   - Make labels clear for business demo users:
     - Dashboard
     - Need Mapper
     - Cohorts
     - Portfolio
     - Composer
     - Brain DB
   - Ensure `/brain` is obvious and impressive after login.

## Files likely involved
- `app/page.tsx`
- `app/brain/BrainClient.tsx`
- `app/components/SiteHeader.tsx`
- `app/components/DealAdvisor.tsx` if needed for context/CTA
- `app/globals.css` if additional design classes are needed
- `lib/brain-markdown.ts`
- `lib/sales-brain.ts`
- `content/brain/assets/*.md` only if content gaps are obvious

## Implementation requirements
- Use existing components/styles where possible, but improve the visual frontend substantially.
- No new dependencies.
- TypeScript clean.
- Responsive enough for laptop demo.
- Keep the code maintainable: small helper components inside `BrainClient.tsx` are okay.
- Avoid tables; use cards/sections/grids.
- Make the demo story obvious without needing explanation.

## Verification
Run:
- `npm run lint`
- `npm run build`

Then manually smoke-test in browser:
- `/login`
- `/`
- `/brain`
- Navigation to Brain DB
- Brain board visible
- Workflow rail visible
- Relationship map visible
- Composer output visible
- AI context preview visible
- Browser console has no JS errors

## Success criteria
- MK can open `/brain` and immediately see a polished, whizzy operating system rather than a hidden admin page.
- The page explains and demonstrates the workflow end-to-end.
- Existing real Sapiens product intelligence is surfaced clearly.
- Lint and build pass.
- Changes are committed to `main` with a clear commit message.
- Do not push unless explicitly instructed by Hermes/MK after verification.

## Report back
When finished, report:
- files changed
- what changed visibly
- verification output
- any remaining gaps/blockers
