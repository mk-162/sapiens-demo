import { modules } from '@/lib/data';

export default function ModulesPage() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <h1 className="text-4xl font-light tracking-tighter mb-8">Services Catalog</h1>
      
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-[#F3F4F8]">
              <th className="text-left p-4">Module</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Type</th>
              <th className="text-right p-4">Base Price</th>
              <th className="text-left p-4">Lifecycle</th>
            </tr>
          </thead>
          <tbody>
            {modules.map(mod => (
              <tr key={mod.id} className="border-b last:border-none">
                <td className="p-4 font-medium">{mod.name}</td>
                <td className="p-4 text-sm text-[#666666]">{mod.category}</td>
                <td className="p-4 text-sm">{mod.type}</td>
                <td className="p-4 text-right font-mono">${mod.basePrice.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    mod.lifecycle === 'Future Platform' ? 'bg-[#E0F0FD] text-[#0D256F]' : 'bg-[#F3F4F8]'
                  }`}>
                    {mod.lifecycle}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
