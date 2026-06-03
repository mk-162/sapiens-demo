export type LifecycleStatus = 'Future Platform' | 'Maintain' | 'End of Life';

export type ModuleBlockId =
  | 'foundational-core'
  | 'evergreen'
  | 'decision-intelligence'
  | 'digital-data'
  | 'premium-ams';

export interface ModuleBlock {
  id: ModuleBlockId;
  name: string;
  shortName: string;
  description: string;
  surchargeLabel: string;
  surchargePercent: number;
  required: boolean;
  order: number;
}

export type ModuleType = 'Platform' | 'Add-on' | 'Professional Service';

export interface Module {
  id: string;
  name: string;
  block: ModuleBlockId;
  description: string;
  type: ModuleType;
  basePrice: number;
  surchargePercent?: number;
  lifecycle: LifecycleStatus;
  targetCohorts: string[];
  required?: boolean;
  recommended?: boolean;
}

export type RecommendedPath =
  | 'Direct-to-SaaS'
  | 'SaaS Native Growth'
  | 'Hybrid Bridge'
  | 'Data & Decision Led'
  | 'Maintain → Future Pilot';

export interface Cohort {
  id: string;
  name: string;
  gwpRange: string;
  gwpMidpoint: number;
  characteristics: string[];
  recommendedPath: RecommendedPath;
  lifecycleMapping: {
    futurePlatform: string;
    maintain: string;
    endOfLife: string;
  };
  recommendedPackageId: string;
  recommendedModuleIds: string[];
  salesRationale: string;
  tagline: string;
}

export interface PricingModel {
  baseSurchargePercent: number;
  description: string;
}

export interface LaunchPackage {
  id: string;
  name: string;
  subtitle: string;
  targetCohorts: string[];
  modules: string[];
  pricingModel: PricingModel;
  timeline: string;
  status: string;
  valueProposition: string;
  valueBullets: string[];
  guardrail: string;
  surchargeSummary: string;
}

export interface PricingBreakdown {
  scaleFactor: number;
  basePlatformARR: number;
  surchargeARR: number;
  cloudOpsARR: number;
  professionalServices: number;
  firstYearTotal: number;
  annualARR: number;
  perModule: Array<{
    id: string;
    name: string;
    block: ModuleBlockId;
    scaled: number;
    surcharge: number;
  }>;
}

export interface BenchmarkConfig {
  id: string;
  label: string;
  description: string;
  cohortId: string;
  packageId: string;
  moduleIds: string[];
  gwp: number;
}
