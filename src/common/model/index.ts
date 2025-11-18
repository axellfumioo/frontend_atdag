export interface Currency {
  id: number;
  order: number; // currency_order
  code: string; // e.g. USD, IDR
  name: string; // e.g. US Dollar, Rupiah
  symbol: string; // e.g. $, Rp

  created_at: string;
  updated_at: string;
}


export interface InvestmentStage {
  id: number;
  order: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface InvestorType {
  id: number;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface Investor {
  id: number;
  name: string;
  website: string;
  investor_type_id: number;
  investor_type?: InvestorType;
  created_at: string;
  updated_at: string;
}