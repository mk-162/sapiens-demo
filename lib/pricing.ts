import type { Module, PricingBreakdown } from './types';
import { getModuleById, moduleBlocks } from './data';

export const F_SCALE_REFERENCE_GWP = 10_000_000;

export function calculateScaleFactor(gwp: number): number {
  const scale = 1 + 0.25 * Math.log10(gwp / F_SCALE_REFERENCE_GWP);
  return Math.min(Math.max(scale, 1), 2.2);
}

const PREMIUM_AMS_BLOCK = 'premium-ams';
const PRO_SERVICES_BASE = 350_000;
const PRO_SERVICES_PER_SCALE = 220_000;

export function calculatePricing(
  moduleIds: string[],
  gwp: number,
): PricingBreakdown {
  const scaleFactor = calculateScaleFactor(gwp);
  const blockSurcharges = new Map(
    moduleBlocks.map((b) => [b.id, b.surchargePercent]),
  );

  const resolved: Module[] = moduleIds
    .map((id) => getModuleById(id))
    .filter((m): m is Module => Boolean(m));

  let basePlatformARR = 0;
  let surchargeARR = 0;
  let cloudOpsARR = 0;

  const perModule = resolved.map((mod) => {
    const scaled = mod.basePrice * scaleFactor;
    const surchargePct =
      mod.surchargePercent ?? blockSurcharges.get(mod.block) ?? 0;
    const surcharge = scaled * surchargePct;

    if (mod.block === PREMIUM_AMS_BLOCK) {
      cloudOpsARR += scaled + surcharge;
    } else {
      basePlatformARR += scaled;
      surchargeARR += surcharge;
    }

    return {
      id: mod.id,
      name: mod.name,
      block: mod.block,
      scaled: Math.round(scaled),
      surcharge: Math.round(surcharge),
    };
  });

  const professionalServices = Math.round(
    PRO_SERVICES_BASE + PRO_SERVICES_PER_SCALE * (scaleFactor - 1),
  );

  const annualARR = basePlatformARR + surchargeARR + cloudOpsARR;
  const firstYearTotal = annualARR + professionalServices;

  return {
    scaleFactor: Number(scaleFactor.toFixed(2)),
    basePlatformARR: Math.round(basePlatformARR),
    surchargeARR: Math.round(surchargeARR),
    cloudOpsARR: Math.round(cloudOpsARR),
    professionalServices,
    firstYearTotal: Math.round(firstYearTotal),
    annualARR: Math.round(annualARR),
    perModule,
  };
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}k`;
  }
  return `$${value.toLocaleString()}`;
}

export function formatGWP(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  return `$${Math.round(value / 1_000_000)}M`;
}
