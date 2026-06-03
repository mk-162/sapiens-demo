import type {
  BenchmarkConfig,
  Cohort,
  LaunchPackage,
  Module,
  ModuleBlock,
} from './types';

export const moduleBlocks: ModuleBlock[] = [
  {
    id: 'foundational-core',
    name: 'Foundational Core SaaS',
    shortName: 'Foundational Core',
    description:
      'Hosting, security, environments, 24/7 service desk and 99.5% SLA. The non-negotiable base subscription for every new SaaS customer.',
    surchargeLabel: 'Base subscription',
    surchargePercent: 0,
    required: true,
    order: 1,
  },
  {
    id: 'evergreen',
    name: 'Evergreen Platform',
    shortName: 'Evergreen',
    description:
      'Continuous updates, automated regression and version management — eliminates upgrade projects and compounding tech debt.',
    surchargeLabel: '+15% surcharge',
    surchargePercent: 0.15,
    required: false,
    order: 2,
  },
  {
    id: 'decision-intelligence',
    name: 'Decision & Intelligence',
    shortName: 'Decision & Intelligence',
    description:
      'Sapiens Decision plus AI-powered rules, underwriting and claims automation. The cognitive layer for the policy lifecycle.',
    surchargeLabel: '+20–25% surcharge',
    surchargePercent: 0.22,
    required: false,
    order: 3,
  },
  {
    id: 'digital-data',
    name: 'Digital & Data Layer',
    shortName: 'Digital & Data',
    description:
      'DigitalSuite customer & agent portals and DataSuite real-time analytics. Powers digital channels and reporting.',
    surchargeLabel: '+15–20% surcharge',
    surchargePercent: 0.18,
    required: false,
    order: 4,
  },
  {
    id: 'premium-ams',
    name: 'Premium AMS & Cloud Ops',
    shortName: 'Premium AMS',
    description:
      'Dedicated support pod, minor configuration, managed cloud operations and proactive performance tuning.',
    surchargeLabel: '+15–20% surcharge',
    surchargePercent: 0.18,
    required: false,
    order: 5,
  },
];

