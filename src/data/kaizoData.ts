import {
  DealRecord,
  EstimatorInput,
  EstimatorResult,
  StockCriteriaItem,
} from '../types/kaizo';

export const KAIZO_ANNOUNCEMENT_LINES = [
  'Hey kamu tau gak? Kaizostore balik lagi,',
  'dan sekarang lagi cari stok epep sebanyak-banyaknya.',
  'Jadi tunggu apa lagi, buat kalian yang butuh uang,',
  'langsung aja tawarin epep kalian ke gua.',
  'Cocok gasken, ga cocok bisa diskip — tunggu apalagi gasken cuy!',
];

export const STOCK_CRITERIA: StockCriteriaItem[] = [
  {
    id: 'akun-sultan-old',
    indexLabel: '01.',
    category: 'sultan',
    categoryLabel: 'Akun Sultan',
    priorityLabel: 'Prioritas Utama · Bind Bersih',
    title: 'Akun Sultan & Bundle Old Season',
    summary:
      'Stok paling dicari buat etalase utama Kaizostore. Utamakan bind tunggal (Google/FB polos no minus) dengan riwayat aman dan koleksi item lawas.',
    requirements: [
      'Bundle Old (Season 1–8, Hip-Hop, Sakura, Criminal)',
      'Koleksi Vault 350+ set lengkap dengan emote langka',
      'Minimal 3 Evo Gun sudah maksimal (Lv. 7)',
    ],
    priceRange: 'Rp 650.000 – Rp 2.500.000+',
    presetSpec: 'Akun Sultan / Bundle Old, Vault 350+, bind polos no minus',
    featured: true,
  },
  {
    id: 'koleksi-evo-sg2',
    indexLabel: '02.',
    category: 'evo',
    categoryLabel: 'Evo & Vault',
    priorityLabel: 'Pencairan Cepat · Stok Harian',
    title: 'Spesialis Evo Gun & SG2 Populer',
    summary:
      'Akun mid-tier yang fokus di senjata meta. Cocok buat kalian yang butuh uang cepat tanpa harus nunggu pembeli eceran.',
    requirements: [
      'SG2 M1887 (One Punch Man, Rapper, Sterling, atau Terrano)',
      '1–4 Evo Gun (AK Draco, MP40 Cobra, Scar Megalodon, UMP)',
      'Login Google atau Facebook aktif tanpa sesi nyangkut',
    ],
    priceRange: 'Rp 200.000 – Rp 600.000',
    presetSpec: 'Spesialis SG2 & 2 Evo Gun aktif, siap cek langsung',
  },
  {
    id: 'vault-menengah',
    indexLabel: '03.',
    category: 'evo',
    categoryLabel: 'Evo & Vault',
    priorityLabel: 'Dicari Banyak · Nego Santai',
    title: 'Akun Mid-Vault 150–300 Bundle',
    summary:
      'Akun harian terawat dengan koleksi bundle kolaborasi atau incubator favorit. Langsung tawarkan beserta harga yang kalian minta.',
    requirements: [
      'Vault 150–300 baju/set siap pakai',
      'Ada skin senjata lobby + minimal 1–2 katana/fist',
      'Data pemulihan bersih dan siap lepas email',
    ],
    priceRange: 'Rp 140.000 – Rp 380.000',
    presetSpec: 'Mid-Vault 150-300 bundle + skin lobby, login aman',
  },
  {
    id: 'polosan-rank-tinggi',
    indexLabel: '04.',
    category: 'polosan',
    categoryLabel: 'Rank & Polosan',
    priorityLabel: 'Ambil Borongan · Proses Kilat',
    title: 'Akun Polosan / Rank Heroic–Grandmaster',
    summary:
      'Punya stok akun tuyul rank tinggi, guild leader, atau polosan level 60+ yang nganggur? Kirim aja list-nya, borongan juga kita terima.',
    requirements: [
      'Level akun 60+ atau punya badge Heroic/Master beberapa season',
      'CN (Change Name) tersedia jadi nilai tambah',
      'Bebas cheat/suspend, bisa login langsung saat dicek',
    ],
    priceRange: 'Rp 60.000 – Rp 180.000',
    presetSpec: 'Akun polosan Level 60+ / Rank tinggi, no minus',
    featured: true,
  },
];

