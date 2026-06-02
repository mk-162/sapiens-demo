import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0D256F] text-white flex items-center justify-center rounded font-bold text-xl">S</div>
            <div>
              <div className="font-semibold tracking-tight">Sapiens</div>
              <div className="text-[10px] text-[#666666] -mt-1">SUBSCRIPTION PLATFORM</div>
            </div>
          </div>
          
          <nav className="flex items-center gap-8 text-sm">
            <Link href="/configurator" className="hover:text-[#0D256F]">Configurator</Link>
            <Link href="/modules" className="hover:text-[#0D256F]">Modules</Link>
            <Link href="/packages" className="hover:text-[#0D256F]">Packages</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-2xl text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-[#F3F4F8] text-xs tracking-widest text-[#0D256F] mb-6">
            INTERNAL DEMO • JUNE 2026
          </div>
          
          <h1 className="text-7xl font-light tracking-tighter text-[#050E31] leading-none mb-6">
            Subscription<br />Modeling Tool
          </h1>
          
          <p className="text-xl text-[#666666] mb-10 max-w-md mx-auto">
            Configure and price modular subscription packages for insurance carriers.
          </p>

          <Link 
            href="/configurator" 
            className="btn-accent inline-block text-lg px-10 py-4"
          >
            Open Configurator
          </Link>
        </div>
      </main>
    </div>
  );
}
