export interface CreateInvestorDto {
    investor_name: string;
    website: string;
    investor_type_id: number;
}

export interface UpdateInvestorDto {
    investor_id: number;
    investor_name: string;
    website: string;
    investor_type_id: number;
}