export const modules: Module[] = [
  // Foundational Core SaaS
  {
    id: 'core-hosting',
    name: 'Sapiens Cloud Hosting',
    block: 'foundational-core',
    description:
      'Multi-region cloud hosting on Sapiens-managed infrastructure with elastic scaling and full DR.',
    type: 'Platform',
    basePrice: 220000,
    lifecycle: 'Future Platform',
    targetCohorts: ['All Cohorts'],
    required: true,
  },
  {
    id: 'core-security',
    name: 'Enterprise Security & Compliance',
    block: 'foundational-core',
    description:
      'SOC 2, ISO 27001, encryption at rest and in transit, identity federation and continuous threat monitoring.',
    type: 'Platform',
    basePrice: 95000,
    lifecycle: 'Future Platform',
    targetCohorts: ['All Cohorts'],
    required: true,
  },
  {
    id: 'core-environments',
    name: 'Environments & Release Mgmt',
    block: 'foundational-core',
    description:
      'Dedicated dev, test and prod environments with CI/CD pipelines and configuration management.',
    type: 'Platform',
    basePrice: 60000,
    lifecycle: 'Future Platform',
    targetCohorts: ['All Cohorts'],
    required: true,
  },
  {
    id: 'core-servicedesk',
    name: '24/7 Service Desk & 99.5% SLA',
    block: 'foundational-core',
    description:
      'Follow-the-sun service desk, incident management and the contractual 99.5% platform SLA.',
    type: 'Platform',
    basePrice: 75000,
    lifecycle: 'Future Platform',
    targetCohorts: ['All Cohorts'],
    required: true,
  },

  // Evergreen Platform
  {
    id: 'evergreen-updates',
    name: 'Continuous Platform Updates',
    block: 'evergreen',
    description:
      'Quarterly platform releases delivered automatically with zero-downtime deployments.',
    type: 'Add-on',
    basePrice: 95000,
    surchargePercent: 0.15,
    lifecycle: 'Future Platform',
    targetCohorts: ['Tier 2–3 Mid-Market', 'MGAs & Specialty', 'Legacy On-Prem Holdouts'],
    recommended: true,
  },
  {
    id: 'evergreen-regression',
    name: 'Automated Regression Suite',
    block: 'evergreen',
    description:
      'Carrier-specific regression test packs run before every release to guarantee functional continuity.',
    type: 'Add-on',
    basePrice: 70000,
    surchargePercent: 0.15,
    lifecycle: 'Future Platform',
    targetCohorts: ['All Cohorts'],
  },
  {
    id: 'evergreen-version',
    name: 'Version & Configuration Mgmt',
    block: 'evergreen',
    description:
      'Single-version policy with managed configuration drift detection — no more multi-year upgrade projects.',
    type: 'Add-on',
    basePrice: 45000,
    surchargePercent: 0.15,
    lifecycle: 'Future Platform',
    targetCohorts: ['All Cohorts'],
  },

  // Decision & Intelligence
  {
    id: 'decision-core',
    name: 'Sapiens Decision',
    block: 'decision-intelligence',
    description:
      'Model-driven business rules and decisioning engine for underwriting, claims and product configuration.',
    type: 'Platform',
    basePrice: 165000,
    surchargePercent: 0.22,
    lifecycle: 'Future Platform',
    targetCohorts: ['Tier 1 Enterprise', 'Tier 2–3 Mid-Market', 'Reinsurance & Global Specialty'],
    recommended: true,
  },
  {
    id: 'ai-underwriting',
    name: 'AI Underwriting Copilot',
    block: 'decision-intelligence',
    description:
      'LLM-assisted submission triage, risk scoring and automated referrals embedded in the underwriter desktop.',
    type: 'Add-on',
    basePrice: 110000,
    surchargePercent: 0.22,
    lifecycle: 'Future Platform',
    targetCohorts: ['Tier 1 Enterprise', 'Tier 2–3 Mid-Market', 'MGAs & Specialty'],
  },
  {
    id: 'ai-claims',
    name: 'AI Claims Automation',
    block: 'decision-intelligence',
    description:
      'Computer-vision and document understanding for FNOL, segmentation and STP claims handling.',
    type: 'Add-on',
    basePrice: 95000,
    surchargePercent: 0.22,
    lifecycle: 'Future Platform',
    targetCohorts: ['Tier 1 Enterprise', 'Tier 2–3 Mid-Market'],
  },

  // Digital & Data Layer
  {
    id: 'digitalsuite-portals',
    name: 'DigitalSuite Portals',
    block: 'digital-data',
    description:
      'Configurable customer, broker and agent portals with low-code journey design and headless APIs.',
    type: 'Platform',
    basePrice: 120000,
    surchargePercent: 0.18,
    lifecycle: 'Future Platform',
    targetCohorts: ['MGAs & Specialty', 'Tier 2–3 Mid-Market', 'Tier 1 Enterprise'],
    recommended: true,
  },
  {
    id: 'datasuite-hub',
    name: 'DataSuite Real-Time Analytics',
    block: 'digital-data',
    description:
      'Streaming data hub, governed warehouse and embedded BI for underwriting, claims and finance leaders.',
    type: 'Platform',
    basePrice: 140000,
    surchargePercent: 0.18,
    lifecycle: 'Future Platform',
    targetCohorts: ['Tier 1 Enterprise', 'Reinsurance & Global Specialty', 'Tier 2–3 Mid-Market'],
    recommended: true,
  },
  {
    id: 'reinsurance-reporting',
    name: 'Reinsurance & Treaty Reporting',
    block: 'digital-data',
    description:
      'Specialty reporting packs for treaty management, bordereaux and regulatory submissions.',
    type: 'Add-on',
    basePrice: 80000,
    surchargePercent: 0.18,
    lifecycle: 'Future Platform',
    targetCohorts: ['Reinsurance & Global Specialty', 'Tier 1 Enterprise'],
  },

  // Premium AMS & Cloud Ops
  {
    id: 'premium-ams-pod',
    name: 'Premium AMS Pod',
    block: 'premium-ams',
    description:
      'Named technical account managers, monthly minor configuration capacity and quarterly health reviews.',
    type: 'Professional Service',
    basePrice: 165000,
    surchargePercent: 0.18,
    lifecycle: 'Future Platform',
    targetCohorts: ['Tier 1 Enterprise', 'Reinsurance & Global Specialty'],
  },
  {
    id: 'cloud-ops-managed',
    name: 'Managed Cloud Operations',
    block: 'premium-ams',
    description:
      'Proactive observability, capacity planning, incident response and performance tuning of the cloud estate.',
    type: 'Professional Service',
    basePrice: 130000,
    surchargePercent: 0.18,
    lifecycle: 'Future Platform',
    targetCohorts: ['All Cohorts'],
  },
  {
    id: 'migration-bridge',
    name: 'SaaS Migration Bridge',
    block: 'premium-ams',
    description:
      'Hybrid on-prem ↔ SaaS adapters, data sync and phased cutover service for legacy estates.',
    type: 'Professional Service',
    basePrice: 210000,
    surchargePercent: 0.2,
    lifecycle: 'Maintain',
    targetCohorts: ['Legacy On-Prem Holdouts', 'Tier 1 Enterprise'],
  },
];

