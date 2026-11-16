import { FormEvent, useEffect, useState } from 'react';
import { Check, Copy, Send, Trash2 } from 'lucide-react';
import { formatRupiah } from '../data/kaizoData';
import {
  AccountCondition,
  AccountLoginType,
  OfferSubmission,
} from '../types/kaizo';

export interface OfferPrefill {
  loginType?: AccountLoginType;
  condition?: AccountCondition;
  specsSummary?: string;
  askingPrice?: string;
  estimatedBracket?: string;
  triggerCount: number;
}

interface OfferFormSectionProps {
  prefill: OfferPrefill;
}

const STORAGE_KEY = 'kaizostore_offers_v1';

const LOGIN_TYPES: AccountLoginType[] = ['Google', 'Facebook', 'VK', 'X / Twitter'];
const CONDITIONS: AccountCondition[] = [
  'No Minus (Polos Bersih)',
  'Minus Ringan / Tabrak',
];

function buildWhatsAppPitch(offer: OfferSubmission): string {
  const lines = [
    `Halo Kaizostore, saya mau tawarin akun Epep:`,
    `- Nama: ${offer.sellerName}`,
    `- WhatsApp: ${offer.whatsapp}`,
    `- UID / Nick: ${offer.uid}${offer.nickname ? ` (${offer.nickname})` : ''}`,
    `- Login & Kondisi: ${offer.loginType} · ${offer.condition}`,
    `- Spek Akun: ${offer.specsSummary}`,
    `- Harga Penawaran: ${formatRupiah(offer.askingPrice)}`,
    offer.estimatedBracket ? `- Estimasi Kalkulator: ${offer.estimatedBracket}` : '',
    `Cocok gasken, ga cocok siap skip ya bang!`,
  ].filter(Boolean);

  return lines.join('\n');
}

