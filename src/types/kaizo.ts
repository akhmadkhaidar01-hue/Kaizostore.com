export type AccountLoginType = 'Google' | 'Facebook' | 'VK' | 'X / Twitter';

export type AccountCondition = 'No Minus (Polos Bersih)' | 'Minus Ringan / Tabrak';

export type StockFilterCategory = 'all' | 'sultan' | 'evo' | 'polosan';

export interface StockCriteriaItem {
  id: string;
  indexLabel: string;
  category: Exclude<StockFilterCategory, 'all'>;
  categoryLabel: string;
  priorityLabel: string;
  title: string;
  summary: string;
  requirements: string[];
  priceRange: string;
  presetSpec: string;
  featured?: boolean;
}

export interface EstimatorInput {
  loginType: AccountLoginType;
  condition: AccountCondition;
  evoMaxCount: '0' | '1-2' | '3-5' | '6+';
  vaultCount: '<100' | '100-250' | '250-500' | '500+';
  specialItem: 'none' | 'sg2' | 'old-bundle';
}

export interface EstimatorResult {
  minPrice: number;
  maxPrice: number;
  verdict: 'Cocok — Prioritas Gasken' | 'Masuk — Cek Spek Lanjutan' | 'Kurang Masuk — Tetap Bisa Ditawarkan';
  verdictLevel: 'high' | 'medium' | 'low';
  note: string;
}

export interface DealRecord {
  id: string;
  tier: string;
  specs: string;
  login: AccountLoginType;
  dealPrice: number;
  payoutMethod: string;
  duration: string;
}

export interface OfferSubmission {
  id: string;
  createdAt: string;
  sellerName: string;
  whatsapp: string;
  uid: string;
  nickname: string;
  loginType: AccountLoginType;
  condition: AccountCondition;
  askingPrice: number;
  specsSummary: string;
  estimatedBracket?: string;
}
