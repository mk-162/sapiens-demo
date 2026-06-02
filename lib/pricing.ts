export function calculateScaleFactor(gwp: number): number {
  const scale = 1 + 0.25 * Math.log10(gwp / 10_000_000);
  return Math.min(Math.max(scale, 1), 2.2);
}

export function calculateTASC(
  moduleIds: string[],
  gwp: number,
  modules: any[]
) {
  const scaleFactor = calculateScaleFactor(gwp);
  
  let scaledARR = 0;
  moduleIds.forEach(id => {
    const module = modules.find(m => m.id === id);
    if (module) {
      scaledARR += module.basePrice * scaleFactor;
    }
  });

  // Simplified demo logic
  const cloudOps = moduleIds.includes('cloud-ops') ? 190000 : 0;
  const professionalServices = 150000; // average

  const firstYearTotal = scaledARR + cloudOps + professionalServices;
  const annualARR = scaledARR + cloudOps;

  return {
    scaleFactor: parseFloat(scaleFactor.toFixed(2)),
    scaledARR: Math.round(scaledARR),
    cloudOps,
    professionalServices,
    firstYearTotal: Math.round(firstYearTotal),
    annualARR: Math.round(annualARR)
  };
}
