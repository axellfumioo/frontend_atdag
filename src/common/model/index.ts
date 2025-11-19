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

export interface Investment {
  investment_id: number;
  name: string;

  main_currency_value: string; // decimal → string
  value: string;               // decimal → string
  description:string

  expected_closing_date: string; // ISO date string
  closing_date: string;

  created_at: string;
  updated_at: string;

  investor_id: number;
  investor: Investor;

  investment_stage_id: number;
  investment_stage: InvestmentStage;

  investment_status_id: number;
  investment_status: InvestmentStatus;

  currency_id: number;
  currency: Currency;
}

export interface InvestmentStatus {
  id: number;
  order: number;          // status_order
  status_name: string;    // Name
  status_type: string;    // Type -> OPEN, CLOSED, CANCELLED
  status_color: string;   // Color

  investments: Investment[]; // relasi, opsional

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