export const cohorts: Cohort[] = [
  {
    id: 'tier1',
    name: 'Tier 1 Enterprise',
    tagline: 'Complex legacy estates, multi-line, multi-region',
    gwpRange: 'GWP > $1B',
    gwpMidpoint: 2_500_000_000,
    characteristics: [
      'Multi-line, multi-region operating models',
      'Heavy legacy estate, long implementation cycles',
      'Strong appetite for AI and decisioning at the core',
    ],
    recommendedPath: 'Hybrid Bridge',
    lifecycleMapping: {
      futurePlatform: 'New SaaS core for greenfield lines & geographies',
      maintain: 'Existing on-prem cores kept stable during migration',
      endOfLife: 'Bespoke legacy modules sunset post go-live',
    },
    recommendedPackageId: 'intelligent',
    recommendedModuleIds: [
      'core-hosting',
      'core-security',
      'core-environments',
      'core-servicedesk',
      'evergreen-updates',
      'evergreen-regression',
      'decision-core',
      'ai-underwriting',
      'digitalsuite-portals',
      'datasuite-hub',
      'premium-ams-pod',
    ],
    salesRationale:
      'Tier 1s cannot rip-and-replace. Lead with a Hybrid Bridge: stand up Sapiens Intelligent for new lines/geographies, keep legacy in Maintain, and use the AMS pod to manage transition risk.',
  },
  {
    id: 'midmarket',
    name: 'Tier 2–3 Mid-Market',
    tagline: 'Standardisation appetite, cost sensitive, want speed',
    gwpRange: 'GWP $100M – $1B',
    gwpMidpoint: 450_000_000,
    characteristics: [
      'Looking to standardise on a modern SaaS platform',
      'Cost sensitive — TCO and time-to-value matter',
      'Limited internal IT capacity for upgrades',
    ],
    recommendedPath: 'Direct-to-SaaS',
    lifecycleMapping: {
      futurePlatform: 'Sapiens Horizon as the new system of record',
      maintain: 'Limited interim integration to incumbent finance/CRM',
      endOfLife: 'Legacy PAS retired within 18 months of go-live',
    },
    recommendedPackageId: 'horizon',
    recommendedModuleIds: [
      'core-hosting',
      'core-security',
      'core-environments',
      'core-servicedesk',
      'evergreen-updates',
      'evergreen-regression',
      'evergreen-version',
      'digitalsuite-portals',
      'cloud-ops-managed',
    ],
    salesRationale:
      'Sweet spot for Sapiens Horizon: predictable Evergreen base, fast 4–7 month implementation, 40%+ lower TCO than on-prem. Reserve Decision & Intelligence as an upsell after go-live.',
  },
  {
    id: 'mga',
    name: 'MGAs & Specialty',
    tagline: 'Agile, API-first, growth-oriented',
    gwpRange: 'GWP < $100M',
    gwpMidpoint: 60_000_000,
    characteristics: [
      'API-first, headless distribution model',
      'Need rapid product launches and pay-as-you-grow pricing',
      'Lean ops teams — no appetite for managed-services overhead',
    ],
    recommendedPath: 'SaaS Native Growth',
    lifecycleMapping: {
      futurePlatform: 'Sapiens Horizon + DigitalSuite as the only stack',
      maintain: 'N/A — no legacy to maintain',
      endOfLife: 'N/A',
    },
    recommendedPackageId: 'intelligent',
    recommendedModuleIds: [
      'core-hosting',
      'core-security',
      'core-environments',
      'core-servicedesk',
      'evergreen-updates',
      'digitalsuite-portals',
      'ai-underwriting',
      'datasuite-hub',
    ],
    salesRationale:
      'MGAs benefit most from Digital + Decision modules. Bundle Horizon with DigitalSuite Portals and AI Underwriting Copilot; defer Premium AMS to keep the price point growth-friendly.',
  },
  {
    id: 'reinsurance',
    name: 'Reinsurance & Global Specialty',
    tagline: 'Complex treaties, reporting-heavy, niche',
    gwpRange: 'GWP $250M – $5B+',
    gwpMidpoint: 1_200_000_000,
    characteristics: [
      'Complex treaty structures and ceded reporting',
      'Strict regulatory and bordereaux requirements',
      'Data quality and lineage are board-level concerns',
    ],
    recommendedPath: 'Data & Decision Led',
    lifecycleMapping: {
      futurePlatform: 'Platform + Data + Decision modules in SaaS',
      maintain: 'Treaty calc engines kept until parity is proven',
      endOfLife: 'Bespoke reporting tooling sunset post DataSuite',
    },
    recommendedPackageId: 'intelligent',
    recommendedModuleIds: [
      'core-hosting',
      'core-security',
      'core-environments',
      'core-servicedesk',
      'evergreen-updates',
      'evergreen-regression',
      'decision-core',
      'datasuite-hub',
      'reinsurance-reporting',
      'premium-ams-pod',
    ],
    salesRationale:
      'Lead with DataSuite + Decision — reinsurance buyers will not move without analytics parity. Premium AMS pod is mandatory for treaty cutover periods.',
  },
  {
    id: 'legacy',
    name: 'Legacy On-Prem Holdouts',
    tagline: 'Highly customised, resistant to rip-and-replace',
    gwpRange: 'GWP varies (mixed)',
    gwpMidpoint: 350_000_000,
    characteristics: [
      'Decades of bespoke customisation',
      'Risk-averse leadership, board-level migration scrutiny',
      'Multi-vendor integration sprawl',
    ],
    recommendedPath: 'Maintain → Future Pilot',
    lifecycleMapping: {
      futurePlatform: 'Pilot Horizon on one line of business',
      maintain: 'Existing on-prem core stays primary for 18–24 months',
      endOfLife: 'Custom add-ons retired as Horizon coverage grows',
    },
    recommendedPackageId: 'horizon',
    recommendedModuleIds: [
      'core-hosting',
      'core-security',
      'core-environments',
      'core-servicedesk',
      'evergreen-updates',
      'migration-bridge',
      'cloud-ops-managed',
    ],
    salesRationale:
      'Pitch the SaaS Migration Bridge: keep the existing system running, pilot Horizon on one LoB, prove parity, then expand. Billing should be staged around go-live milestones.',
  },
];

