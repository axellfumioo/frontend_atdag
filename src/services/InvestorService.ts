import { CreateInvestorDto, UpdateInvestorDto } from "@/common/dto/investorDto";
import api from "@/common/lib/apiClient";
import { BASE_URL } from "@/common/lib/loadEnv";
import { Investor } from "@/common/model/index";

class InvestorService {
  public async getAllInvestors(): Promise<Investor[]> {
    const res = await api.get<{ data: Investor[] }>(
      `${BASE_URL}/investor/all`
    );
    return res.data.data;
  }

  public async getAllInvestorsWithPagination(page = 1, pageSize = 10): Promise<Investor[]> {
    const res = await api.get<{ data: Investor[] }>(
      `${BASE_URL}/investor?page=${page}&page_size=${pageSize}`
    );
    return res.data.data;
  }

  public async getAllInvestorsTotal(): Promise<number> {
    const res = await api.get(`${BASE_URL}/investor/total`);
    return res.data.data
  }

  public async getInvestorById(investorId: number): Promise<Investor | null> {
    const res = await api.get<{ data: Investor | null }>(
      `${BASE_URL}/investor/${investorId}/get`
    );
    return res.data.data;
  }

  public async createInvestor(dto: CreateInvestorDto): Promise<Investor | null> {
    const res = await api.post<{ data: Investor | null }>(
      `${BASE_URL}/investor/create`,
      dto
    );
    return res.data.data;
  }

  public async updateInvestor(dto: UpdateInvestorDto): Promise<Investor | null> {
    const res = await api.patch<{ data: Investor | null }>(
      `${BASE_URL}/investor/update`,
      dto
    );
    return res.data.data;
  }

  public async deleteInvestor(id: number): Promise<Investor> {
    const res = await api.delete<{ data: Investor }>(
      `${BASE_URL}/investor/${id}`
    );
    return res.data.data
  }
}
export const investorService = new InvestorService();