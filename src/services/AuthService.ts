import { LoginDto, RegisterDto } from "@/common/dto/authDto";
import api from "@/common/lib/apiClient";
import { BASE_URL } from "@/common/lib/loadEnv";
import { toast } from "sonner";

interface IAuthService {
  login: (dto: LoginDto) => void;
  logout: () => void;
  register: (dto: RegisterDto) => void;
}

class AuthService implements IAuthService {

  public async login(dto: LoginDto) {
    try {
      const res = await api.post(`${BASE_URL}/auth/login`, dto);
      const { token, user } = res.data.data;
      sessionStorage.setItem("jwt_token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      toast.success("Login Success!");
      return true;
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  }
  public async register(dto: RegisterDto) {
    try {
      const res = await api.post(`${BASE_URL}/auth/register`, dto);
      toast.success(res.data.message);
      return true;
    } catch (err: any) {
      toast.error(err.message || "Register failed");
    }
  }

  public async logout() {
    sessionStorage.removeItem("jwt_token");
    sessionStorage.removeItem("user");
    toast.success("Logout Success!");
    return true;
  }
}

export const authService = new AuthService();
