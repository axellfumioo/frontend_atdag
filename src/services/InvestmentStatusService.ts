import api from "@/common/lib/apiClient"
import { BASE_URL } from "@/common/lib/loadEnv"
import { InvestmentStatus } from "@/common/model"

class InvestmentStatusService {
    public async getAllInvestmentStatus(page?: number, page_size?: number): Promise<InvestmentStatus[]> {
        const res = await api.get<{ data: InvestmentStatus[] }>(`${BASE_URL}/investment-statuses?page=${page}&page_size=${page_size}  `)
        return res?.data?.data
    }
}

export const investmentStatusService = new InvestmentStatusService