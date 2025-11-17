import { LoginDto, RegisterDto } from "@/common/dto/authDto";
import api from "@/common/lib/apiClient";
import { BASE_URL } from "@/common/lib/loadEnv";
import { toast } from "sonner";
import Toast from "typescript-toastify";

interface IAuthService {
  login: (dto: LoginDto) => void;
  logout: () => void;
  register: (dto: RegisterDto) => void;
}

class AuthService implements IAuthService {
  // Login service
  public async login(dto: LoginDto) {
    const res = await api.post(`${BASE_URL}/auth/login`, dto);
    const { token, user } = res.data.data;
    sessionStorage.setItem("jwt_token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
    toast.success("Login Success!");
  }

  public async logout() {
    sessionStorage.removeItem("jwt_token");
    sessionStorage.removeItem("user");
    toast.success("Logout Success!");
  }

  public async register(dto: RegisterDto) {
    const res = await api.post(`${BASE_URL}/auth/register`, dto);
    const { token, user } = res.data.data;
  }
}

export const authService = new AuthService();
