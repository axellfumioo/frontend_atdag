import { CreateInvestmentStage, UpdateInvestmentStage } from "@/common/dto/investmentStage.dto";
import api from "@/common/lib/apiClient";
import { BASE_URL } from "@/common/lib/loadEnv";
import { InvestmentStage } from "@/common/model";

class InvestmentStageService {
    public async getInvestmentStages(page: number): Promise<InvestmentStage[]> {
        const res = await api.get<{ data: InvestmentStage[] }>(`${BASE_URL}/investment-stages?page=${page}`);
        return res.data.data;
    }

    public async createInvestmentStage(dto: CreateInvestmentStage) {
        const res = await api.post<{ data: InvestmentStage }>(`${BASE_URL}/investment-stages/create`, dto);
        return res.data.data;
    }

    public async deleteInvestmentStage(id: number) {
        const res = await api.delete<{ data: InvestmentStage }>(`${BASE_URL}/investment-stages/${id}`);
        return res.data.data;
    }

    public async updateInvestmentStage(id: number, dto: UpdateInvestmentStage) {
        const res = await api.patch<{ data: InvestmentStage }>(`${BASE_URL}/investment-stages/${id}`, dto);
        return res.data.data;
    }
}

export const investmentStageService = new InvestmentStageService();