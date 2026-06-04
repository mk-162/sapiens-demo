export type BrainCategory =
  | 'Compliance'
  | 'Migration'
  | 'Data & Analytics'
  | 'Operating Model'
  | 'Proposal Asset';

export type ConfidenceLevel = 'Grounded' | 'Needs validation' | 'Illustrative';

export type BuyerSignal =
  | 'Regulatory pressure'
  | 'Legacy platform risk'
  | 'Cloud migration'
  | 'Analytics modernisation'
  | 'Cost takeout'
  | 'Speed to market'
  | 'Operational resilience';

export interface BrainSource {
  title: string;
  type: 'Client feedback' | 'Product knowledge' | 'Public/regulatory research' | 'Delivery pattern' | 'Sales pattern';
  confidence: ConfidenceLevel;
  note: string;
}

export interface BrainAsset {
  id: string;
  title: string;
  category: BrainCategory;
  region: string;
  buyerSignals: BuyerSignal[];
  summary: string;
  salesUse: string;
  productFit: string[];
  discoveryQuestions: string[];
  proposalAngles: string[];
  risks: string[];
  sources: BrainSource[];
}

export interface UseCaseTemplate {
  id: string;
  title: string;
  clientNeed: string;
  region: string;
  category: BrainCategory;
  defaultBuyer: string;
  urgency: 'Immediate' | 'Near-term' | 'Exploratory';
  assetIds: string[];
  recommendedModules: string[];
  proposalSections: string[];
  outputPromise: string;
}

