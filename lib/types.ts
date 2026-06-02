export type LifecycleStatus = 'Future Platform' | 'Maintain' | 'End of Life';

export interface Module {
  id: string;
  name: string;
  category: string;
  type: 'Platform' | 'Add-on' | 'Professional Service';
  basePrice: number;
  lifecycle: LifecycleStatus;
  recommendedCohorts: string[];
}

export interface Cohort {
  id: string;
  name: string;
  gwpRange: string;
  recommendedPackage: string;
  migrationStrategy: string;
}

export interface Package {
  id: string;
  name: string;
  targetCohorts: string[];
  modules: string[];
  pricingModel: string;
  timeline: string;
  status: string;
  valueProposition: string;
}

export interface Configuration {
  id: string;
  cohortId: string;
  moduleIds: string[];
  gwp: number;
  scaleFactor: number;
  scaledARR: number;
  cloudOps: number;
  professionalServices: number;
  firstYearTotal: number;
  annualARR: number;
}