export default function Footer() {
  return (
    <footer className="bg-[#090C12] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <a
            href="#pengumuman"
            className="font-display text-base font-bold tracking-tight text-slate-100"
          >
            Kaizostore
          </a>
          <p className="mt-1 text-xs text-slate-400">
            Buyback &amp; Stok Akun Epep — Cocok gasken, ga cocok bisa diskip.
          </p>
        </div>

        <nav
          aria-label="Navigasi Footer"
          className="flex flex-wrap items-center gap-6 text-xs text-slate-400"
        >
          <a href="#pengumuman" className="hover:text-slate-200 transition-colors">
            Pengumuman
          </a>
          <a href="#kriteria" className="hover:text-slate-200 transition-colors">
            Stok Dicari
          </a>
          <a href="#estimasi" className="hover:text-slate-200 transition-colors">
            Cek Estimasi
          </a>
          <a href="#alur" className="hover:text-slate-200 transition-colors">
            Alur Deal
          </a>
          <a href="#tawarin" className="hover:text-slate-200 transition-colors">
            Tawarin Akun
          </a>
        </nav>

        <p className="text-xs text-slate-500">
          © 2026 Kaizostore.
        </p>
      </div>
    </footer>
  );
}
