'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDemoData } from '@/lib/demo-data-context';
import type { ModuleBlock, Module, ModuleBlockId, ModuleType, LifecycleStatus } from '@/lib/types';
// removed unused import

export default function SettingsPage() {
  const {
    moduleBlocks,
    modules,
    setModuleBlocks,
    setModules,
    resetToDefaults,
  } = useDemoData();

  const [newBlock, setNewBlock] = useState<Omit<ModuleBlock, 'id'> & { id: string }>({
    id: '',
    name: '',
    shortName: '',
    description: '',
    surchargeLabel: '',
    surchargePercent: 0.15,
    required: false,
    order: moduleBlocks.length + 1,
  });

  const [newModule, setNewModule] = useState<Module>({
    id: '',
    name: '',
    block: 'foundational-core',
    description: '',
    type: 'Add-on',
    basePrice: 50000,
    surchargePercent: 0.15,
    lifecycle: 'Future Platform',
    targetCohorts: ['All Cohorts'],
  });

  const updateBlockSurcharge = (id: string, value: number) => {
    setModuleBlocks(
      moduleBlocks.map((b) =>
        b.id === id ? { ...b, surchargePercent: Math.max(0, Math.min(1, value)) } : b,
      ),
    );
  };

  const updateModulePrice = (id: string, field: 'basePrice' | 'surchargePercent', value: number) => {
    setModules(
      modules.map((m) =>
        m.id === id
          ? {
              ...m,
              [field]: field === 'basePrice' ? Math.max(0, value) : Math.max(0, Math.min(1, value)),
            }
          : m,
      ),
    );
  };

  const addNewBlock = () => {
    if (!newBlock.id || !newBlock.name) return;

    const block: ModuleBlock = {
      id: newBlock.id as ModuleBlockId,
      name: newBlock.name,
      shortName: newBlock.shortName || newBlock.name,
      description: newBlock.description || '',
      surchargeLabel: newBlock.surchargeLabel || '+15% surcharge',
      surchargePercent: newBlock.surchargePercent ?? 0.15,
      required: newBlock.required ?? false,
      order: newBlock.order ?? moduleBlocks.length + 1,
    };

    setModuleBlocks([...moduleBlocks, block]);
    setNewBlock({
      id: '',
      name: '',
      shortName: '',
      description: '',
      surchargeLabel: '',
      surchargePercent: 0.15,
      required: false,
      order: moduleBlocks.length + 2,
    });
  };

  const addNewModule = () => {
    if (!newModule.id || !newModule.name) return;

    const mod: Module = {
      id: newModule.id,
      name: newModule.name,
      block: newModule.block as ModuleBlockId,
      description: newModule.description || '',
      type: newModule.type as ModuleType,
      basePrice: newModule.basePrice ?? 50000,
      surchargePercent: newModule.surchargePercent,
      lifecycle: newModule.lifecycle as LifecycleStatus,
      targetCohorts: newModule.targetCohorts || ['All Cohorts'],
    };

    setModules([...modules, mod]);
    setNewModule({
      id: '',
      name: '',
      block: 'foundational-core',
      description: '',
      type: 'Add-on',
      basePrice: 50000,
      surchargePercent: 0.15,
      lifecycle: 'Future Platform',
      targetCohorts: ['All Cohorts'],
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="label-eyebrow">Demo Configuration</div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-[var(--color-ink)]">
            Settings
          </h1>
        </div>
        <div className="flex gap-3">
          <button onClick={resetToDefaults} className="btn-ghost">
            Reset to defaults
          </button>
          <Link href="/configurator" className="btn-primary">
            Back to configurator
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Blocks Section */}
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="label-eyebrow">Module Blocks</div>
                <h2 className="text-xl font-semibold text-[var(--color-ink)]">Blocks</h2>
              </div>
            </div>

            <div className="space-y-4">
              {moduleBlocks
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((block) => (
                  <div key={block.id} className="border border-[var(--color-border)] rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="font-medium text-[var(--color-ink)]">{block.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                          {block.surchargeLabel}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-[var(--color-text-muted)]">Surcharge</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="1"
                          value={block.surchargePercent}
                          onChange={(e) => updateBlockSurcharge(block.id, parseFloat(e.target.value))}
                          className="w-20 px-2 py-1 text-right mono border border-[var(--color-border)] rounded-md"
                        />
                        <span className="text-[var(--color-text-muted)]">%</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Add new block */}
            <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
              <div className="label-eyebrow mb-3">Add new block</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  placeholder="ID (e.g. analytics)"
                  value={newBlock.id}
                  onChange={(e) => setNewBlock({ ...newBlock, id: e.target.value })}
                  className="input"
                />
                <input
                  placeholder="Name"
                  value={newBlock.name}
                  onChange={(e) => setNewBlock({ ...newBlock, name: e.target.value })}
                  className="input"
                />
                <input
                  placeholder="Short name"
                  value={newBlock.shortName}
                  onChange={(e) => setNewBlock({ ...newBlock, shortName: e.target.value })}
                  className="input"
                />
                <input
                  placeholder="Surcharge label"
                  value={newBlock.surchargeLabel}
                  onChange={(e) => setNewBlock({ ...newBlock, surchargeLabel: e.target.value })}
                  className="input"
                />
              </div>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[var(--color-text-muted)]">Surcharge</span>
                  <input
                    type="number"
                    step="0.01"
                    value={newBlock.surchargePercent}
                    onChange={(e) =>
                      setNewBlock({ ...newBlock, surchargePercent: parseFloat(e.target.value) })
                    }
                    className="w-20 px-2 py-1 text-right mono border border-[var(--color-border)] rounded-md"
                  />
                </div>
                <button onClick={addNewBlock} className="btn-primary ml-auto">
                  Add block
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="label-eyebrow">Modules</div>
                <h2 className="text-xl font-semibold text-[var(--color-ink)]">Pricing</h2>
              </div>
            </div>

            <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
              {modules.map((mod) => (
                <div
                  key={mod.id}
                  className="flex items-center justify-between gap-4 border border-[var(--color-border)] rounded-lg px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="font-medium text-[var(--color-ink)]">{mod.name}</div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {mod.block} · {mod.type}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--color-text-muted)] text-xs">Base</span>
                      <input
                        type="number"
                        value={mod.basePrice}
                        onChange={(e) => updateModulePrice(mod.id, 'basePrice', parseInt(e.target.value))}
                        className="w-24 px-2 py-1 text-right mono border border-[var(--color-border)] rounded-md"
                      />
                    </div>

                    {mod.surchargePercent !== undefined && (
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--color-text-muted)] text-xs">Surcharge</span>
                        <input
                          type="number"
                          step="0.01"
                          value={mod.surchargePercent}
                          onChange={(e) =>
                            updateModulePrice(mod.id, 'surchargePercent', parseFloat(e.target.value))
                          }
                          className="w-16 px-2 py-1 text-right mono border border-[var(--color-border)] rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add new module */}
            <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
              <div className="label-eyebrow mb-3">Add new module</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  placeholder="ID"
                  value={newModule.id}
                  onChange={(e) => setNewModule({ ...newModule, id: e.target.value })}
                  className="input"
                />
                <input
                  placeholder="Name"
                  value={newModule.name}
                  onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                  className="input"
                />
                <select
                  value={newModule.block}
                  onChange={(e) => setNewModule({ ...newModule, block: e.target.value as ModuleBlockId })}
                  className="input"
                >
                  {moduleBlocks.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
                <input
                  placeholder="Base price"
                  type="number"
                  value={newModule.basePrice}
                  onChange={(e) => setNewModule({ ...newModule, basePrice: parseInt(e.target.value) })}
                  className="input"
                />
              </div>
              <button onClick={addNewModule} className="btn-primary mt-3 w-full">
                Add module
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-[var(--color-text-muted)] mt-8 text-center">
        Changes are stored in memory for this demo session only. Refresh the page to reset.
      </p>
    </div>
  );
}
