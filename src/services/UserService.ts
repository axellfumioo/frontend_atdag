
import { CreateUsereDto, UpdateUserDto } from "@/common/dto/userDto";
import api from "@/common/lib/apiClient";
import { BASE_URL } from "@/common/lib/loadEnv";
import { User } from "@/common/model/index";


class UserService {

  public async getAllUsersTotal(): Promise<number> {
    const res = await api.get(`${BASE_URL}/users/total`);
    return res.data.data
  }

  public async getAllUser(page: number): Promise<User[]> {
    const res = await api.get<{ data: User[] }>(
      `${BASE_URL}/users?page=${page}`
    )
    return res.data.data
  }

  public async getUserById(userId: number): Promise<User | null> {
    const res = await api.get<{ data: User | null }>(
      `${BASE_URL}/users/${userId}`
    );
    return res.data.data;
  }

  public async createUser(dto: CreateUsereDto): Promise<User | null> {
    const res = await api.post<{ data: User | null }>(
      `${BASE_URL}/users`,
      dto
    );
    return res.data.data;
  }

  public async updateUser(userId: number, dto: UpdateUserDto): Promise<User | null> {
    const res = await api.put<{ data: User, dto: UpdateUserDto }>(
      `${BASE_URL}/users/${userId}`, dto
    );
    return res.data.data;
  }

  public async deleteUser(userId: number): Promise<User | null> {
    const res = await api.delete<{ data: User | null }>(
      `${BASE_URL}/users/${userId}`
    );
    return res.data.data;
  }
}

export const userService = new UserService();