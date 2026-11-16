import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, Captions, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { KAIZO_ANNOUNCEMENT_LINES } from '../data/kaizoData';

interface HeroSectionProps {
  onJumpToOffer: () => void;
}

const VIDEO_SRC = '/assets/aistudio/Character_speaking_with_looping___a533e0ab_b00df8a2.mp4';

export default function HeroSection({ onJumpToOffer }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [activeLineIdx, setActiveLineIdx] = useState(0);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      setActiveLineIdx((prev) => (prev + 1) % KAIZO_ANNOUNCEMENT_LINES.length);
    }, 2400);
    return () => window.clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
      setIsPlaying(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const nextMuted = !isMuted;
    el.muted = nextMuted;
    if (!nextMuted && el.paused) {
      el.play().catch(() => {});
      setIsPlaying(true);
    }
    setIsMuted(nextMuted);
  };

  return (
    <section id="pengumuman" className="border-b border-white/8 bg-[#090C12] pt-10 pb-14 lg:pt-14 lg:pb-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Dominant 2-column split */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Value Proposition & Announcement */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-xs font-medium tracking-wide text-sky-400">
              Open Buyback · Stok Epep Prioritas
            </p>

            <h1 className="mt-3 max-w-2xl font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-slate-50 [text-wrap:balance]">
              Kaizostore balik lagi. Lagi cari stok epep sebanyak-banyaknya.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
              Buat kalian yang lagi butuh uang, langsung aja tawarin akun Free Fire (Epep) kalian ke gua. Harga cocok langsung gasken, nggak cocok bisa diskip — proses cepat, aman, dan tanpa ribet.
            </p>

            {/* Primary CTA + quiet anchor */}
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={onJumpToOffer}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-300 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090C12]"
              >
                <span>Tawarin Akun Sekarang</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href="#estimasi"
                className="inline-flex min-h-[44px] items-center text-sm font-medium text-slate-300 underline-offset-4 transition-colors duration-150 hover:text-sky-300 hover:underline whitespace-nowrap shrink-0"
              >
                Cek estimasi harga akun
              </a>
            </div>

            {/* Spoken comeback script panel (no border-l-4 cliché) */}
            <div className="mt-9 rounded-xl border border-white/8 bg-[#10151E] p-5">
              <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-3">
                <span className="text-xs font-medium text-slate-400">
                  Pesan Langsung dari Kaizostore
                </span>
                <button
                  type="button"
                  onClick={() => setShowCaptions((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-400 transition-colors hover:text-sky-300 whitespace-nowrap shrink-0"
                >
                  <Captions className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{showCaptions ? 'Subtitle Video: Aktif' : 'Subtitle Video: Mati'}</span>
                </button>
              </div>

              <p className="mt-3.5 text-sm leading-relaxed text-slate-200">
                “Hey kamu tau gak? Kaizostore balik lagi, dan sekarang lagi cari stok epep sebanyak banyaknya, jadi tunggu apa lagi, buat kalian yang butuh uang, langsung aja tawarin epep kalian ke gua, cocok gasken ga cocok bisa diskip, tunggu apalagi gasken cuy.”
              </p>
            </div>
          </div>

          {/* Right column: Dominant 9:16 / 3:4 Portrait Character Video */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[380px] overflow-hidden rounded-2xl border border-white/10 bg-[#10151E] lg:aspect-auto lg:h-full lg:max-w-none lg:min-h-[480px]">
              {!videoError ? (
                <video
                  ref={videoRef}
                  src={VIDEO_SRC}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onError={() => setVideoError(true)}
                  className="h-full w-full object-cover object-top"
                  aria-label="Karakter Kaizostore menyampaikan pengumuman Open Buyback stok Epep"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#131A26] to-[#090C12] p-6 text-center">
                  <p className="font-display text-lg font-bold text-slate-100">Kaizostore</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Open Buyback Stok Akun Free Fire (Epep)
                  </p>
                </div>
              )}

              {/* Measured bottom gradient scrim for >= 4.5:1 caption & control contrast */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#090C12] via-[#090C12]/70 to-transparent" />

              {/* Bottom caption & video playback controls */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4">
                {showCaptions && (
                  <div className="rounded-lg border border-white/10 bg-[#090C12]/80 px-3.5 py-2.5 backdrop-blur-sm">
                    <p className="text-xs font-medium text-sky-300">Kaizostore</p>
                    <p className="mt-0.5 text-sm font-medium leading-snug text-slate-50">
                      {KAIZO_ANNOUNCEMENT_LINES[activeLineIdx]}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/12 bg-[#090C12]/85 px-3.5 py-2 text-xs font-medium text-slate-100 backdrop-blur-sm transition-colors hover:bg-white/10 whitespace-nowrap shrink-0"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
                        <span>Jeda Video</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
                        <span>Putar Video</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/12 bg-[#090C12]/85 px-3.5 py-2 text-xs font-medium text-slate-100 backdrop-blur-sm transition-colors hover:bg-white/10 whitespace-nowrap shrink-0"
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                        <span>Suara Mati</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
                        <span>Suara Aktif</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column Key Terms Strip below hero split */}
        <div className="mt-10 grid grid-cols-1 divide-y divide-white/8 rounded-xl border border-white/8 bg-[#10151E] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          <div className="p-5">
            <p className="text-xs text-slate-400">Respon Cek Spek</p>
            <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-slate-50">
              &lt; 15 Menit
            </p>
            <p className="mt-0.5 text-xs text-slate-400">Jam operasional harian</p>
          </div>
          <div className="p-5 sm:border-l sm:border-white/8 lg:border-l-0">
            <p className="text-xs text-slate-400">Sistem Penawaran</p>
            <p className="mt-1 font-display text-lg font-semibold text-slate-50">
              Cocok Gasken
            </p>
            <p className="mt-0.5 text-xs text-slate-400">Ga cocok bebas skip tanpa drama</p>
          </div>
          <div className="p-5 sm:border-t sm:border-white/8 lg:border-t-0">
            <p className="text-xs text-slate-400">Metode Pencairan</p>
            <p className="mt-1 font-display text-lg font-semibold text-slate-50">
              E-Wallet &amp; Bank
            </p>
            <p className="mt-0.5 text-xs text-slate-400">Dana, GoPay, OVO, BCA, SeaBank</p>
          </div>
          <div className="p-5 sm:border-t sm:border-l sm:border-white/8 lg:border-t-0 lg:border-l-0">
            <p className="text-xs text-slate-400">Prioritas Akun</p>
            <p className="mt-1 font-display text-lg font-semibold text-slate-50">
              Polos No Minus
            </p>
            <p className="mt-0.5 text-xs text-slate-400">Google, Facebook, VK bersih</p>
          </div>
        </div>
      </div>
    </section>
  );
}
