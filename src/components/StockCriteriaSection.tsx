import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { STOCK_CRITERIA } from '../data/kaizoData';
import { StockCriteriaItem, StockFilterCategory } from '../types/kaizo';

interface StockCriteriaSectionProps {
  onSelectCriteria: (item: StockCriteriaItem) => void;
}

const FILTER_TABS: { id: StockFilterCategory; label: string }[] = [
  { id: 'all', label: 'Semua Spek' },
  { id: 'sultan', label: 'Akun Sultan' },
  { id: 'evo', label: 'Evo & Vault' },
  { id: 'polosan', label: 'Rank & Polosan' },
];

export default function StockCriteriaSection({
  onSelectCriteria,
}: StockCriteriaSectionProps) {
  const [activeFilter, setActiveFilter] = useState<StockFilterCategory>('all');

  const visibleItems =
    activeFilter === 'all'
      ? STOCK_CRITERIA
      : STOCK_CRITERIA.filter((item) => item.category === activeFilter);

  return (
    <section id="kriteria" className="border-b border-white/8 bg-[#090C12] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium text-sky-400">
              Stok Prioritas Kaizostore
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl [text-wrap:balance]">
              Spek akun epep yang lagi dicari sekarang.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Pilih kategori yang paling mendekati akun kamu, atau langsung ajukan lewat form penawaran di bawah.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div
            role="tablist"
            aria-label="Filter kategori stok akun"
            className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-white/8 bg-[#10151E] p-1 self-start md:self-auto"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`min-h-[36px] rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    isActive
                      ? 'bg-sky-400 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric bento grid */}
        <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-3">
          {visibleItems.map((item) => {
            const spanClass =
              activeFilter === 'all' && item.featured
                ? 'md:col-span-2'
                : 'md:col-span-1';

            return (
              <article
                key={item.id}
                className={`${spanClass} flex flex-col justify-between rounded-xl border border-white/8 bg-[#10151E] p-6 transition-colors duration-150 hover:border-white/16`}
              >
                <div>
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="font-mono font-medium text-sky-400">
                      {item.indexLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.priorityLabel}</span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-slate-50">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                    {item.summary}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-white/8 pt-4 text-sm text-slate-300">
                    {item.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400"
                        />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">Kisaran Masuk</p>
                    <p className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-slate-50">
                      {item.priceRange}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectCriteria(item)}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/12 bg-[#141B26] px-4 py-2 text-xs font-medium text-slate-100 transition-colors duration-150 hover:border-sky-400/50 hover:text-sky-300 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <span>Tawarin Kategori Ini</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
