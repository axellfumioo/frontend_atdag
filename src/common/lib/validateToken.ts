import api from "@/common/lib/apiClient";

export async function validateToken(token: string) {
  try {
    const res = await api.get(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/users/session",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = (res as any)?.data ?? res;
    if (data && data.success === false) {
      
      if (typeof window !== "undefined") {
        try {
          sessionStorage.clear();
          
          document.cookie = "token=; Max-Age=0; path=/;";
          window.location.href = "/login";
        } catch (e) {
          
        }
      }
      return false;
    }

    return true;
  } catch (err: any) {
    
    if (typeof window !== "undefined") {
      try {
        sessionStorage.clear();
        document.cookie = "token=; Max-Age=0; path=/;";
        window.location.href = "/login";
      } catch (e) {
        
      }
    }
    return false;
  }
}
