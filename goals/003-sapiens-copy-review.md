# Goal 003 — Sapiens brand copy review and homepage rewrite

## Objective
Review and rewrite the toolkit copy so it matches Sapiens' public brand voice and the supplied Sapiens brand profile, with special focus on fixing the homepage copy.

## Context
The previous homepage used internal language like “meaty toolkit.” That was an internal description only and must not appear in client/stakeholder-facing UI. This is an internal sales/product toolkit, but the copy should still sound like Sapiens: authoritative, forward-looking, outcome-oriented, and credible.

## Brand profile to use

Sapiens is a global provider of intelligent, AI-driven, SaaS-based software for the insurance industry. It helps insurers modernize and future-proof operations across the full insurance lifecycle, combining a robust platform, customer-driven partnerships, and a broad partner ecosystem with deep, decades-long industry expertise.

Current narrative:
- “Advancing the Possible”
- “A New Era Begins”
- “Introducing the Next Chapter of Sapiens”
- “Unlocking Exponential Outcomes with Agile Intelligence”

Positioning:
- The global leader in digital transformation for insurers.
- Intelligent, SaaS-based insurance technology software.
- AI-powered insurance platform with embedded agentic AI and last-inch functionality.

Core benefits:
- Faster Time-to-Value — deploy new opportunities at speed and scale.
- Optimized Decision-Making — improve operational efficiency and automate decisions.
- Personalized Experiences — serve customers in the moments that matter.

Audience:
- Insurance executives
- IT/transformation leaders
- Underwriting, claims and data teams
- Sales/product teams using this internal toolkit

Voice and tone:
- Authoritative, forward-looking, outcome-oriented.
- Confident and visionary without sounding hype-driven.
- Lead with customer outcomes, then support with proof or operational detail.
- Keep technology language accessible to business buyers.
- Avoid jargon overload.
- Avoid informal/internal phrases like “meaty,” “thin demo,” “simple-but-meaty,” etc.

Messaging pillars:
- Intelligent / AI-driven
- Open & SaaS-based platform
- End-to-end lifecycle coverage
- Proven and recognized
- Partnership for transformation

Proof points if useful:
- 600+ customers
- 30+ countries
- 5,000+ experts
- 40+ years of industry experience

## Files to review/edit
- `app/page.tsx` — primary priority. Rewrite the homepage hero and section copy.
- `app/modules/page.tsx`
- `app/cohorts/page.tsx`
- `app/packages/page.tsx`
- `app/configurator/ConfiguratorClient.tsx`
- `app/layout.tsx` metadata if needed
- `app/components/SiteHeader.tsx` and `SiteFooter.tsx` only if labels need copy polish

## Requirements
1. Use the profile above as the source of truth.
2. Fix the homepage copy so it no longer sounds like an internal note. It should feel like a Sapiens-branded internal sales enablement product.
3. Keep the toolkit purpose clear: catalog, cohort mapping, launch packages, configurator/quote preview.
4. Preserve factual caution: this is an internal sales enablement toolkit, not a public product launch page.
5. Do not introduce unverified claims beyond the supplied brand profile.
6. Do not change pricing logic, data structures, navigation paths, package logic or dependencies.
7. Do not run `npm install`, add dependencies, or modify package files.
8. After edits, run `npm run lint` and `npm run build`.

## Success criteria
- No instances of “meaty”, “thin demo”, or other informal internal wording remain in UI copy.
- Homepage copy leads with Sapiens-style outcomes and transformation language.
- Copy is clear for business users, not dev-focused.
- Lint and build pass.
- Report changed files and the rationale for the copy changes.
