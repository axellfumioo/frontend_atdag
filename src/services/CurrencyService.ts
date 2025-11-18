import { CreateCurrencyDto, UpdateCurrencyDto } from "@/common/dto/currency.dto";
import api from "@/common/lib/apiClient";
import { BASE_URL } from "@/common/lib/loadEnv";
import { Currency } from "@/common/model";

class CurrencyService {
  public async getAllCurrencies(page?: number, page_size?: number): Promise<Currency[]> {
    const res = await api.get<{ data: Currency[] }>(`${BASE_URL}/currencies?page=${page}&page_size=${page_size}`);
    return res.data.data;
  }

  public async createCurrency(dto: CreateCurrencyDto) {
    const res = await api.post<{ data: Currency }>(`${BASE_URL}/currencies/create`, dto);
    return res.data.data;
  }

  public async deleteCurrency(id: number) {
    const res = await api.delete<{ data: Currency }>(`${BASE_URL}/currencies/${id}`);
    return res.data.data;
  }

  public async updateCurrency(id: number, dto: UpdateCurrencyDto) {
    const res = await api.patch<{ data: Currency }>(`${BASE_URL}/currencies/${id}`, dto);
    return res.data.data;
  }
}

export const currencyService = new CurrencyService();