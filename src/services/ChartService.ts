import api from "@/common/lib/apiClient";
import { BASE_URL } from "@/common/lib/loadEnv";
import { ChartInvestmentPerCurrency, ChartInvestmentPerStatus } from "@/common/model";

export class ChartService {
    public async getChartInvestmentPerStatus(): Promise<ChartInvestmentPerStatus[]> {
        const res = await api.get<{ data: ChartInvestmentPerStatus[] }>(`${BASE_URL}/charts/investments/status`);
        return res.data.data;
    }

    public async getChartInvestmentPerCurrency(): Promise<ChartInvestmentPerCurrency[]> {
        const res = await api.get<{ data: ChartInvestmentPerCurrency[] }>(`${BASE_URL}/charts/investments/currency`);
        return res.data.data;
    }
}

export const chartService = new ChartService();