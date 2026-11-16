import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onJumpToOffer: () => void;
}

const NAV_ITEMS = [
  { label: 'Pengumuman', href: '#pengumuman' },
  { label: 'Stok Dicari', href: '#kriteria' },
  { label: 'Cek Estimasi', href: '#estimasi' },
  { label: 'Alur Deal', href: '#alur' },
];

export default function Navbar({ onJumpToOffer }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#090C12]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Single-element wordmark */}
        <a
          href="#pengumuman"
          className="font-display text-lg font-bold tracking-tight text-slate-50 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm"
        >
          Kaizostore
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-sky-300 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onJumpToOffer}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-300 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090C12]"
          >
            Tawarin Akun
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-200 transition-colors hover:bg-white/5 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-white/8 bg-[#0D1119] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleMobileNav(item.href)}
                className="flex min-h-[44px] items-center text-left text-sm font-medium text-slate-200 hover:text-sky-300"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onJumpToOffer();
              }}
              className="mt-1 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-300"
            >
              Tawarin Akun Sekarang
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