export const launchPackages: LaunchPackage[] = [
  {
    id: 'horizon',
    name: 'Sapiens Horizon',
    subtitle: 'Evergreen Core for modern carriers',
    targetCohorts: ['Tier 2–3 Mid-Market', 'Legacy On-Prem Holdouts'],
    modules: [
      'core-hosting',
      'core-security',
      'core-environments',
      'core-servicedesk',
      'evergreen-updates',
      'evergreen-regression',
      'evergreen-version',
    ],
    pricingModel: {
      baseSurchargePercent: 0.15,
      description: 'Base ARR indexed by GWP + 15% Evergreen surcharge',
    },
    timeline: '4–7 months to go-live',
    status: 'June 30 launch',
    valueProposition:
      'Modern Evergreen foundation: zero upgrade projects, automatic compliance updates, 40%+ lower TCO than on-prem.',
    valueBullets: [
      '40%+ lower TCO vs existing on-prem estate',
      'Automatic regulatory & compliance updates each quarter',
      'Eliminates compounding technical debt and upgrade cycles',
    ],
    guardrail:
      'Positioned as a Beta Migration Programme — 12-month phased implementation, billing starts after successful go-live.',
    surchargeSummary: 'Base + 15% Evergreen',
  },
  {
    id: 'intelligent',
    name: 'Sapiens Intelligent',
    subtitle: 'Decision, Data and Digital on the Evergreen core',
    targetCohorts: [
      'MGAs & Specialty',
      'Tier 1 Enterprise',
      'Reinsurance & Global Specialty',
    ],
    modules: [
      'core-hosting',
      'core-security',
      'core-environments',
      'core-servicedesk',
      'evergreen-updates',
      'evergreen-regression',
      'evergreen-version',
      'digitalsuite-portals',
      'datasuite-hub',
      'decision-core',
      'ai-underwriting',
    ],
    pricingModel: {
      baseSurchargePercent: 0.55,
      description: 'Base ARR + 50–60% combined surcharges (Evergreen + Digital + Decision)',
    },
    timeline: '6–10 months to go-live',
    status: 'June 30 launch',
    valueProposition:
      '50%+ reduction in manual underwriting and claims work, faster digital channel launches, real-time analytics on every decision.',
    valueBullets: [
      '50%+ reduction in manual underwriting & claims handling',
      'Digital channel launches in weeks, not quarters',
      'Real-time analytics & embedded decisioning across the lifecycle',
    ],
    guardrail:
      'Positioned as a Beta Migration Programme — 12-month phased implementation, billing starts after successful go-live.',
    surchargeSummary: 'Base + 15% Evergreen + 22% Decision + 18% Digital/Data',
  },
];

