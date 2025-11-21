import { createInvestmentstatusDto, updateInvestmentstatusDto } from "@/common/dto/investmentStatus.dto"
import api from "@/common/lib/apiClient"
import { BASE_URL } from "@/common/lib/loadEnv"
import { InvestmentStatus } from "@/common/model"

class InvestmentStatusService {
    public async getAllInvestmentStatus(): Promise<InvestmentStatus[]> {
        const res = await api.get<{ data: InvestmentStatus[] }>(`${BASE_URL}/investment-statuses/all`)
        return res.data.data
    }

    public async getAllInvestmentStatusWithPagination(page?: number, page_size?: number): Promise<InvestmentStatus[]> {
        const res = await api.get<{ data: InvestmentStatus[] }>(`${BASE_URL}/investment-statuses?page=${page}&page_size=${page_size}`)
        return res.data.data
    }

    public async createInvestmentStatus(dto: createInvestmentstatusDto) {
        const res = await api.post<{ data: InvestmentStatus }>(`${BASE_URL}/investment-statuses/create`, dto)
        return res.data.data
    }

    public async updateInvestmentStatus(id: number, dto: updateInvestmentstatusDto) {
        const res = await api.patch<{ data: InvestmentStatus }>(`${BASE_URL}/investment-statuses/${id}`, dto)
        return res.data.data
    }

    public async deleteInvestmentStatus(id: number) {
        const res = await api.delete<{ data: InvestmentStatus }>(`${BASE_URL}/investment-statuses/${id}`)
        return res.data.data
    }
}

export const investmentStatusService = new InvestmentStatusService();