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

  return <p>Processing Google login...</p>;
}