export const benchmarkConfigs: BenchmarkConfig[] = [
  {
    id: 'horizon-midmarket',
    label: 'Horizon — Mid-Market Carrier',
    description: '$450M GWP P&C carrier replacing a legacy PAS with Horizon.',
    cohortId: 'midmarket',
    packageId: 'horizon',
    moduleIds: [
      'core-hosting',
      'core-security',
      'core-environments',
      'core-servicedesk',
      'evergreen-updates',
      'evergreen-regression',
      'evergreen-version',
      'digitalsuite-portals',
      'cloud-ops-managed',
    ],
    gwp: 450_000_000,
  },
  {
    id: 'intelligent-mga',
    label: 'Intelligent — Growing MGA',
    description: '$60M GWP specialty MGA wanting AI underwriting and digital portals.',
    cohortId: 'mga',
    packageId: 'intelligent',
    moduleIds: [
      'core-hosting',
      'core-security',
      'core-environments',
      'core-servicedesk',
      'evergreen-updates',
      'digitalsuite-portals',
      'ai-underwriting',
      'datasuite-hub',
    ],
    gwp: 60_000_000,
  },
  {
    id: 'intelligent-tier1',
    label: 'Intelligent — Tier 1 Hybrid Bridge',
    description: '$2.5B GWP global insurer running Hybrid Bridge with Intelligent for new LoBs.',
    cohortId: 'tier1',
    packageId: 'intelligent',
    moduleIds: [
      'core-hosting',
      'core-security',
      'core-environments',
      'core-servicedesk',
      'evergreen-updates',
      'evergreen-regression',
      'decision-core',
      'ai-underwriting',
      'digitalsuite-portals',
      'datasuite-hub',
      'premium-ams-pod',
    ],
    gwp: 2_500_000_000,
  },
];

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getCohortById(id: string): Cohort | undefined {
  return cohorts.find((c) => c.id === id);
}

export function getPackageById(id: string): LaunchPackage | undefined {
  return launchPackages.find((p) => p.id === id);
}

export function getBlockById(id: string): ModuleBlock | undefined {
  return moduleBlocks.find((b) => b.id === id);
}
