export interface createInvestorDto {
    name: string;
    website: string;
    investor_type_id: number;
}

export interface updateInvestorDto {
    id: number;
    name: string;
    website: string;
    investor_type_id: number;
}
