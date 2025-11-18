import { CreateInvestortypeDto, UpdateInvestortypeDto } from "@/common/dto/investortypeDto";
import api from "@/common/lib/apiClient";
import { BASE_URL } from "@/common/lib/loadEnv";
import { InvestorType } from "@/common/model/index";

class InvestorTypeService {
  public async getAllInvestorTypes(page = 1, pageSize = 10): Promise<InvestorType[]> {
    const res = await api.get<{ data: InvestorType[]}>(
      `${BASE_URL}/investor-types?page=${page}&page_size=${pageSize}`
    );
    return res.data.data;
  }

  public async getInvestorTypeById(id: number): Promise<InvestorType | null> {
    const res = await api.get<{ data: InvestorType | null }>(
      `${BASE_URL}/investor-types/${id}`
    );
    return res.data.data;
  }

  public async createInvestorType(dto: CreateInvestortypeDto): Promise<InvestorType | null> {
    const res = await api.post<{ data: InvestorType | null }>(
      `${BASE_URL}/investor-types/create`,
      dto
    );
    return res.data.data;
  }

  public async updateInvestorType(id: number, dto: UpdateInvestortypeDto): Promise<InvestorType | null> {
    const res = await api.patch<{ data: InvestorType | null }>(
      `${BASE_URL}/investor-types/${id}`,
      dto
    );
    return res.data.data;
  }

  public async deleteInvestorType(id: number): Promise<InvestorType | null> {
    const res = await api.delete<{ data: InvestorType | null }>(
      `${BASE_URL}/investor-types/${id}`
    );
    return res.data.data;
  }
}

export const investorTypeService = new InvestorTypeService();