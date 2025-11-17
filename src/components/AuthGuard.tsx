"use client"

import { validateToken } from '@/common/lib/validateToken'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
export const runtime = "edge";

interface AuthGuardProps {
    children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();
    const [tokenStatus, setTokenStatus] = useState<'loading' | 'false' | 'true'>('loading');

    useEffect(() => {
        const token = typeof window !== "undefined" ? sessionStorage.getItem("jwt_token") : null;

        const evaluate = async () => {
            if (!token) {
                setTokenStatus('false');
                router.push("/auth/login");
                return;
            }

            setTokenStatus('loading');
            const isTokenValid = await validateToken(token);
            if (!isTokenValid) {
                setTokenStatus('false');
                router.push("/auth/login");
            } else {
                setTokenStatus('true');
            }
        };

        evaluate();
    }, [router]);

    useEffect(() => {
        if (tokenStatus !== 'true') return;

        const id = setInterval(() => {
            (async () => {
                const token = typeof window !== "undefined" ? sessionStorage.getItem("jwt_token") : null;
                if (!token) {
                    setTokenStatus('false');
                    router.push("/auth/login");
                    return;
                }

                const isTokenValid = await validateToken(token);
                if (!isTokenValid) {
                    setTokenStatus('false');
                    router.push("/auth/login");
                }
            })();
        }, 3000);

        return () => clearInterval(id);
    }, [tokenStatus, router]);

    if (tokenStatus === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-yellow-400 px-4">
                <div className="text-center space-y-4">
                    <div className="relative w-14 h-14 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin"></div>
                        <div className="absolute inset-2 rounded-full bg-yellow-200"></div>
                    </div>
                    <p className="text-lg font-medium tracking-wide animate-pulse text-yellow-400">
                        Loading, please wait...
                    </p>
                </div>
            </div>
        )
    }

    if (tokenStatus === 'false') {
        return null;
    }

    return <>{children}</>;
}