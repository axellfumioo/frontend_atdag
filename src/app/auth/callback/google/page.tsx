"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const user = params.get("user");

    if (token && user) {
      sessionStorage.setItem("jwt_token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      router.replace("/");
    } else {
      router.replace("/auth/login?error=google_failed");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-yellow-400 border-t-orange-500 rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-6 text-lg font-medium text-orange-600">
        Sedang memproses Google Login...
      </p>
    </div>
  );
}
