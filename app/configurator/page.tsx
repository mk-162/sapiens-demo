'use client';

import { useState } from 'react';
import { modules, cohorts } from '@/lib/data';
import { calculateTASC } from '@/lib/pricing';

export default function Configurator() {
  const [selectedCohort, setSelectedCohort] = useState(cohorts[0].id);
  const [selectedModules, setSelectedModules] = useState<string[]>(['scipsuite', 'digitalsuite-portals']);
  const [gwp, setGwp] = useState(400_000_000);

  const cohort = cohorts.find(c => c.id === selectedCohort)!;
  const calculation = calculateTASC(selectedModules, gwp, modules);

  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter(m => m !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-[#0D256F] text-sm font-medium tracking-wider">INTERNAL DEMO</div>
          <h1 className="text-5xl font-light tracking-tighter text-[#050E31]">Subscription Configurator</h1>
        </div>
        <div className="text-right">
          <div className="text-sm text-[#666666]">Gross Written Premium</div>
          <input 
            type="range" 
            min="30000000" 
            max="5000000000" 
            step="10000000"
            value={gwp}
            onChange={(e) => setGwp(Number(e.target.value))}
            className="w-64 accent-[#0D256F]"
          />
          <div className="font-mono text-lg">${(gwp / 1_000_000).toFixed(0)}M</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cohorts */}
        <div className="lg:col-span-1">
          <div className="mb-4 text-sm font-medium text-[#666666]">CUSTOMER COHORT</div>
          <div className="space-y-2">
            {cohorts.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCohort(c.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedCohort === c.id 
                    ? 'border-[#0D256F] bg-[#F3F4F8]' 
                    : 'border-[#E5E7EB] hover:border-[#0D256F]'
                }`}
              >
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-[#666666]">{c.gwpRange}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div className="lg:col-span-1">
          <div className="mb-4 text-sm font-medium text-[#666666]">MODULES</div>
          <div className="space-y-2 max-h-[520px] overflow-auto pr-2">
            {modules.map((mod) => (
              <div 
                key={mod.id}
                onClick={() => toggleModule(mod.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                  selectedModules.includes(mod.id) 
                    ? 'border-[#0D256F] bg-[#F3F4F8]' 
                    : 'border-[#E5E7EB] hover:border-[#0D256F]'
                }`}
              >
                <div>
                  <div className="font-medium">{mod.name}</div>
                  <div className="text-xs text-[#666666]">{mod.category} • {mod.type}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm">${(mod.basePrice / 1000).toFixed(0)}k</div>
                  <div className="text-[10px] text-[#8692B7]">{mod.lifecycle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="mb-4 text-sm font-medium text-[#666666]">CONFIGURATION SUMMARY</div>
            
            <div className="card p-6 space-y-6">
              <div>
                <div className="text-sm text-[#666666]">Selected Cohort</div>
                <div className="text-xl font-medium">{cohort.name}</div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm mb-1">
                  <span>Scale Factor</span>
                  <span className="font-mono">{calculation.scaleFactor}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Scaled ARR</span>
                  <span className="font-mono">${calculation.scaledARR.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Cloud Operations</span>
                  <span className="font-mono">${calculation.cloudOps.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-baseline">
                  <div>
                    <div className="text-sm text-[#666666]">Annual Recurring Revenue</div>
                    <div className="text-3xl font-light tracking-tighter">${calculation.annualARR.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => alert('Demo: Quote would be generated here')}
                className="btn-accent w-full text-center"
              >
                Generate Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
