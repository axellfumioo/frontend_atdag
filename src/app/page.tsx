"use client";

import { useRouter } from "next/navigation";
import React from "react";
import {
  Users,
  TrendingUp,
  MessageCircle,
  MessageSquare,
  Radio,
  PieChart,
  ArrowRight,
} from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  buttonText,
  iconBg,
  iconColor,
}) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
      <Icon className={`${iconColor} w-6 h-6`} />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>
    <button className="flex items-center gap-2 text-sm font-medium text-yellow-600 hover:text-yellow-700 transition-colors">
      {buttonText}
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);

export default function LandingPage() {

  const router = useRouter();

  // Object untuk login/signup
  const authActions = {
    login: { name: "Login", path: "/auth/login" },
    signup: { name: "Sign Up", path: "/auth/register" },
  };

  // Fungsi handler auth
  const handleAuth = (action) => {
    if (!action?.path) return console.error("Invalid action:", action);
    router.push(action.path);
  };

  const features = [
    {
      icon: Users,
      title: "Manajemen Investor",
      description: "Tambah, ubah, dan pantau investor dengan profil lengkap.",
      buttonText: "Kelola Investor",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-500",
    },
    {
      icon: TrendingUp,
      title: "Pemantauan Investasi",
      description: "Pantau tahapan, nominal, dan performa investasi.",
      buttonText: "Lacak Investasi",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-500",
    },
    {
      icon: MessageCircle,
      title: "Komunikasi WhatsApp",
      description: "Integrasikan WhatsApp untuk komunikasi tanpa hambatan.",
      buttonText: "Integrasi WhatsApp",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-500",
    },
    {
      icon: MessageSquare,
      title: "Template Pesan",
      description: "Buat dan kelola template pesan yang dapat digunakan kembali.",
      buttonText: "Kelola Template",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-500",
    },
    {
      icon: Radio,
      title: "Grup Siaran",
      description: "Kelompokkan investor untuk pesan yang efisien.",
      buttonText: "Kelola Grup",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-500",
    },
    {
      icon: PieChart,
      title: "Analitik Dasbor",
      description: "Lihat analitik lengkap tentang performa investor.",
      buttonText: "Lihat Dasbor",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="py-3 px-3">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-full px-8 py-4 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
             <div className="flex items-center">
  <img
    src="/logo-export.png"
    alt="Logo"
    className="h-12 w-auto object-contain"
  />
</div>

              <div className="flex items-center gap-8">
                {/* LOGIN */}
                <p
                  onClick={() => handleAuth(authActions.login)}
                  className="text-sm text-gray-700 font-medium hover:text-gray-900 cursor-pointer"
                >
                  Login
                </p>

                {/* SIGNUP */}
                <button
                  onClick={() => handleAuth(authActions.signup)}
                  className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  Sign up <span className="text-xs">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-2">
        <div className="max-w-7xl mx-auto">
          <div
           className="from-[#C6FF1A] via-[#D5FF3F] to-[#E0FF6B] rounded-[3rem] px-14 py-16 border-[6px] border-white shadow-2xl relative overflow-hidden min-h-[70vh] flex flex-col items-center justify-center text-center">
            <div className="absolute top-0 left-0 w-72 h-72 bg-lime-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-block bg-white/40 backdrop-blur-sm border-2 border-lime-500/30 rounded-full px-6 py-2 mb-6">
                <span className="text-xs font-semibold text-gray-900 tracking-wider">
                  WELCOME TO EXPORT INDONESIA
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.05] mb-4">
                Solusi Modern untuk 
                <br />
                Manajemen Investor Perusahaan
              </h1>

              <p className="text-sm md:text-base text-gray-900/80 max-w-2xl mx-auto font-medium leading-relaxed">
                Bangun transparansi dan efisiensi dengan sistem pelacakan investasi yang cepat, aman, dan akurat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="max-w-3xl mx-auto -mt-16 relative z-20 px-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Mulai Kelola Investasi Anda Sekarang
          </h3>
          <p className="text-gray-600 mb-5 text-sm">
            Sistem modern untuk memantau investor, mengelola komunikasi, dan menganalisis performa investasi Anda.
          </p>
          <button
            onClick={() => handleAuth(authActions.signup)}
            className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
          >
            Mulai Sekarang
          </button>
        </div>
      </div>

      {/* Features */}
      <section className="py-20 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}