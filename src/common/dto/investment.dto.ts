export interface CreateInvestmentDto {
  name: string;

  investor_id: number;             // required
  investment_stage_id: number;     // required
  investment_status_id: number;    // required
  currency_id: number;             // required

  value: string;                   // decimal.Decimal → string
  description: string

  expected_closing_date: Date;   // time.Time → ISO string
  actual_closing_date: Date;     // time.Time → ISO string
}

export interface UpdateInvestmentDto extends CreateInvestmentDto {
  investment_id: number
}