export const RECENT_DEALS: DealRecord[] = [
  {
    id: 'KS-904',
    tier: 'Sultan Old + 4 Evo Max',
    specs: 'Vault 420 · Hip-Hop · SG2 OPM · AK Draco Lv.7',
    login: 'Google',
    dealPrice: 1450000,
    payoutMethod: 'BCA',
    duration: '14 menit cair',
  },
  {
    id: 'KS-903',
    tier: 'Mid-Tier SG2 & MP40 Cobra',
    specs: 'Vault 210 · SG2 Rapper · MP40 Cobra Lv.6',
    login: 'Facebook',
    dealPrice: 340000,
    payoutMethod: 'Dana',
    duration: '9 menit cair',
  },
  {
    id: 'KS-902',
    tier: 'Vault 280 + Bundle Kolab',
    specs: 'Vault 285 · Fist · Katana Lobby · CN Ready',
    login: 'Google',
    dealPrice: 275000,
    payoutMethod: 'SeaBank',
    duration: '11 menit cair',
  },
  {
    id: 'KS-901',
    tier: 'Borongan 2 Akun Polosan Lv.65',
    specs: 'Rank Heroic BR/CS · Bind Polos Bersih',
    login: 'VK',
    dealPrice: 190000,
    payoutMethod: 'GoPay',
    duration: '8 menit cair',
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateBuybackEstimate(input: EstimatorInput): EstimatorResult {
  let min = 65000;
  let max = 120000;

  // Vault contribution
  switch (input.vaultCount) {
    case '<100':
      min += 0;
      max += 30000;
      break;
    case '100-250':
      min += 75000;
      max += 160000;
      break;
    case '250-500':
      min += 180000;
      max += 380000;
      break;
    case '500+':
      min += 380000;
      max += 750000;
      break;
  }

  // Evo Gun Max contribution
  switch (input.evoMaxCount) {
    case '0':
      break;
    case '1-2':
      min += 90000;
      max += 210000;
      break;
    case '3-5':
      min += 260000;
      max += 540000;
      break;
    case '6+':
      min += 550000;
      max += 1100000;
      break;
  }

  // Special item contribution
  if (input.specialItem === 'sg2') {
    min += 70000;
    max += 180000;
  } else if (input.specialItem === 'old-bundle') {
    min += 250000;
    max += 650000;
  }

  // Login type factor
  if (input.loginType === 'Google' || input.loginType === 'Facebook') {
    min += 15000;
    max += 35000;
  }

  // Condition adjustment
  if (input.condition === 'Minus Ringan / Tabrak') {
    min = Math.max(40000, Math.round((min * 0.6) / 5000) * 5000);
    max = Math.max(75000, Math.round((max * 0.65) / 5000) * 5000);
  } else {
    min = Math.round(min / 5000) * 5000;
    max = Math.round(max / 5000) * 5000;
  }

  if (
    input.condition === 'No Minus (Polos Bersih)' &&
    (input.evoMaxCount === '3-5' ||
      input.evoMaxCount === '6+' ||
      input.specialItem === 'old-bundle' ||
      input.vaultCount === '250-500' ||
      input.vaultCount === '500+')
  ) {
    return {
      minPrice: min,
      maxPrice: max,
      verdict: 'Cocok — Prioritas Gasken',
      verdictLevel: 'high',
      note: 'Spek ini lagi paling dicari Kaizostore. Kalau harga kamu masih masuk rentang ini atau beda tipis, langsung ajukan biar cepat cek login.',
    };
  }

  if (input.condition === 'No Minus (Polos Bersih)') {
    return {
      minPrice: min,
      maxPrice: max,
      verdict: 'Masuk — Cek Spek Lanjutan',
      verdictLevel: 'medium',
      note: 'Stok harian tetap kita tampung. Sertakan screenshot vault & senjata pas kirim penawaran supaya negonya langsung ketemu.',
    };
  }

  return {
    minPrice: min,
    maxPrice: max,
    verdict: 'Kurang Masuk — Tetap Bisa Ditawarkan',
    verdictLevel: 'low',
    note: 'Akun ada minus tetap bisa ditawarkan, tapi harga disesuaikan risiko minusnya. Cocok gasken, nggak cocok tinggal skip santai.',
  };
}