export const brainAssets: BrainAsset[] = [
  {
    id: 'finland-compliance-operating-pack',
    title: 'Finland compliance operating pack',
    category: 'Compliance',
    region: 'Finland / Nordics',
    buyerSignals: ['Regulatory pressure', 'Operational resilience', 'Cost takeout'],
    summary:
      'A reusable intelligence pack for insurers that need to prove local compliance coverage, auditability and reporting discipline without turning the pitch into legal advice.',
    salesUse:
      'Use when a Finnish or Nordic insurer asks whether a Sapiens subscription can support local regulatory controls, operational reporting or audit readiness.',
    productFit: [
      'Enterprise Security & Compliance',
      'DataSuite Real-Time Analytics',
      'Sapiens Decision',
      'Premium AMS Pod',
    ],
    discoveryQuestions: [
      'Which Finnish regulatory reporting obligations are in scope for this discussion?',
      'Where are compliance checks handled today: policy admin, rules engine, spreadsheets or manual operations?',
      'Which audit evidence does the team struggle to produce quickly?',
      'Are the pain points data lineage, rules governance, reporting, approvals or release control?',
    ],
    proposalAngles: [
      'Position compliance as an operating model: governed rules, auditable data, controlled releases and managed service routines.',
      'Show how Decision plus DataSuite can separate rule logic from hard-coded platform change.',
      'Frame Premium AMS as recurring assurance: health reviews, release governance and evidence packs.',
    ],
    risks: [
      'Do not claim specific legal/regulatory compliance until Sapiens legal/product validates the jurisdictional requirement.',
      'Separate public regulatory facts from illustrative demo assumptions.',
      'Mark any Finnish-specific obligations as validation required if no source has been attached.',
    ],
    sources: [
      {
        title: 'Client feedback: niche compliance checks needed',
        type: 'Client feedback',
        confidence: 'Grounded',
        note: 'Client specifically cited a compliance check in Finland as the kind of niche use case sales teams need to package quickly.',
      },
      {
        title: 'Toolkit product knowledge: Security, Decision, DataSuite, AMS',
        type: 'Product knowledge',
        confidence: 'Grounded',
        note: 'Grounded in existing toolkit module catalogue and package model.',
      },
    ],
  },
  {
    id: 'saas-migration-pathway',
    title: 'SaaS migration pathway intelligence',
    category: 'Migration',
    region: 'Global',
    buyerSignals: ['Cloud migration', 'Legacy platform risk', 'Operational resilience', 'Cost takeout'],
    summary:
      'A proposal-ready migration narrative for customers moving from on-prem or heavily customised legacy estates to a controlled Sapiens SaaS subscription path.',
    salesUse:
      'Use when the buyer asks for SaaS migration, upgrade avoidance, cloud operations, release control or a pathway away from legacy customisation.',
    productFit: [
      'Sapiens Cloud Hosting',
      'Environments & Release Mgmt',
      'Continuous Platform Updates',
      'Automated Regression Suite',
      'Managed Cloud Operations',
    ],
    discoveryQuestions: [
      'Which system, version and hosting model are currently in production?',
      'What is the upgrade backlog and how often does the customer defer releases?',
      'Which customisations block cloud movement today?',
      'What migration pattern is acceptable: direct cutover, phased module migration or parallel run?',
    ],
    proposalAngles: [
      'Lead with risk reduction: remove upgrade cliffs, environment drift and fragile release processes.',
      'Package the migration as SaaS foundation plus Evergreen plus managed cloud operations.',
      'Use regression automation as the confidence layer that makes continuous updates credible.',
    ],
    risks: [
      'Avoid promising migration duration without platform/version discovery.',
      'Do not imply all customisations can be preserved unchanged in SaaS.',
      'Flag data migration and integration complexity as discovery outputs, not assumptions.',
    ],
    sources: [
      {
        title: 'Client feedback: migration use cases required',
        type: 'Client feedback',
        confidence: 'Grounded',
        note: 'Client cited migration as a niche content use case sales teams need to support.',
      },
      {
        title: 'Existing toolkit: Future Platform and Maintain → Future Pilot cohorts',
        type: 'Product knowledge',
        confidence: 'Grounded',
        note: 'Uses the existing cohort and lifecycle model already present in the toolkit.',
      },
    ],
  },
  {
    id: 'sas-analytics-modernisation',
    title: 'SAS / actuarial analytics modernisation',
    category: 'Data & Analytics',
    region: 'Global',
    buyerSignals: ['Analytics modernisation', 'Cost takeout', 'Legacy platform risk'],
    summary:
      'A reusable narrative for buyers with SAS-heavy analytics, reporting or actuarial workflows who need a modern governed data layer around Sapiens operations.',
    salesUse:
      'Use when the buyer mentions SAS, actuarial data marts, manual reporting, offline analytics or legacy analytical workflows around core insurance systems.',
    productFit: [
      'DataSuite Real-Time Analytics',
      'Reinsurance & Treaty Reporting',
      'DigitalSuite Portals',
      'Premium AMS Pod',
    ],
    discoveryQuestions: [
      'Which SAS workloads are business-critical: pricing, reserving, reporting, actuarial analysis or regulatory packs?',
      'What data currently moves between Sapiens systems, warehouses and SAS environments?',
      'Where are the manual controls and reconciliation points?',
      'Is the goal full migration, coexistence, governance or faster proposal evidence?',
    ],
    proposalAngles: [
      'Frame DataSuite as the governed operational data layer, not a forced rip-and-replace of every analytical model.',
      'Start with coexistence and evidence: lineage, data quality, reporting speed and operating control.',
      'Position Premium AMS as the managed cadence for analytics improvement and reporting assurance.',
    ],
    risks: [
      'Clarify whether “SAS migration” means SaaS platform migration or SAS analytics modernisation before scoping.',
      'Do not claim replacement of specialised actuarial models without product/delivery validation.',
      'Separate data integration, reporting and model migration into different workstreams.',
    ],
    sources: [
      {
        title: 'Ambiguous client wording: SAS/SaaS migration',
        type: 'Client feedback',
        confidence: 'Needs validation',
        note: 'Captured because “SAS migration” may mean SAS analytics migration or SaaS migration. The interface makes that ambiguity explicit.',
      },
    ],
  },
  {
    id: 'proposal-pack-operating-model',
    title: 'Sales proposal pack operating model',
    category: 'Proposal Asset',
    region: 'Reusable',
    buyerSignals: ['Speed to market', 'Cost takeout'],
    summary:
      'Defines how the second brain turns raw intelligence into a catalogue entry, use-case pack, sales talk track and product-offer recommendation.',
    salesUse:
      'Use internally when adding new niche use cases so future cards and AI generation can reuse the same structure.',
    productFit: [
      'Services Catalog',
      'Cohort Mapping',
      'Sales Configurator',
      'Deal Advisor',
    ],
    discoveryQuestions: [
      'What exact client question triggered this use case?',
      'What region, line of business, regulation, platform or migration pattern makes it niche?',
      'Which facts are sourced, which are assumptions and which need validation?',
      'What sales output should this power: proposal section, discovery guide, pricing wrapper, product bundle or objection handling?',
    ],
    proposalAngles: [
      'Every new brain entry should produce a sales-ready pack, not just a note.',
      'Use confidence labels so sales can see what is safe to use versus what needs validation.',
      'Keep content modular so the configurator and Deal Advisor can reuse it later.',
    ],
    risks: [
      'A second brain becomes junk fast if entries do not include source quality and sales use.',
      'Do not mix official Sapiens claims with prototype assumptions.',
      'Do not let niche packs bypass product/legal validation for external proposals.',
    ],
    sources: [
      {
        title: 'Operating strategy from client feedback',
        type: 'Client feedback',
        confidence: 'Grounded',
        note: 'The client needs content-specific use cases before sales teams can compile stronger proposals and product offerings.',
      },
    ],
  },
];

