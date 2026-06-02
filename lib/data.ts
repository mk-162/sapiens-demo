import { Module, Cohort, Package } from './types';

export const modules: Module[] = [
  {
    id: 'iditsuite',
    name: 'IDITSuite Core PAS',
    category: 'Core Platform',
    type: 'Platform',
    basePrice: 240000,
    lifecycle: 'Future Platform',
    recommendedCohorts: ['Tier 1 Enterprise', 'Reinsurance & Global Specialty', 'Tier 2–3 Mid-Market']
  },
  {
    id: 'coresuite',
    name: 'CoreSuite Life & Pensions',
    category: 'Core Platform',
    type: 'Platform',
    basePrice: 250000,
    lifecycle: 'Future Platform',
    recommendedCohorts: ['Tier 1 Enterprise', 'Tier 2–3 Mid-Market']
  },
  {
    id: 'scipsuite',
    name: 'SCIPSuite',
    category: 'Core Platform',
    type: 'Platform',
    basePrice: 145000,
    lifecycle: 'Future Platform',
    recommendedCohorts: ['Tier 2–3 Mid-Market', 'MGAs & Specialty']
  },
  {
    id: 'dianasuite',
    name: 'DIANASuite',
    category: 'Core Platform',
    type: 'Platform',
    basePrice: 115000,
    lifecycle: 'Maintain',
    recommendedCohorts: ['Legacy On-Prem Holdouts']
  },
  {
    id: 'reinsurancepro',
    name: 'ReinsurancePro',
    category: 'Core Platform',
    type: 'Add-on',
    basePrice: 125000,
    lifecycle: 'Future Platform',
    recommendedCohorts: ['Reinsurance & Global Specialty', 'Tier 1 Enterprise']
  },
  {
    id: 'digitalsuite-portals',
    name: 'DigitalSuite Portals',
    category: 'Digital & Data',
    type: 'Add-on',
    basePrice: 95000,
    lifecycle: 'Future Platform',
    recommendedCohorts: ['All Cohorts']
  },
  {
    id: 'digitalsuite-ace',
    name: 'DigitalSuite ACE',
    category: 'Digital & Data',
    type: 'Platform',
    basePrice: 85000,
    lifecycle: 'Future Platform',
    recommendedCohorts: ['Tier 1 Enterprise', 'Reinsurance & Global Specialty']
  },
  {
    id: 'datasuite-datahub',
    name: 'DataSuite DataHub',
    category: 'Digital & Data',
    type: 'Platform',
    basePrice: 160000,
    lifecycle: 'Future Platform',
    recommendedCohorts: ['Tier 1 Enterprise', 'Reinsurance & Global Specialty']
  },
  {
    id: 'decision',
    name: 'Sapiens Decision',
    category: 'Decision & Intelligence',
    type: 'Platform',
    basePrice: 135000,
    lifecycle: 'Future Platform',
    recommendedCohorts: ['Tier 1 Enterprise', 'Tier 2–3 Mid-Market', 'Reinsurance & Global Specialty']
  },
  {
    id: 'genai-copilot',
    name: 'GenAI Reporting Copilot',
    category: 'Decision & Intelligence',
    type: 'Add-on',
    basePrice: 65000,
    lifecycle: 'Future Platform',
    recommendedCohorts: ['Tier 1 Enterprise', 'Tier 2–3 Mid-Market']
  },
  {
    id: 'cloud-ops',
    name: 'Cloud Managed Operations',
    category: 'Cloud & Operations',
    type: 'Professional Service',
    basePrice: 190000,
    lifecycle: 'Maintain',
    recommendedCohorts: ['All Cohorts']
  },
  {
    id: 'transition-suite',
    name: 'Transition & Integration Suite',
    category: 'Cloud & Operations',
    type: 'Professional Service',
    basePrice: 170000,
    lifecycle: 'Maintain',
    recommendedCohorts: ['All Cohorts']
  }
];

export const cohorts: Cohort[] = [
  {
    id: 'tier1',
    name: 'Tier 1 Enterprise',
    gwpRange: '> $1 Billion',
    recommendedPackage: 'Cognitive Core Suite',
    migrationStrategy: 'Hybrid Bridge'
  },
  {
    id: 'midmarket',
    name: 'Tier 2–3 Mid-Market',
    gwpRange: '$150M – $1B',
    recommendedPackage: 'Core Resilience Framework',
    migrationStrategy: 'Direct-to-SaaS'
  },
  {
    id: 'mga',
    name: 'MGAs & Specialty',
    gwpRange: '$30M – $150M',
    recommendedPackage: 'Core Resilience Framework',
    migrationStrategy: 'SaaS Native'
  },
  {
    id: 'reinsurance',
    name: 'Reinsurance & Global Specialty',
    gwpRange: '$500M – $5B+',
    recommendedPackage: 'Cognitive Core Suite',
    migrationStrategy: 'Direct-to-SaaS'
  },
  {
    id: 'legacy',
    name: 'Legacy On-Prem Holdouts',
    gwpRange: '$100M – $800M',
    recommendedPackage: 'Core Resilience Framework',
    migrationStrategy: 'Slow Transition'
  }
];

export const packages = [
  {
    id: 'resilience',
    name: 'Core Resilience Framework',
    targetCohorts: ['Tier 2–3 Mid-Market', 'MGAs & Specialty', 'Legacy On-Prem Holdouts'],
    modules: ['scipsuite', 'digitalsuite-portals', 'cloud-ops', 'transition-suite'],
    pricingModel: 'Base + Flat Surcharges',
    timeline: '6–9 months',
    status: 'General Availability',
    valueProposition: 'Modern, predictable foundation with reduced legacy maintenance burden.'
  },
  {
    id: 'cognitive',
    name: 'Cognitive Core Suite',
    targetCohorts: ['Tier 1 Enterprise', 'Reinsurance & Global Specialty'],
    modules: ['iditsuite', 'digitalsuite-ace', 'decision', 'datasuite-datahub', 'genai-copilot', 'cloud-ops'],
    pricingModel: 'Base + Volumetric Surcharges',
    timeline: '12–18 months',
    status: 'Beta',
    valueProposition: 'Real-time intelligence and decision automation embedded in core operations.'
  }
];