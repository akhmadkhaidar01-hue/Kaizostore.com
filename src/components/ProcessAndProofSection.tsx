import { RECENT_DEALS, formatRupiah } from '../data/kaizoData';

const PROCESS_STEPS = [
  {
    index: '01.',
    title: 'Kirim Spek & Harga Buka',
    description:
      'Isi detail akun Epep kamu di form penawaran — mulai dari tipe login, kondisi minus/no minus, jumlah Evo & Vault, sampai harga yang kamu minta.',
  },
  {
    index: '02.',
    title: 'Cek Vault & Nego Santai',
    description:
      'Admin Kaizostore cek kelayakan bind dan kecocokan harga. Kalau masuk hitungan langsung kita deal, kalau belum cocok bebas diskip tanpa ribet.',
  },
  {
    index: '03.',
    title: 'Serah Terima & Langsung Cair',
    description:
      'Setelah amankan data akun selesai diverifikasi, dana langsung ditransfer ke Dana, GoPay, OVO, BCA, atau SeaBank dalam hitungan menit.',
  },
];

export default function ProcessAndProofSection() {
  return (
    <section id="alur" className="border-b border-white/8 bg-[#090C12] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left: 3-Step Process */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium text-sky-400">
              Alur Buyback Kaizostore
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl [text-wrap:balance]">
              Cocok gasken, ga cocok bisa diskip.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Nggak ada paksaan atau potongan aneh-aneh. Semua kesepakatan harga dibahas di depan sebelum serah terima akun.
            </p>

            <ol className="mt-8 divide-y divide-white/8 border-y border-white/8">
              {PROCESS_STEPS.map((step) => (
                <li key={step.index} className="py-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-semibold text-sky-400">
                      {step.index}
                    </span>
                    <h3 className="font-display text-base font-semibold text-slate-50">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 pl-8 text-sm leading-relaxed text-slate-300">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: Adjacent Proof — Recent Deal Ledger */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-white/8 bg-[#10151E] p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/8 pb-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-50">
                    Catatan Transaksi Buyback Terbaru
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Contoh pencairan stok yang baru masuk ke etalase Kaizostore
                  </p>
                </div>
                <span className="font-mono text-xs tabular-nums text-slate-400">
                  4 transaksi terakhir
                </span>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/8 text-xs font-medium text-slate-400">
                      <th className="py-3 pr-4">Kode</th>
                      <th className="py-3 pr-4">Spek Akun</th>
                      <th className="py-3 pr-4">Login</th>
                      <th className="py-3 pr-4 text-right">Nilai Deal</th>
                      <th className="py-3 text-right">Cair</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {RECENT_DEALS.map((deal) => (
                      <tr key={deal.id} className="align-top">
                        <td className="py-3.5 pr-4 font-mono text-xs tabular-nums text-slate-400 whitespace-nowrap">
                          {deal.id}
                        </td>
                        <td className="py-3.5 pr-4">
                          <p className="font-medium text-slate-100">{deal.tier}</p>
                          <p className="mt-0.5 text-xs text-slate-400">{deal.specs}</p>
                        </td>
                        <td className="py-3.5 pr-4 text-xs text-slate-300 whitespace-nowrap">
                          {deal.login}
                        </td>
                        <td className="py-3.5 pr-4 text-right font-mono text-xs font-semibold tabular-nums text-sky-300 whitespace-nowrap">
                          {formatRupiah(deal.dealPrice)}
                        </td>
                        <td className="py-3.5 text-right whitespace-nowrap">
                          <p className="text-xs font-medium text-slate-200">
                            {deal.payoutMethod}
                          </p>
                          <p className="mt-0.5 font-mono text-[11px] tabular-nums text-slate-400">
                            {deal.duration}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
