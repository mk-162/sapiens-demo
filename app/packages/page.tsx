import { packages } from '@/lib/data';

export default function PackagesPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <h1 className="text-4xl font-light tracking-tighter mb-8">Launch Packages</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {packages.map(pkg => (
          <div key={pkg.id} className="card p-8">
            <div className="text-xs tracking-widest text-[#8692B7] mb-2">{pkg.status.toUpperCase()}</div>
            <h3 className="text-2xl font-light tracking-tight mb-4">{pkg.name}</h3>
            <p className="text-[#666666] mb-6">{pkg.valueProposition}</p>
            
            <div className="text-sm space-y-1 text-[#666666]">
              <div><span className="font-medium">Timeline:</span> {pkg.timeline}</div>
              <div><span className="font-medium">Pricing:</span> {pkg.pricingModel}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
