export interface createInvestmentstatusDto {
  status_name: string;
  order: number;
  status_type: string;
  status_color: string;
}

export interface updateInvestmentstatusDto {
  status_name: string;
  order?: number;
  status_type: string;
  status_color: string;
}