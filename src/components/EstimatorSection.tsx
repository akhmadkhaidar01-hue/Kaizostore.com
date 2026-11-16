import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Info, SlidersHorizontal } from 'lucide-react';
import { calculateBuybackEstimate, formatRupiah } from '../data/kaizoData';
import {
  AccountCondition,
  AccountLoginType,
  EstimatorInput,
  EstimatorResult,
} from '../types/kaizo';

interface EstimatorSectionProps {
  onApplyEstimate: (input: EstimatorInput, result: EstimatorResult) => void;
}

const LOGIN_OPTIONS: AccountLoginType[] = ['Google', 'Facebook', 'VK', 'X / Twitter'];
const CONDITION_OPTIONS: AccountCondition[] = [
  'No Minus (Polos Bersih)',
  'Minus Ringan / Tabrak',
];
const EVO_OPTIONS: EstimatorInput['evoMaxCount'][] = ['0', '1-2', '3-5', '6+'];
const VAULT_OPTIONS: EstimatorInput['vaultCount'][] = [
  '<100',
  '100-250',
  '250-500',
  '500+',
];
const SPECIAL_OPTIONS: { id: EstimatorInput['specialItem']; label: string }[] = [
  { id: 'none', label: 'Biasa / Standar' },
  { id: 'sg2', label: 'Ada SG2 Populer' },
  { id: 'old-bundle', label: 'Bundle Old / Criminal' },
];

export default function EstimatorSection({ onApplyEstimate }: EstimatorSectionProps) {
  const [input, setInput] = useState<EstimatorInput>({
    loginType: 'Google',
    condition: 'No Minus (Polos Bersih)',
    evoMaxCount: '1-2',
    vaultCount: '250-500',
    specialItem: 'sg2',
  });

  const result = useMemo(() => calculateBuybackEstimate(input), [input]);

  const VerdictIcon =
    result.verdictLevel === 'high'
      ? CheckCircle2
      : result.verdictLevel === 'medium'
        ? SlidersHorizontal
        : Info;

  const verdictColorClass =
    result.verdictLevel === 'high'
      ? 'text-sky-300'
      : result.verdictLevel === 'medium'
        ? 'text-slate-100'
        : 'text-amber-300';

  return (
    <section id="estimasi" className="border-b border-white/8 bg-[#0C1017] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="text-xs font-medium text-sky-400">
            Kalkulator Buyback Cepat
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl [text-wrap:balance]">
            Cek estimasi harga &amp; kecocokan akun kamu.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Atur spek akun di sebelah kiri buat lihat kisaran masuknya. Harga final tetap bisa dinego setelah admin cek vault langsung.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Controls Panel */}
          <div className="rounded-xl border border-white/8 bg-[#10151E] p-6 lg:col-span-7 space-y-6">
            {/* Login Bind */}
            <div>
              <span className="block text-xs font-medium text-slate-400">
                1. Login Bind Akun
              </span>
              <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {LOGIN_OPTIONS.map((option) => {
                  const active = input.loginType === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setInput((prev) => ({ ...prev, loginType: option }))}
                      className={`min-h-[40px] rounded-lg border px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                        active
                          ? 'border-sky-400 bg-sky-400/15 text-sky-200'
                          : 'border-white/8 bg-[#141B26] text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Kondisi Akun */}
            <div>
              <span className="block text-xs font-medium text-slate-400">
                2. Kondisi Bind &amp; Data
              </span>
              <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {CONDITION_OPTIONS.map((option) => {
                  const active = input.condition === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setInput((prev) => ({ ...prev, condition: option }))}
                      className={`min-h-[40px] rounded-lg border px-4 py-2 text-left text-xs font-medium transition-colors whitespace-nowrap ${
                        active
                          ? 'border-sky-400 bg-sky-400/15 text-sky-200'
                          : 'border-white/8 bg-[#141B26] text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Evo Gun Max + Vault Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <span className="block text-xs font-medium text-slate-400">
                  3. Jumlah Evo Gun Max (Lv. 7)
                </span>
                <div className="mt-2.5 grid grid-cols-4 gap-2">
                  {EVO_OPTIONS.map((count) => {
                    const active = input.evoMaxCount === count;
                    return (
                      <button
                        key={count}
                        type="button"
                        onClick={() =>
                          setInput((prev) => ({ ...prev, evoMaxCount: count }))
                        }
                        className={`min-h-[40px] rounded-lg border px-2 py-2 font-mono text-xs font-medium tabular-nums transition-colors ${
                          active
                            ? 'border-sky-400 bg-sky-400/15 text-sky-200'
                            : 'border-white/8 bg-[#141B26] text-slate-300 hover:border-white/20'
                        }`}
                      >
                        {count}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-400">
                  4. Total Bundle Vault
                </span>
                <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {VAULT_OPTIONS.map((vault) => {
                    const active = input.vaultCount === vault;
                    return (
                      <button
                        key={vault}
                        type="button"
                        onClick={() =>
                          setInput((prev) => ({ ...prev, vaultCount: vault }))
                        }
                        className={`min-h-[40px] rounded-lg border px-2 py-2 font-mono text-xs font-medium tabular-nums transition-colors whitespace-nowrap ${
                          active
                            ? 'border-sky-400 bg-sky-400/15 text-sky-200'
                            : 'border-white/8 bg-[#141B26] text-slate-300 hover:border-white/20'
                        }`}
                      >
                        {vault}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Special Item */}
            <div>
              <span className="block text-xs font-medium text-slate-400">
                5. Highlight Item Spesial
              </span>
              <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {SPECIAL_OPTIONS.map((item) => {
                  const active = input.specialItem === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setInput((prev) => ({ ...prev, specialItem: item.id }))
                      }
                      className={`min-h-[40px] rounded-lg border px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                        active
                          ? 'border-sky-400 bg-sky-400/15 text-sky-200'
                          : 'border-white/8 bg-[#141B26] text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result Panel */}
          <div className="flex flex-col justify-between rounded-xl border border-white/8 bg-[#10151E] p-6 lg:col-span-5">
            <div>
              <div className="flex items-center gap-2 border-b border-white/8 pb-4">
                <VerdictIcon className={`h-4 w-4 shrink-0 ${verdictColorClass}`} aria-hidden="true" />
                <span className={`text-sm font-semibold ${verdictColorClass}`}>
                  {result.verdict}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-xs text-slate-400">Estimasi Harga Buyback Masuk</p>
                <p className="mt-2 font-mono text-2xl font-bold tracking-tight tabular-nums text-slate-50 sm:text-3xl">
                  {formatRupiah(result.minPrice)} – {formatRupiah(result.maxPrice)}
                </p>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {result.note}
              </p>

              {/* Summary lines */}
              <dl className="mt-6 space-y-2.5 border-t border-white/8 pt-5 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-400">Login Bind</dt>
                  <dd className="font-medium text-slate-200">{input.loginType}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-400">Kondisi</dt>
                  <dd className="font-medium text-slate-200">{input.condition}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-400">Evo Gun Max</dt>
                  <dd className="font-mono font-medium tabular-nums text-slate-200">
                    {input.evoMaxCount} senjata
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-400">Vault Bundle</dt>
                  <dd className="font-mono font-medium tabular-nums text-slate-200">
                    {input.vaultCount} set
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => onApplyEstimate(input, result)}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <span>Gunakan Spek Ini ke Form Penawaran</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