export const useCaseTemplates: UseCaseTemplate[] = [
  {
    id: 'finland-compliance-check',
    title: 'Finland compliance check',
    clientNeed:
      'Sales needs a credible starting pack for a Finnish insurer asking how the Sapiens subscription model supports local compliance checks, audit evidence and reporting discipline.',
    region: 'Finland',
    category: 'Compliance',
    defaultBuyer: 'Nordic insurer / compliance-led transformation team',
    urgency: 'Immediate',
    assetIds: ['finland-compliance-operating-pack', 'proposal-pack-operating-model'],
    recommendedModules: [
      'Enterprise Security & Compliance',
      'Sapiens Decision',
      'DataSuite Real-Time Analytics',
      'Premium AMS Pod',
    ],
    proposalSections: [
      'Compliance operating model',
      'Governed rules and audit trail',
      'Data/reporting evidence layer',
      'Managed assurance cadence',
      'Validation caveats and next discovery steps',
    ],
    outputPromise:
      'A sales-ready compliance use-case pack that is specific enough to open the conversation but clearly marked for regulatory validation.',
  },
  {
    id: 'saas-migration',
    title: 'SaaS migration proposal starter',
    clientNeed:
      'Sales needs to package a migration pathway from legacy/on-prem Sapiens estates into a subscription SaaS operating model.',
    region: 'Global',
    category: 'Migration',
    defaultBuyer: 'Legacy on-prem carrier / CIO transformation sponsor',
    urgency: 'Immediate',
    assetIds: ['saas-migration-pathway', 'proposal-pack-operating-model'],
    recommendedModules: [
      'Sapiens Cloud Hosting',
      'Environments & Release Mgmt',
      'Continuous Platform Updates',
      'Automated Regression Suite',
      'Managed Cloud Operations',
    ],
    proposalSections: [
      'Current-state risk',
      'Migration pathway',
      'Evergreen release model',
      'Regression and cutover assurance',
      'Cloud operations and success plan',
    ],
    outputPromise:
      'A migration-focused package that helps sales move from “we can host it” to a coherent subscription transformation story.',
  },
  {
    id: 'sas-analytics-modernisation',
    title: 'SAS analytics modernisation',
    clientNeed:
      'Sales needs a structured way to discuss SAS-heavy reporting/analytics environments and modern data-layer opportunities around the Sapiens platform.',
    region: 'Global',
    category: 'Data & Analytics',
    defaultBuyer: 'Carrier with SAS-heavy reporting, actuarial or analytics workflows',
    urgency: 'Near-term',
    assetIds: ['sas-analytics-modernisation', 'proposal-pack-operating-model'],
    recommendedModules: [
      'DataSuite Real-Time Analytics',
      'Reinsurance & Treaty Reporting',
      'Premium AMS Pod',
    ],
    proposalSections: [
      'Analytics current state',
      'Data integration and lineage',
      'Coexistence vs migration options',
      'Reporting assurance',
      'Validation and scoping questions',
    ],
    outputPromise:
      'A careful proposal starter that clarifies whether the buyer means SaaS migration or SAS analytics migration before over-scoping.',
  },
];

export function getAssetById(id: string): BrainAsset | undefined {
  return brainAssets.find((asset) => asset.id === id);
}

export function getTemplateById(id: string): UseCaseTemplate | undefined {
  return useCaseTemplates.find((template) => template.id === id);
}

export function buildProposalPack(templateId: string) {
  const template = getTemplateById(templateId) ?? useCaseTemplates[0];
  const assets = template.assetIds
    .map((id) => getAssetById(id))
    .filter((asset): asset is BrainAsset => Boolean(asset));

  const discoveryQuestions = Array.from(
    new Set(assets.flatMap((asset) => asset.discoveryQuestions)),
  );
  const proposalAngles = Array.from(new Set(assets.flatMap((asset) => asset.proposalAngles)));
  const risks = Array.from(new Set(assets.flatMap((asset) => asset.risks)));
  const confidence = assets.some((asset) =>
    asset.sources.some((source) => source.confidence === 'Needs validation'),
  )
    ? 'Needs validation'
    : 'Grounded';

  return {
    template,
    assets,
    confidence,
    discoveryQuestions,
    proposalAngles,
    risks,
  };
}
