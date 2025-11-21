import { CreateInvestmentDto, UpdateInvestmentDto } from "@/common/dto/investment.dto"
import api from "@/common/lib/apiClient"
import { BASE_URL } from "@/common/lib/loadEnv"
import { Investment } from "@/common/model"

class InvestmentService {
    public async getAllInvestments(page: number): Promise<Investment[]> {
        const res = await api.get<{ data: Investment[] }>(`${BASE_URL}/investments?page=${page}`)
        return res.data.data
    }

    public async getInvestmentAmount(): Promise<string> {
        const res = await api.get<{ data: string }>(`${BASE_URL}/investments/amount`)
        return res.data.data
    }

    public async getAllInvestmentsTotal(): Promise<number> {
        const res = await api.get(`${BASE_URL}/investments/total`)
        return res.data.data
    }

    public async getAllInvestmentOpen(): Promise<number> {
        const res = await api.get(`${BASE_URL}/investments/open/total`)
        return res.data.data
    }

    public async createInvestment(dto: CreateInvestmentDto) {
        const res = await api.post<{ message: string, data: Investment }>(`${BASE_URL}/investments/create`, dto)
        return res?.data.data
    }
    public async updateInvestment(dto: UpdateInvestmentDto) {
        const res = await api.patch<{ message: string, data: Investment }>(`${BASE_URL}/investments/update`, dto)
        return res?.data.data
    }
    public async deleteInvestment(investmentId: number): Promise<Investment> {
        const res = await api.delete<{ data: Investment }>(`/investments/${investmentId}`)
        return res?.data.data
    }
}

export const investmentService = new InvestmentService