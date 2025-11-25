import api from "@/common/lib/apiClient";
import { BASE_URL } from "@/common/lib/loadEnv";
import { Role } from "@/common/model";


class RoleService {
    public async getAllRole(): Promise<Role[] > {
        const res = await api.get<{data: Role[]}> (
            `${BASE_URL}/roles`
        )
        return res.data.data
    }
}

export const roleService = new RoleService();