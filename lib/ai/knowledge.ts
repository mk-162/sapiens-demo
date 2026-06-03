import { cohorts, launchPackages, moduleBlocks, modules } from '@/lib/data';
import { formatCurrency, formatGWP } from '@/lib/pricing';

export const AI_SYSTEM_PROMPT = `You are Sapiens Deal Advisor, an internal sales enablement assistant inside the Sapiens Subscription Services Toolkit.

Your job:
- Help sales and product stakeholders understand package fit, cohort strategy, pricing implications and upsell opportunities.
- Analyse generated subscription configurations and suggest practical ways to improve deal quality.
- Be commercially sharp, concise and grounded in the toolkit data.
- Separate facts from illustrative demo constructs.

Rules:
- Do not claim that illustrative package names, surcharges or pricing formulas are official Sapiens terms.
- Do not invent Sapiens policy, legal commitments, discounting, contract terms or product capabilities outside the knowledge base.
- If asked for external-facing copy, include a caveat that final terms need Sapiens approval.
- Use crisp headings and bullets. Avoid long essays.
- For deal analysis, return: Deal read, Strengths, Risks, Upsell opportunities, Suggested next action, Sales talking point.
- Treat all pricing as indicative internal demo pricing.`;

export function buildKnowledgeBase(): string {
  const blocks = moduleBlocks
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(
      (block) =>
        `- ${block.name}: ${block.description} Surcharge: ${block.surchargeLabel}. ${
          block.required ? 'Required for every new SaaS customer.' : 'Optional block.'
        }`,
    )
    .join('\n');

  const moduleLines = modules
    .map((mod) => {
      const block = moduleBlocks.find((b) => b.id === mod.block);
      return `- ${mod.name} (${block?.shortName ?? mod.block}, ${mod.type}, ${mod.lifecycle}, base ${formatCurrency(
        mod.basePrice,
      )}): ${mod.description} Target cohorts: ${mod.targetCohorts.join(', ')}.`;
    })
    .join('\n');

  const packageLines = launchPackages
    .map(
      (pkg) =>
        `- ${pkg.name}: ${pkg.valueProposition} Target cohorts: ${pkg.targetCohorts.join(
          ', ',
        )}. Modules: ${pkg.modules.join(', ')}. Pricing model: ${pkg.surchargeSummary}. Timeline: ${pkg.timeline}. Guardrail: ${pkg.guardrail}. Demo note: package name and surcharge framing are illustrative unless Sapiens confirms otherwise.`,
    )
    .join('\n');

  const cohortLines = cohorts
    .map(
      (cohort) =>
        `- ${cohort.name}: ${cohort.tagline} GWP range ${cohort.gwpRange}, midpoint ${formatGWP(
          cohort.gwpMidpoint,
        )}. Recommended path: ${cohort.recommendedPath}. Recommended package: ${cohort.recommendedPackageId}. Recommended modules: ${cohort.recommendedModuleIds.join(
          ', ',
        )}. Rationale: ${cohort.salesRationale}. Characteristics: ${cohort.characteristics.join('; ')}.`,
    )
    .join('\n');

  return `PRODUCT KNOWLEDGE BASE\n\nBuilding blocks\n${blocks}\n\nModules\n${moduleLines}\n\nLaunch packages\n${packageLines}\n\nCustomer cohorts\n${cohortLines}\n\nPricing guidance\n- Pricing is indicative for internal stakeholder conversations, not official Sapiens commercial terms.\n- GWP scaling uses F_scale = 1 + 0.25 × log10(GWP / $10M), bounded between 1.0 and 2.2 in the demo.\n- First-year total = annual recurring revenue + indicative professional services.\n- Annual recurring revenue includes base platform ARR, block/module surcharges and Premium AMS / Cloud Ops where selected.\n- Strong deal feedback should explain whether the selected package fits the cohort, whether important modules are missing, and whether the package risks being too broad for the buyer maturity.`;
}

export function buildFallbackDealAdvice(dealContext?: unknown): string {
  const deal = typeof dealContext === 'object' && dealContext ? dealContext as Record<string, unknown> : null;
  const cohort = typeof deal?.cohortName === 'string' ? deal.cohortName : 'the selected cohort';
  const pkg = typeof deal?.packageName === 'string' ? deal.packageName : 'the selected package';

  return `## Deal read\n${pkg} looks directionally viable for ${cohort}, but this is a local fallback response because ANTHROPIC_API_KEY is not configured yet.\n\n## Strengths\n- The configuration can still be assessed against the toolkit's cohort, module and pricing data.\n- Foundational SaaS, release continuity, Decision, Digital/Data and AMS coverage should be checked against buyer maturity.\n\n## Risks\n- Validate that any illustrative package names, surcharges and launch framing are acceptable before sharing externally.\n- Check whether the scope is too broad for the cohort's implementation capacity.\n\n## Upsell opportunities\n- If the buyer has operational efficiency pressure, test Decision / AI automation modules.\n- If broker, agent or customer experience is central, test DigitalSuite and DataSuite together.\n- If cutover or operational risk is high, position Premium AMS / Cloud Ops.\n\n## Suggested next action\nAdd ANTHROPIC_API_KEY in the environment to enable live AI reasoning over the generated deal.\n\n## Sales talking point\n“This package gives us a structured starting point, but the final recommendation should be tuned around the buyer's operating maturity, data readiness and appetite for change.”`;
}