export default function OfferFormSection({ prefill }: OfferFormSectionProps) {
  const [sellerName, setSellerName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [uid, setUid] = useState('');
  const [nickname, setNickname] = useState('');
  const [loginType, setLoginType] = useState<AccountLoginType>('Google');
  const [condition, setCondition] = useState<AccountCondition>(
    'No Minus (Polos Bersih)'
  );
  const [askingPriceRaw, setAskingPriceRaw] = useState('');
  const [specsSummary, setSpecsSummary] = useState('');
  const [estimatedBracket, setEstimatedBracket] = useState<string | undefined>(
    undefined
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedOffer, setSubmittedOffer] = useState<OfferSubmission | null>(
    null
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedOffers, setSavedOffers] = useState<OfferSubmission[]>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (prefill.triggerCount === 0) return;
    if (prefill.loginType) setLoginType(prefill.loginType);
    if (prefill.condition) setCondition(prefill.condition);
    if (prefill.specsSummary) setSpecsSummary(prefill.specsSummary);
    if (prefill.askingPrice) setAskingPriceRaw(prefill.askingPrice);
    if (prefill.estimatedBracket) setEstimatedBracket(prefill.estimatedBracket);
    setSubmittedOffer(null);
  }, [prefill]);

  const persistOffers = (next: OfferSubmission[]) => {
    setSavedOffers(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota errors silently
    }
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (sellerName.trim().length < 2) {
      nextErrors.sellerName = 'Masukkan nama atau panggilan kamu (minimal 2 huruf).';
    }

    const cleanedWa = whatsapp.replace(/[\s-]/g, '');
    if (!/^(\+?62|0)8\d{7,12}$/.test(cleanedWa)) {
      nextErrors.whatsapp =
        'Nomor WhatsApp harus format Indonesia yang valid (contoh: 081234567890).';
    }

    const cleanedUid = uid.replace(/\D/g, '');
    if (cleanedUid.length < 7 || cleanedUid.length > 13) {
      nextErrors.uid = 'UID Free Fire umumnya berisi 7–13 angka.';
    }

    const numericPrice = Number(askingPriceRaw.replace(/\D/g, ''));
    if (!numericPrice || numericPrice < 25000) {
      nextErrors.askingPrice =
        'Masukkan harga penawaran minimal Rp 25.000 (angka saja).';
    }

    if (specsSummary.trim().length < 10) {
      nextErrors.specsSummary =
        'Jelaskan spek singkat akun (minimal 10 karakter, misal: Evo, SG2, Vault).';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const numericPrice = Number(askingPriceRaw.replace(/\D/g, ''));
    const newOffer: OfferSubmission = {
      id: `OFF-${Date.now().toString().slice(-5)}`,
      createdAt: new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
      sellerName: sellerName.trim(),
      whatsapp: whatsapp.replace(/[\s-]/g, ''),
      uid: uid.replace(/\D/g, ''),
      nickname: nickname.trim(),
      loginType,
      condition,
      askingPrice: numericPrice,
      specsSummary: specsSummary.trim(),
      estimatedBracket,
    };

    const nextHistory = [newOffer, ...savedOffers].slice(0, 6);
    persistOffers(nextHistory);
    setSubmittedOffer(newOffer);
  };

  const handleCopyPitch = async (offer: OfferSubmission) => {
    const text = buildWhatsAppPitch(offer);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(offer.id);
      window.setTimeout(() => setCopiedId(null), 2200);
    } catch {
      // Clipboard fallback ignored if blocked
    }
  };

  const handleDeleteOffer = (id: string) => {
    const filtered = savedOffers.filter((item) => item.id !== id);
    persistOffers(filtered);
    if (submittedOffer?.id === id) {
      setSubmittedOffer(null);
    }
  };

  const handleResetForm = () => {
    setSubmittedOffer(null);
    setSellerName('');
    setWhatsapp('');
    setUid('');
    setNickname('');
    setAskingPriceRaw('');
    setSpecsSummary('');
    setEstimatedBracket(undefined);
    setErrors({});
  };

  return (
    <section id="tawarin" className="border-b border-white/8 bg-[#0C1017] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left: Offer Form */}
          <div className="lg:col-span-7">
            <p className="text-xs font-medium text-sky-400">
              Form Penawaran Akun Epep
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl [text-wrap:balance]">
              Langsung tawarin akun kamu di sini.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Isi detail akun dengan jujur supaya pengecekan makin cepat. Setelah submit, format penawaran siap salin otomatis terbuat.
            </p>

            {submittedOffer ? (
              <div className="mt-8 rounded-xl border border-sky-400/35 bg-[#10151E] p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-4">
                  <div>
                    <p className="text-xs font-medium text-sky-400">
                      Penawaran Tercatat · {submittedOffer.id}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-slate-50">
                      Ringkasan Siap Kirim ke Kaizostore
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="min-h-[36px] rounded-lg border border-white/12 px-3.5 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/5 whitespace-nowrap"
                  >
                    Tawarin Akun Lain
                  </button>
                </div>

                <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg border border-white/8 bg-[#090C12] p-4 font-mono text-xs leading-relaxed text-slate-200">
                  {buildWhatsAppPitch(submittedOffer)}
                </pre>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopyPitch(submittedOffer)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-300 whitespace-nowrap"
                  >
                    {copiedId === submittedOffer.id ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" />
                        <span>Format Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" aria-hidden="true" />
                        <span>Salin Format Penawaran</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmittedOffer(null)}
                    className="inline-flex min-h-[44px] items-center rounded-lg border border-white/12 px-4 py-2.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/5 whitespace-nowrap"
                  >
                    Edit Detail Penawaran
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-8 space-y-5 rounded-xl border border-white/8 bg-[#10151E] p-6"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="sellerName"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Nama / Panggilan
                    </label>
                    <input
                      id="sellerName"
                      type="text"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      placeholder="Contoh: Dimas / Raka"
                      className="mt-2 block w-full rounded-lg border border-white/12 bg-[#090C12] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                    {errors.sellerName && (
                      <p className="mt-1.5 text-xs text-amber-300">
                        {errors.sellerName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Nomor WhatsApp Aktif
                    </label>
                    <input
                      id="whatsapp"
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="mt-2 block w-full rounded-lg border border-white/12 bg-[#090C12] px-3.5 py-2.5 font-mono text-sm text-slate-100 placeholder:font-sans placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                    {errors.whatsapp && (
                      <p className="mt-1.5 text-xs text-amber-300">
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="uid"
                      className="block text-xs font-medium text-slate-300"
                    >
                      UID Free Fire
                    </label>
                    <input
                      id="uid"
                      type="text"
                      inputMode="numeric"
                      value={uid}
                      onChange={(e) => setUid(e.target.value)}
                      placeholder="Contoh: 1849201942"
                      className="mt-2 block w-full rounded-lg border border-white/12 bg-[#090C12] px-3.5 py-2.5 font-mono text-sm text-slate-100 placeholder:font-sans placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                    {errors.uid && (
                      <p className="mt-1.5 text-xs text-amber-300">{errors.uid}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="nickname"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Nickname In-Game (Opsional)
                    </label>
                    <input
                      id="nickname"
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Contoh: KAIZO•PRIME"
                      className="mt-2 block w-full rounded-lg border border-white/12 bg-[#090C12] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="loginType"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Tipe Login Akun
                    </label>
                    <select
                      id="loginType"
                      value={loginType}
                      onChange={(e) =>
                        setLoginType(e.target.value as AccountLoginType)
                      }
                      className="mt-2 block w-full rounded-lg border border-white/12 bg-[#090C12] px-3.5 py-2.5 text-sm text-slate-100 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                    >
                      {LOGIN_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="condition"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Kondisi Bind
                    </label>
                    <select
                      id="condition"
                      value={condition}
                      onChange={(e) =>
                        setCondition(e.target.value as AccountCondition)
                      }
                      className="mt-2 block w-full rounded-lg border border-white/12 bg-[#090C12] px-3.5 py-2.5 text-sm text-slate-100 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                    >
                      {CONDITIONS.map((cond) => (
                        <option key={cond} value={cond}>
                          {cond}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="askingPrice"
                    className="block text-xs font-medium text-slate-300"
                  >
                    Harga Penawaran Kamu (Rp)
                  </label>
                  <input
                    id="askingPrice"
                    type="text"
                    inputMode="numeric"
                    value={askingPriceRaw}
                    onChange={(e) =>
                      setAskingPriceRaw(e.target.value.replace(/[^\d]/g, ''))
                    }
                    placeholder="Contoh: 350000"
                    className="mt-2 block w-full rounded-lg border border-white/12 bg-[#090C12] px-3.5 py-2.5 font-mono text-sm text-slate-100 placeholder:font-sans placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                  {askingPriceRaw && Number(askingPriceRaw) > 0 && (
                    <p className="mt-1.5 font-mono text-xs tabular-nums text-slate-400">
                      Terbaca: {formatRupiah(Number(askingPriceRaw))}
                      {estimatedBracket ? ` · Estimasi kalkulator: ${estimatedBracket}` : ''}
                    </p>
                  )}
                  {errors.askingPrice && (
                    <p className="mt-1.5 text-xs text-amber-300">
                      {errors.askingPrice}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="specsSummary"
                    className="block text-xs font-medium text-slate-300"
                  >
                    Ringkasan Spek Akun (Vault, Evo Gun, SG2, Bundle Old)
                  </label>
                  <textarea
                    id="specsSummary"
                    rows={3}
                    value={specsSummary}
                    onChange={(e) => setSpecsSummary(e.target.value)}
                    placeholder="Contoh: Vault 260+, SG2 OPM & Rapper, AK Draco Lv.7, MP40 Cobra Lv.6, CN masih ada, Google polos."
                    className="mt-2 block w-full rounded-lg border border-white/12 bg-[#090C12] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                  {errors.specsSummary && (
                    <p className="mt-1.5 text-xs text-amber-300">
                      {errors.specsSummary}
                    </p>
                  )}
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-300 sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Buat &amp; Kirim Format Penawaran</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Saved Offers Queue & Quick Checklist */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-white/8 bg-[#10151E] p-6">
              <h3 className="font-display text-base font-semibold text-slate-50">
                Biar Cepat Cocok Pas Dicek
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400"
                  />
                  <span>
                    Siapkan video atau screenshot lobby, vault baju, emote, dan koleksi senjata Evo/SG2.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400"
                  />
                  <span>
                    Pastikan email pemulihan dan verifikasi 2 langkah siap dilepas saat transaksi deal.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400"
                  />
                  <span>
                    Ajukan harga wajar sesuai kondisi pasar — cocok gasken, nggak cocok tinggal skip santai.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-white/8 bg-[#10151E] p-6">
              <div className="flex items-center justify-between gap-2 border-b border-white/8 pb-3">
                <h3 className="font-display text-base font-semibold text-slate-50">
                  Riwayat Penawaran Kamu
                </h3>
                <span className="font-mono text-xs tabular-nums text-slate-400">
                  {savedOffers.length} tersimpan
                </span>
              </div>

              {savedOffers.length === 0 ? (
                <p className="mt-4 text-sm text-slate-400">
                  Belum ada penawaran yang dibuat di browser ini. Isi form di samping buat bikin format penawaran siap salin.
                </p>
              ) : (
                <ul className="mt-4 divide-y divide-white/8">
                  {savedOffers.map((offer) => (
                    <li key={offer.id} className="py-3.5 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <span className="font-mono text-sky-400">
                              {offer.id}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{offer.createdAt}</span>
                          </div>
                          <p className="mt-1 font-mono text-sm font-semibold tabular-nums text-slate-100">
                            {formatRupiah(offer.askingPrice)}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-300">
                            UID {offer.uid} · {offer.loginType}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleCopyPitch(offer)}
                            aria-label={`Salin penawaran ${offer.id}`}
                            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/5"
                          >
                            {copiedId === offer.id ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
                                <span>Tersalin</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>Salin</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteOffer(offer.id)}
                            aria-label={`Hapus penawaran ${offer.id}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-amber-400/40 hover:text-amber-300"
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
