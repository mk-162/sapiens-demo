export type BrainCategory =
  | 'Compliance'
  | 'Migration'
  | 'Data & Analytics'
  | 'Operating Model'
  | 'Proposal Asset'
  | 'Core Platform'
  | 'Digital Engagement'
  | 'Reinsurance'
  | 'Life & Annuities'
  | 'Cloud Services'
  | 'Decision Automation';

export type ConfidenceLevel = 'Grounded' | 'Needs validation' | 'Illustrative';

export type BuyerSignal =
  | 'Regulatory pressure'
  | 'Legacy platform risk'
  | 'Cloud migration'
  | 'Analytics modernisation'
  | 'Cost takeout'
  | 'Speed to market'
  | 'Operational resilience'
  | 'Digital engagement'
  | 'Claims automation'
  | 'Underwriting automation'
  | 'Reinsurance leakage'
  | 'Product launch speed';

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

const officialSource = (title: string, url: string, note: string): BrainSource => ({
  title,
  type: 'Product knowledge',
  confidence: 'Grounded',
  note: `${note} Source: ${url}`,
});

export const brainAssets: BrainAsset[] = [
  {
    id: 'pc-coresuite-iditsuite-modernisation',
    title: 'P&C core modernisation: IDITSuite / PolicyMaster / BillingMaster / ClaimsMaster',
    category: 'Core Platform',
    region: 'EMEA / APAC',
    buyerSignals: ['Legacy platform risk', 'Speed to market', 'Product launch speed', 'Operational resilience'],
    summary:
      'Sapiens positions IDITSuite as a digitally led, end-to-end and modular P&C policy administration system supporting personal and commercial lines from acquisition through billing, claims and renewal. PolicyMaster, BillingMaster and ClaimsMaster provide focused P&C policy, billing and claims capabilities for insurers that need modular modernisation rather than a full-suite rip-and-replace.',
    salesUse:
      'Use when a P&C insurer is running multiple legacy systems, has slow product changes, fragmented billing/claims operations or needs a modular path to modern policy administration.',
    productFit: [
      'IDITSuite for Property & Casualty',
      'PolicyMaster',
      'BillingMaster',
      'ClaimsMaster',
      'DigitalSuite',
      'DataSuite',
      'Sapiens Decision',
    ],
    discoveryQuestions: [
      'Which P&C lines need modernisation first: personal, commercial, specialty or mixed portfolio?',
      'Is the current blocker policy administration, billing, claims, distribution channels or all of the above?',
      'How many policy/billing/claims systems are in production today and where are hand-offs manual?',
      'What is the current product-launch cycle time and what slows configuration changes?',
      'Does the buyer need a full core transformation or a modular entry point around policy, billing or claims?',
    ],
    proposalAngles: [
      'Position IDITSuite as the end-to-end P&C core when the customer wants a single integrated policy-to-claims pathway.',
      'Use PolicyMaster, BillingMaster and ClaimsMaster as modular entry points when the buyer cannot rip and replace everything at once.',
      'Attach DigitalSuite for agent/customer journeys and DataSuite for operational visibility across policy, billing and claims data.',
      'Bring Sapiens Decision into discussions where product rules, underwriting referrals or claims automation are the bottleneck.',
    ],
    risks: [
      'Do not imply one product fits every region: Sapiens has different EMEA and North America product names/portfolios.',
      'Validate whether the customer needs the EMEA IDITSuite/Master products or North America PolicyPro/BillingPro/ClaimsPro equivalents.',
      'Avoid implementation-timeline promises until current-state architecture and integrations are understood.',
    ],
    sources: [
      officialSource('IDITSuite for Property & Casualty', 'https://sapiens.com/property-and-casualty/iditsuite/', 'Official page describes IDITSuite as an award-winning, end-to-end, modular P&C policy administration system supporting acquisition, billing, claims and renewal.'),
      officialSource('PolicyMaster', 'https://sapiens.com/property-and-casualty/policymaster/', 'Official page describes PolicyMaster as comprehensive policy lifecycle support for P&C quote, issue and administration.'),
      officialSource('BillingMaster', 'https://sapiens.com/property-and-casualty/billingmaster/', 'Official page describes BillingMaster as API-driven enterprise billing software for P&C insurers, brokers and MGAs.'),
      officialSource('ClaimsMaster', 'https://sapiens.com/property-and-casualty/claimsmaster/', 'Official sitemap/page identifies ClaimsMaster as the P&C claims component; page fetch intermittently returned Cloudflare 522 during research, so validate detail before external use.'),
    ],
  },
  {
    id: 'north-america-pc-policypro-billingpro-claimspro',
    title: 'North America P&C: PolicyPro, BillingPro and ClaimsPro',
    category: 'Core Platform',
    region: 'North America',
    buyerSignals: ['Claims automation', 'Speed to market', 'Product launch speed', 'Digital engagement'],
    summary:
      'For North America P&C, Sapiens presents PolicyPro for end-to-end automated policy lifecycle support, BillingPro for flexible low-code billing experiences, and ClaimsPro for configurable AI-driven claims automation that balances speed and accuracy.',
    salesUse:
      'Use when a North American P&C carrier, MGA or specialty insurer needs a more specific product map than the global/EMEA suite names.',
    productFit: ['PolicyPro', 'BillingPro', 'ClaimsPro', 'DigitalSuite', 'DataSuite', 'Sapiens Decision'],
    discoveryQuestions: [
      'Is the buyer focused on policy speed-to-market, billing experience, claims automation or end-to-end core change?',
      'Which states, products and distribution channels create the most configuration overhead?',
      'Where do agents/customers experience friction: quote, bind, endorsement, billing, FNOL or claims updates?',
      'How much low-code configuration capability does the business team need versus IT-led change?',
    ],
    proposalAngles: [
      'Use PolicyPro for line-of-business configuration and policy lifecycle automation.',
      'Use BillingPro when payment flexibility, billing visibility and collections operations are the buying trigger.',
      'Use ClaimsPro where adjuster productivity, auditable automation and AI-supported claims triage matter.',
      'Package the three as a North America P&C pathway, with DigitalSuite and DataSuite as engagement and insight accelerators.',
    ],
    risks: [
      'North America naming differs from EMEA naming; confirm region before recommending products.',
      'Claims AI claims should be phrased as AI-driven/configurable automation, not autonomous claim settlement unless validated.',
    ],
    sources: [
      officialSource('PolicyPro', 'https://sapiens.com/us/property-and-casualty/policypro/', 'Official page describes end-to-end automated policy lifecycle support for P&C insurers and intuitive configuration tools to create or adjust lines of business.'),
      officialSource('BillingPro', 'https://sapiens.com/us/property-and-casualty/billingpro/', 'Official page describes flexible low-code billing experiences and 360-degree visibility into billing, collections and payments.'),
      officialSource('ClaimsPro', 'https://sapiens.com/us/property-and-casualty/claimspro/', 'Official page describes configurable AI-driven claims automation for P&C adjusters.'),
    ],
  },
  {
    id: 'life-pensions-annuities-core-underwriting-illustration',
    title: 'Life, Pensions & Annuities: CoreSuite, UnderwritingPro and IllustrationPro',
    category: 'Life & Annuities',
    region: 'Global / North America / EMEA',
    buyerSignals: ['Underwriting automation', 'Speed to market', 'Legacy platform risk', 'Digital engagement'],
    summary:
      'Sapiens CoreSuite is positioned as an end-to-end cloud-first policy administration system for life, health, wealth, retirement and annuity products. UnderwritingPro adds cloud-native AI-supported underwriting automation, while IllustrationPro streamlines quoting and illustrations for Life & Annuities.',
    salesUse:
      'Use when a life, pensions or annuities buyer asks about PAS modernisation, accelerated underwriting, advisor/customer illustrations or launch speed for new products.',
    productFit: ['CoreSuite for Life & Pensions', 'CoreSuite for Life & Annuities', 'UnderwritingPro', 'IllustrationPro', 'DigitalSuite', 'Sapiens Decision'],
    discoveryQuestions: [
      'Which products are in scope: individual life, group life, annuities, health, wealth or retirement?',
      'Is the biggest issue new business, underwriting cycle time, policy servicing, claims, illustrations or advisor experience?',
      'What percentage of applications can currently go straight-through?',
      'Which data sources and evidence providers are used in underwriting today?',
      'Are illustrations generated consistently across advisor, direct and back-office channels?',
    ],
    proposalAngles: [
      'Lead with CoreSuite when the buyer needs cloud-first PAS transformation across life/pensions/annuities.',
      'Attach UnderwritingPro when speed, straight-through processing and rules/AI-supported underwriting are explicit pain points.',
      'Attach IllustrationPro when the buyer needs faster, consistent quote and illustration journeys for advisors or customers.',
      'Use DigitalSuite to extend servicing and sales journeys beyond the core PAS.',
    ],
    risks: [
      'Do not conflate EMEA Life & Pensions with North America Life & Annuities without confirming market and product scope.',
      'AI underwriting claims require validation against buyer governance, risk appetite and local regulation.',
    ],
    sources: [
      officialSource('CoreSuite for Life & Pensions', 'https://sapiens.com/life-and-pensions/coresuite-for-life-and-pensions/', 'Official page describes an end-to-end, cloud-first, digitally enhanced PAS for individual and group products across life, health, wealth and retirement.'),
      officialSource('CoreSuite for Life & Annuities', 'https://sapiens.com/us/life-and-annuities/coresuite-for-life-and-annuities/', 'Official North America page describes a comprehensive cloud-native Life & Annuities policy administration solution.'),
      officialSource('UnderwritingPro', 'https://sapiens.com/us/life-and-annuities/underwritingpro/', 'Official page describes an award-winning cloud-native solution leveraging AI to automate underwriting workflows.'),
      officialSource('IllustrationPro', 'https://sapiens.com/us/life-and-annuities/illustrationpro/', 'Official page describes a modern solution that streamlines quoting and illustration for Life & Annuities.'),
    ],
  },
  {
    id: 'reinsurance-automation-reinsurancepro-reinsurancemaster',
    title: 'Reinsurance automation: ReinsurancePro and ReinsuranceMaster',
    category: 'Reinsurance',
    region: 'Global / North America / EMEA',
    buyerSignals: ['Reinsurance leakage', 'Operational resilience', 'Analytics modernisation', 'Cost takeout'],
    summary:
      'Sapiens positions ReinsurancePro for underwriting and administration of treaty and facultative, ceded, assumed and retroceded reinsurance. ReinsuranceMaster is positioned as a comprehensive single platform for large and multinational reinsurance programs, with financial control across lines of business.',
    salesUse:
      'Use when buyers are managing reinsurance in spreadsheets, struggling with treaty complexity, claims leakage, renewal pricing, retrocession, bordereaux or financial control.',
    productFit: ['ReinsurancePro', 'ReinsuranceMaster', 'DataSuite', 'Sapiens Decision', 'Cloud Services'],
    discoveryQuestions: [
      'Which reinsurance types are in scope: treaty, facultative, ceded, assumed or retroceded?',
      'Where does leakage occur today: contract setup, bordereaux, calculations, claims, settlements or reporting?',
      'How many systems/spreadsheets hold treaty, premium, claims and recovery data?',
      'Does the buyer need a North America ReinsurancePro fit or EMEA/global ReinsuranceMaster fit?',
      'What financial controls and audit trails are required for recoverables and settlements?',
    ],
    proposalAngles: [
      'Lead with control: centralise treaty, facultative, ceded/assumed/retroceded processes into a governed operating layer.',
      'Connect reinsurance automation to leakage reduction, faster renewal processing and cleaner financial reporting.',
      'Attach DataSuite when the buyer needs better analytics, reporting and visibility across reinsurance data.',
      'Use Cloud Services where operational resilience and managed environments are part of the transformation case.',
    ],
    risks: [
      'Validate product fit by region: ReinsurancePro is presented on North America pages; ReinsuranceMaster is prominent in EMEA/global pages.',
      'Do not quantify leakage savings without customer data and Sapiens validation.',
    ],
    sources: [
      officialSource('ReinsurancePro', 'https://sapiens.com/us/reinsurance/reinsurancepro/', 'Official page describes automation for underwriting and administration of treaty/facultative, ceded, assumed and retroceded reinsurance.'),
      officialSource('ReinsuranceMaster', 'https://sapiens.com/reinsurance/reinsurancemaster/', 'Official page describes a comprehensive single platform for large and multinational reinsurance programs with financial control across lines of business.'),
    ],
  },
  {
    id: 'digital-data-decision-platform',
    title: 'Digital, Data and Decision layer: DigitalSuite, DataSuite, DataHub and Sapiens Decision',
    category: 'Data & Analytics',
    region: 'Global',
    buyerSignals: ['Digital engagement', 'Analytics modernisation', 'Speed to market', 'Claims automation', 'Underwriting automation'],
    summary:
      'Sapiens business applications create the cross-core intelligence layer: DigitalSuite for customer, agent and third-party digital engagement; DataSuite/DataHub for multi-source data consolidation, 360-degree views, BI and analytics; and Sapiens Decision for no-code rule/decision automation with public claims around reduced IT involvement, faster time-to-market and efficiency gains.',
    salesUse:
      'Use when the buyer does not want to replace the core immediately but needs better digital journeys, data visibility, decision automation, claims/underwriting rules or AI-readiness.',
    productFit: ['DigitalSuite', 'Persona-Based Portals', 'CustomerConnect', 'AgentConnect', 'DataSuite', 'DataHub', 'Sapiens Decision'],
    discoveryQuestions: [
      'Which personas need digital journeys: customers, agents, brokers, employers, administrators, claim handlers or third parties?',
      'Which data sources need to be consolidated for 360-degree customer/agent/policy/claims visibility?',
      'Which business rules change most often and currently require IT release cycles?',
      'Where would faster decision automation have the highest impact: underwriting, claims, pricing, product configuration or compliance?',
      'Does the buyer need portals, APIs, embedded BI, predictive models or GenAI-enabled workflows?',
    ],
    proposalAngles: [
      'Use this as the non-core entry point: improve engagement, data and decisions around existing systems before full PAS transformation.',
      'Position DigitalSuite as the experience layer across personas and channels.',
      'Position DataSuite/DataHub as the single-view and analytics foundation for AI and operational reporting.',
      'Position Sapiens Decision where business users need no-code control over rules and same-day changes.',
    ],
    risks: [
      'Public Decision metrics should be attributed to Sapiens official material and validated for the specific use case before proposal commitment.',
      'Do not present DataSuite as replacing every enterprise data warehouse or actuarial model without architecture discovery.',
    ],
    sources: [
      officialSource('DigitalSuite', 'https://sapiens.com/digitalsuite/', 'Official page describes seamless digital experiences for customers, agents and third parties, including persona-based portals and portal component libraries.'),
      officialSource('Persona-Based Portals', 'https://sapiens.com/digitalsuite/persona-based-portals/', 'Official page describes dynamic persona-based portals for all lines of business and personas including vendors, agents, brokers, employers and administrators.'),
      officialSource('DataSuite', 'https://sapiens.com/datasuite/', 'Official page describes collecting, aggregating and optimizing data from multiple sources to unlock business insights.'),
      officialSource('DataHub', 'https://sapiens.com/datasuite/datahub/', 'Official page describes consolidation from various sources into a 360-degree view with rapid access, visualization, BI and API-style exposure.'),
      officialSource('Sapiens Decision', 'https://sapiens.com/decision-management/', 'Official page describes no-code tools for same-day rule changes and cites benefits including less IT involvement, faster time-to-market and operating efficiency improvement.'),
    ],
  },
  {
    id: 'cloud-saas-managed-services',
    title: 'SaaS, cloud and managed services operating model',
    category: 'Cloud Services',
    region: 'Global',
    buyerSignals: ['Cloud migration', 'Operational resilience', 'Cost takeout', 'Legacy platform risk'],
    summary:
      'Sapiens cloud materials position the company as providing enterprise-grade cloud services, support, operational environment management, monitoring, backup/disaster recovery, deployment, security management and service governance. Sapiens SaaS/Cloud materials reference over 160 cloud customers, four global support centers, 200 dedicated professionals, 120+ certifications, Azure and a Microsoft partnership, and 24/7 service desk support.',
    salesUse:
      'Use when CIO/COO buyers are concerned about operational burden, resilience, environment management, disaster recovery, release governance or moving from on-prem to SaaS/cloud.',
    productFit: ['Sapiens Cloud Hosting', 'Cloud Services', 'SaaS/Cloud', '24/7 Service Desk', 'Environments & Release Mgmt', 'Premium AMS Pod'],
    discoveryQuestions: [
      'What is the current hosting model and who owns environment support, monitoring, backup and DR?',
      'Which operational risks are most painful: outages, release windows, security controls, recovery testing or skills shortages?',
      'Does the buyer require Azure alignment, Microsoft partnership evidence, certifications or global support coverage?',
      'What are the current SLAs and where does the business need stronger governance?',
      'Is this a new SaaS deployment, migration from on-prem, or managed-services wrap around existing Sapiens products?',
    ],
    proposalAngles: [
      'Lead with business focus: insurer focuses on insurance while Sapiens handles cloud operations and platform resilience.',
      'Use Sapiens cloud scale proof points as confidence builders, but keep them attributed to official Sapiens material.',
      'Package cloud services with Premium AMS when the customer wants proactive performance, release and environment governance.',
    ],
    risks: [
      'Validate current Sapiens cloud service levels, certifications and support model before including in an external proposal.',
      'Do not promise a specific 99.5% SLA unless the commercial/legal team confirms it for the product and region.',
    ],
    sources: [
      officialSource('Cloud Services', 'https://sapiens.com/cloud-services/', 'Official page describes enterprise-grade cloud services and support including environment management, monitoring, backup/DR, deployment, security management and service governance.'),
      officialSource('SaaS/Cloud', 'https://sapiens.com/insurance-platform/saas-cloud/', 'Official page references over 160 cloud customers, four global support centers, 200 dedicated professionals, 120+ certifications, Azure, Microsoft partnership and 24/7 service desk.'),
    ],
  },
  {
    id: 'automation-ai-insurance-platform',
    title: 'Automation & AI across the Sapiens Insurance Platform',
    category: 'Decision Automation',
    region: 'Global',
    buyerSignals: ['Claims automation', 'Underwriting automation', 'Cost takeout', 'Speed to market'],
    summary:
      'Sapiens Insurance Platform materials describe embedded AI for intelligent business operations, including AI co-personas, smart process automation, generative AI capabilities and machine-learning models. Data, AI & Analytics materials describe reports, dashboards, advanced analytics and customer/agent 360-degree views.',
    salesUse:
      'Use when the customer asks how Sapiens turns core systems into an AI-ready operating platform rather than isolated AI experiments.',
    productFit: ['Automation & AI', 'Data, AI & Analytics', 'Sapiens Decision', 'DataSuite', 'DigitalSuite', 'UnderwritingPro', 'ClaimsPro'],
    discoveryQuestions: [
      'Which persona would benefit most from an AI co-persona: agent, customer, claim handler, employer, underwriter or service team?',
      'Which process should be automated first and what exception/approval controls are needed?',
      'What data quality, lineage and access issues block AI/ML today?',
      'Where would predictive models or GenAI support productivity without creating unacceptable regulatory or governance risk?',
    ],
    proposalAngles: [
      'Position AI as embedded operating capability tied to data, decisioning and workflow — not a standalone chatbot.',
      'Use claims, underwriting and service personas as concrete first-wave use cases.',
      'Attach DataSuite and Decision so AI recommendations have data foundation and governed rule execution.',
    ],
    risks: [
      'Keep AI claims conservative and governance-led; validate any regulated decisioning use case with product/legal teams.',
      'Separate AI assistance, automation and final business decision rights in the proposal.',
    ],
    sources: [
      officialSource('Automation & AI', 'https://sapiens.com/insurance-platform/automation-and-ai/', 'Official page describes embedded AI, AI co-personas, smart process automation, GenAI capabilities and ML models.'),
      officialSource('Data, AI & Analytics', 'https://sapiens.com/insurance-platform/data-ai-and-analytics/', 'Official page describes reports/dashboards, advanced analytics and customer/agent 360-degree views powered by ML, predictive models and GenAI.'),
    ],
  },
  {
    id: 'finland-compliance-operating-pack',
    title: 'Finland compliance operating pack',
    category: 'Compliance',
    region: 'Finland / Nordics',
    buyerSignals: ['Regulatory pressure', 'Operational resilience', 'Cost takeout'],
    summary:
      'A reusable intelligence pack for Finnish/Nordic insurers that need to discuss local compliance coverage, auditability and reporting discipline without turning the pitch into legal advice. Product fit should be based on governed decision rules, data lineage/reporting, security controls and managed release governance.',
    salesUse:
      'Use when a Finnish or Nordic insurer asks whether a Sapiens subscription can support local regulatory controls, operational reporting or audit readiness.',
    productFit: ['Enterprise Security & Compliance', 'DataSuite', 'DataHub', 'Sapiens Decision', 'Cloud Services', 'Premium AMS Pod'],
    discoveryQuestions: [
      'Which Finnish regulatory reporting obligations are in scope for this discussion?',
      'Where are compliance checks handled today: policy admin, rules engine, spreadsheets or manual operations?',
      'Which audit evidence does the team struggle to produce quickly?',
      'Are the pain points data lineage, rules governance, reporting, approvals or release control?',
    ],
    proposalAngles: [
      'Position compliance as an operating model: governed rules, auditable data, controlled releases and managed service routines.',
      'Show how Decision plus DataSuite can separate rule logic and reporting evidence from hard-coded platform change.',
      'Frame Premium AMS/Cloud Services as recurring assurance: support, governance, monitoring and release discipline.',
    ],
    risks: [
      'Do not claim specific legal/regulatory compliance until Sapiens legal/product validates the jurisdictional requirement.',
      'Separate public regulatory facts from illustrative demo assumptions.',
      'Mark any Finnish-specific obligations as validation required if no source has been attached.',
    ],
    sources: [
      { title: 'Client feedback: niche compliance checks needed', type: 'Client feedback', confidence: 'Grounded', note: 'Client specifically cited a compliance check in Finland as the kind of niche use case sales teams need to package quickly.' },
      officialSource('Sapiens Decision', 'https://sapiens.com/decision-management/', 'Official page supports the governed rules/no-code decisioning part of the compliance operating model.'),
      officialSource('DataSuite', 'https://sapiens.com/datasuite/', 'Official page supports the data aggregation and insight layer.'),
      officialSource('Cloud Services', 'https://sapiens.com/cloud-services/', 'Official page supports operational management, monitoring, backup/DR and governance components.'),
    ],
  },
  {
    id: 'saas-migration-pathway',
    title: 'SaaS migration pathway intelligence',
    category: 'Migration',
    region: 'Global',
    buyerSignals: ['Cloud migration', 'Legacy platform risk', 'Operational resilience', 'Cost takeout'],
    summary:
      'A proposal-ready migration narrative for customers moving from on-prem or heavily customised legacy estates to a controlled Sapiens SaaS/cloud operating model backed by cloud operations, support centres, service governance and environment management.',
    salesUse:
      'Use when the buyer asks for SaaS migration, upgrade avoidance, cloud operations, release control or a pathway away from legacy customisation.',
    productFit: ['Sapiens Cloud Hosting', 'Cloud Services', 'SaaS/Cloud', 'Environments & Release Mgmt', 'Continuous Platform Updates', 'Automated Regression Suite', 'Managed Cloud Operations'],
    discoveryQuestions: [
      'Which system, version and hosting model are currently in production?',
      'What is the upgrade backlog and how often does the customer defer releases?',
      'Which customisations block cloud movement today?',
      'What migration pattern is acceptable: direct cutover, phased module migration or parallel run?',
    ],
    proposalAngles: [
      'Lead with risk reduction: remove upgrade cliffs, environment drift and fragile release processes.',
      'Package the migration as SaaS foundation plus Evergreen plus managed cloud operations.',
      'Use cloud operations, monitoring, backup/DR and service governance as the evidence layer behind the subscription story.',
    ],
    risks: [
      'Avoid promising migration duration without platform/version discovery.',
      'Do not imply all customisations can be preserved unchanged in SaaS.',
      'Flag data migration and integration complexity as discovery outputs, not assumptions.',
    ],
    sources: [
      { title: 'Client feedback: migration use cases required', type: 'Client feedback', confidence: 'Grounded', note: 'Client cited migration as a niche content use case sales teams need to support.' },
      officialSource('SaaS/Cloud', 'https://sapiens.com/insurance-platform/saas-cloud/', 'Official page supports cloud scale, Azure/Microsoft partnership, support centres, certifications and 24/7 service desk claims.'),
      officialSource('Cloud Services', 'https://sapiens.com/cloud-services/', 'Official page supports environment management, monitoring, backup/DR, security and service governance.'),
    ],
  },
  {
    id: 'sas-analytics-modernisation',
    title: 'SAS / actuarial analytics modernisation',
    category: 'Data & Analytics',
    region: 'Global',
    buyerSignals: ['Analytics modernisation', 'Cost takeout', 'Legacy platform risk'],
    summary:
      'A reusable narrative for buyers with SAS-heavy analytics, reporting or actuarial workflows who need a modern governed data layer around Sapiens operations. DataSuite/DataHub should be positioned as the operational data and insight layer, not as an automatic replacement for every actuarial model.',
    salesUse:
      'Use when the buyer mentions SAS, actuarial data marts, manual reporting, offline analytics or legacy analytical workflows around core insurance systems.',
    productFit: ['DataSuite', 'DataHub', 'Data, AI & Analytics', 'ReinsuranceMaster / ReinsurancePro reporting context', 'Premium AMS Pod'],
    discoveryQuestions: [
      'Which SAS workloads are business-critical: pricing, reserving, reporting, actuarial analysis or regulatory packs?',
      'What data currently moves between Sapiens systems, warehouses and SAS environments?',
      'Where are the manual controls and reconciliation points?',
      'Is the goal full migration, coexistence, governance or faster proposal evidence?',
    ],
    proposalAngles: [
      'Frame DataSuite as the governed operational data layer, not a forced rip-and-replace of every analytical model.',
      'Start with coexistence and evidence: lineage, data quality, reporting speed and operating control.',
      'Use DataHub/360-degree view language where the buyer needs data access and visualization across sources.',
    ],
    risks: [
      'Clarify whether “SAS migration” means SaaS platform migration or SAS analytics modernisation before scoping.',
      'Do not claim replacement of specialised actuarial models without product/delivery validation.',
      'Separate data integration, reporting and model migration into different workstreams.',
    ],
    sources: [
      { title: 'Ambiguous client wording: SAS/SaaS migration', type: 'Client feedback', confidence: 'Needs validation', note: 'Captured because “SAS migration” may mean SAS analytics migration or SaaS migration. The interface makes that ambiguity explicit.' },
      officialSource('DataSuite', 'https://sapiens.com/datasuite/', 'Official page supports multi-source data aggregation and optimization for insights.'),
      officialSource('DataHub', 'https://sapiens.com/datasuite/datahub/', 'Official page supports 360-degree view, rapid data access, visualization and BI capabilities.'),
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
    productFit: ['Services Catalog', 'Cohort Mapping', 'Sales Configurator', 'Deal Advisor'],
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
      { title: 'Operating strategy from client feedback', type: 'Client feedback', confidence: 'Grounded', note: 'The client needs content-specific use cases before sales teams can compile stronger proposals and product offerings.' },
    ],
  },
];

