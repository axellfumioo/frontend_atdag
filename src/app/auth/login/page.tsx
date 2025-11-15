"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                
                <div className="bg-white shadow-sm border border-gray-200 rounded-xl px-8 py-10">
                    <h1 className="text-2xl font-semibold text-gray-900 text-center">
                        Sign in to your account
                    </h1>

                    <form
                        className="mt-8 space-y-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            router.push("/dashboard");
                        }}
                    >
                        {/* EMAIL */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white"
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-white"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition font-medium shadow-sm"
                        >
                            <LogIn className="w-4 h-4 top-1/2" />
                            Sign in
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-gray-200" />
                            <span className="text-xs text-gray-500">OR</span>
                            <div className="h-px flex-1 bg-gray-200" />
                        </div>

                        <button
                            type="button"
                            onClick={() => (window.location.href = "/api/auth/google")}
                            className="w-full py-2.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition flex items-center justify-center gap-2 text-gray-700 font-medium"
                        >
                            <img className="h-4 w-4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"/>
                            Continue with Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