export const useCaseTemplates: UseCaseTemplate[] = [
  {
    id: 'pc-core-modernisation',
    title: 'P&C core modernisation proposal starter',
    clientNeed: 'A P&C insurer needs to modernise policy, billing and claims operations without losing control of product configuration, distribution channels or legacy migration risk.',
    region: 'EMEA / APAC / North America',
    category: 'Core Platform',
    defaultBuyer: 'P&C carrier CIO / COO / transformation sponsor',
    urgency: 'Immediate',
    assetIds: ['pc-coresuite-iditsuite-modernisation', 'north-america-pc-policypro-billingpro-claimspro', 'digital-data-decision-platform'],
    recommendedModules: ['IDITSuite or PolicyPro', 'BillingMaster/BillingPro', 'ClaimsMaster/ClaimsPro', 'DigitalSuite', 'DataSuite', 'Sapiens Decision'],
    proposalSections: ['Current-state platform risk', 'Regional product fit', 'Modular vs full-suite pathway', 'Digital/data/decision add-ons', 'Implementation discovery questions'],
    outputPromise: 'A grounded P&C proposal starter that distinguishes regional product naming and maps policy, billing, claims, digital and data capabilities to the buyer pain.',
  },
  {
    id: 'north-america-claims-automation',
    title: 'North America claims automation pack',
    clientNeed: 'A North American P&C insurer wants to improve claims speed, adjuster productivity and auditability with configurable AI-driven automation.',
    region: 'North America',
    category: 'Decision Automation',
    defaultBuyer: 'P&C claims executive / COO',
    urgency: 'Immediate',
    assetIds: ['north-america-pc-policypro-billingpro-claimspro', 'automation-ai-insurance-platform', 'digital-data-decision-platform'],
    recommendedModules: ['ClaimsPro', 'Sapiens Decision', 'DataSuite', 'DigitalSuite', 'Automation & AI'],
    proposalSections: ['Claims pain and leakage points', 'ClaimsPro automation fit', 'Decisioning and AI controls', 'Data visibility layer', 'Governance and exception handling'],
    outputPromise: 'A claims-focused talk track that keeps AI claims conservative and ties automation to governance, data and adjuster workflow.',
  },
  {
    id: 'life-underwriting-acceleration',
    title: 'Life underwriting acceleration pack',
    clientNeed: 'A Life & Annuities business wants faster new business, higher straight-through processing and modern underwriting workflows without losing governance.',
    region: 'North America / Global',
    category: 'Life & Annuities',
    defaultBuyer: 'Life & Annuities new business / underwriting leader',
    urgency: 'Near-term',
    assetIds: ['life-pensions-annuities-core-underwriting-illustration', 'automation-ai-insurance-platform', 'digital-data-decision-platform'],
    recommendedModules: ['UnderwritingPro', 'CoreSuite for Life & Annuities', 'IllustrationPro', 'Sapiens Decision', 'DataSuite'],
    proposalSections: ['New business bottlenecks', 'UnderwritingPro automation pathway', 'PAS and illustration integration', 'Data/evidence sources', 'Risk governance and human oversight'],
    outputPromise: 'A life underwriting pack that links AI-supported underwriting to PAS, data and governance rather than overclaiming autonomous decisioning.',
  },
  {
    id: 'reinsurance-leakage-control',
    title: 'Reinsurance leakage and control pack',
    clientNeed: 'A reinsurer or carrier needs to reduce manual treaty administration, leakage, spreadsheet dependency and weak financial controls across ceded/assumed reinsurance.',
    region: 'Global / North America / EMEA',
    category: 'Reinsurance',
    defaultBuyer: 'Reinsurance operations / CFO / risk sponsor',
    urgency: 'Immediate',
    assetIds: ['reinsurance-automation-reinsurancepro-reinsurancemaster', 'digital-data-decision-platform', 'cloud-saas-managed-services'],
    recommendedModules: ['ReinsurancePro or ReinsuranceMaster', 'DataSuite', 'Sapiens Decision', 'Cloud Services'],
    proposalSections: ['Treaty and facultative current state', 'Leakage/control risk points', 'Regional product fit', 'Data and reporting layer', 'Financial governance and audit trail'],
    outputPromise: 'A reinsurance-specific pack for moving from spreadsheet/manual control to governed automation and better financial visibility.',
  },
  {
    id: 'digital-data-decision-entry-point',
    title: 'Digital, data and decision entry-point pack',
    clientNeed: 'A carrier is not ready for core replacement but needs better digital journeys, data visibility and business-controlled decision automation around existing systems.',
    region: 'Global',
    category: 'Digital Engagement',
    defaultBuyer: 'Carrier digital / data / operations sponsor',
    urgency: 'Near-term',
    assetIds: ['digital-data-decision-platform', 'automation-ai-insurance-platform', 'proposal-pack-operating-model'],
    recommendedModules: ['DigitalSuite', 'Persona-Based Portals', 'DataSuite', 'DataHub', 'Sapiens Decision'],
    proposalSections: ['Non-core transformation entry point', 'Persona journey map', 'Data foundation and 360-degree view', 'No-code decisioning opportunities', 'Validation and integration scope'],
    outputPromise: 'A practical entry-point pack that gives sales a credible route when the customer needs value before a full core programme.',
  },
  {
    id: 'finland-compliance-check',
    title: 'Finland compliance check',
    clientNeed: 'Sales needs a credible starting pack for a Finnish insurer asking how the Sapiens subscription model supports local compliance checks, audit evidence and reporting discipline.',
    region: 'Finland',
    category: 'Compliance',
    defaultBuyer: 'Nordic insurer / compliance-led transformation team',
    urgency: 'Immediate',
    assetIds: ['finland-compliance-operating-pack', 'digital-data-decision-platform', 'cloud-saas-managed-services'],
    recommendedModules: ['Enterprise Security & Compliance', 'Sapiens Decision', 'DataSuite', 'DataHub', 'Cloud Services', 'Premium AMS Pod'],
    proposalSections: ['Compliance operating model', 'Governed rules and audit trail', 'Data/reporting evidence layer', 'Managed assurance cadence', 'Validation caveats and next discovery steps'],
    outputPromise: 'A sales-ready compliance use-case pack that is specific enough to open the conversation but clearly marked for regulatory validation.',
  },
  {
    id: 'saas-migration',
    title: 'SaaS migration proposal starter',
    clientNeed: 'Sales needs to package a migration pathway from legacy/on-prem Sapiens estates into a subscription SaaS/cloud operating model.',
    region: 'Global',
    category: 'Migration',
    defaultBuyer: 'Legacy on-prem carrier / CIO transformation sponsor',
    urgency: 'Immediate',
    assetIds: ['saas-migration-pathway', 'cloud-saas-managed-services', 'proposal-pack-operating-model'],
    recommendedModules: ['Sapiens Cloud Hosting', 'Cloud Services', 'SaaS/Cloud', 'Environments & Release Mgmt', 'Continuous Platform Updates', 'Automated Regression Suite', 'Managed Cloud Operations'],
    proposalSections: ['Current-state risk', 'Migration pathway', 'Cloud operations model', 'Regression and cutover assurance', 'Service governance and success plan'],
    outputPromise: 'A migration-focused package that helps sales move from “we can host it” to a coherent subscription transformation story.',
  },
  {
    id: 'sas-analytics-modernisation',
    title: 'SAS analytics modernisation',
    clientNeed: 'Sales needs a structured way to discuss SAS-heavy reporting/analytics environments and modern data-layer opportunities around the Sapiens platform.',
    region: 'Global',
    category: 'Data & Analytics',
    defaultBuyer: 'Carrier with SAS-heavy reporting, actuarial or analytics workflows',
    urgency: 'Near-term',
    assetIds: ['sas-analytics-modernisation', 'digital-data-decision-platform', 'proposal-pack-operating-model'],
    recommendedModules: ['DataSuite', 'DataHub', 'Data, AI & Analytics', 'Reinsurance reporting context', 'Premium AMS Pod'],
    proposalSections: ['Analytics current state', 'Data integration and lineage', 'Coexistence vs migration options', 'Reporting assurance', 'Validation and scoping questions'],
    outputPromise: 'A careful proposal starter that clarifies whether the buyer means SaaS migration or SAS analytics migration before over-scoping.',
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

  const discoveryQuestions = Array.from(new Set(assets.flatMap((asset) => asset.discoveryQuestions)));
  const proposalAngles = Array.from(new Set(assets.flatMap((asset) => asset.proposalAngles)));
  const risks = Array.from(new Set(assets.flatMap((asset) => asset.risks)));
  const confidence = assets.some((asset) => asset.sources.some((source) => source.confidence === 'Needs validation'))
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
