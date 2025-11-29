"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  TrendingUp,
  MessageCircle,
  MessageSquare,
  Radio,
  PieChart,
  ArrowRight,
} from "lucide-react";

/* ---------------------------------------------------
   SMALL COMPONENTS
---------------------------------------------------- */

const BadgePill = ({ children }) => (
  <div className="inline-block bg-white/50 backdrop-blur rounded-full px-4 py-1 text-xs font-semibold text-slate-900">
    {children}
  </div>
);

const SmallStat = ({ label, value }) => (
  <div className="bg-white rounded-xl p-3 border border-gray-100">
    <div className="text-[13px] text-slate-600">{label}</div>
    <div className="text-lg font-semibold text-slate-900">{value}</div>
  </div>
);

const DesignDocHidden = ({ text }) => (
  <div className="sr-only">
    <pre>{text}</pre>
  </div>
);

/* Feature Card */
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  buttonText,
  iconBg = "bg-amber-50",
  iconColor = "text-amber-500",
  onClick,
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
    <div>
      <div
        className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 shrink-0`}
      >
        <Icon className={`${iconColor} w-6 h-6`} />
      </div>

      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        {title}
      </h3>

      <p className="text-sm text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>

    <button
      onClick={onClick}
      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-200"
    >
      {buttonText}
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);


export default function LandingPage() {
  const router = useRouter();

  const authActions = {
    login: { name: "Login", path: "/auth/login" },
    signup: { name: "Sign Up", path: "/auth/register" },
  };

  const handleAuth = (action) => {
    if (!action?.path) return console.error("Invalid action:", action);
    router.push(action.path);
  };

  const features = [
    {
      icon: Users,
      title: "Manajemen Investor",
      description:
        "Tambah, kelola, dan pantau investor dengan profil lengkap dan riwayat interaksi.",
      buttonText: "Kelola Investor",
    },
    {
      icon: TrendingUp,
      title: "Pemantauan Investasi",
      description:
        "Lacak tahap, return, dan metrik performa investasi secara real-time.",
      buttonText: "Lacak Investasi",
    },
    {
      icon: MessageCircle,
      title: "Komunikasi WhatsApp",
      description:
        "Kirim pesan langsung ke investor dengan template dan lampiran otomatis.",
      buttonText: "Integrasi WhatsApp",
    },
    {
      icon: MessageSquare,
      title: "Template Pesan",
      description:
        "Simpan template pesan sekali buat untuk broadcast atau follow-up.",
      buttonText: "Kelola Template",
    },
    {
      icon: Radio,
      title: "Grup Siaran",
      description:
        "Segmentasi investor untuk kampanye yang lebih tertarget dan efisien.",
      buttonText: "Kelola Grup",
    },
    {
      icon: PieChart,
      title: "Analitik Dasbor",
      description:
        "Dasbor ringkas dengan metrik utama dan laporan ekspor.",
      buttonText: "Lihat Dasbor",
    },
  ];

  const DESIGN_DOC = `
  DESIGN NOTES:
  - Clean, modern, responsive.
  - Palette: #0f172a, #F59E0B, #A3E635.
  - Components: Navbar, Hero, CTA, Features, Why Choose.
  `;

  return (
    <div className="min-h-screen bg-gray-50 antialiased">

      <nav className="py-3 px-3">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-full px-8 py-4 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <img
                src="/logo-export.png"
                alt="Logo"
                className="h-12 object-contain"
              />

              <div className="flex items-center gap-8">
                <p
                  onClick={() => handleAuth(authActions.login)}
                  className="text-sm text-gray-700 font-medium hover:text-gray-900 cursor-pointer"
                >
                  Login
                </p>

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

      <section className="px-2">
        <div className="max-w-7xl mx-auto">
          <div className="from-[#C6FF1A] via-[#D5FF3F] to-[#E0FF6B] rounded-[3rem] px-14 py-16 border-[6px] border-white shadow-2xl relative overflow-hidden min-h-[70vh] flex flex-col items-center justify-center text-center">
            <div className="absolute top-0 left-0 w-72 h-72 bg-lime-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="inline-block bg-white/40 backdrop-blur-sm border-2 border-lime-500/30 rounded-full px-6 py-2 mb-6">
                <span className="text-xs font-semibold tracking-wider text-gray-900">
                  WELCOME TO EXPORT INDONESIA
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.05] mb-4">
                Solusi Modern untuk <br /> Manajemen Investor Perusahaan
              </h1>

              <p className="text-sm md:text-base text-gray-900/80 max-w-2xl mx-auto font-medium leading-relaxed">
                Bangun transparansi dan efisiensi dengan sistem pelacakan
                investasi yang cepat, aman, dan akurat.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto -mt-16 relative z-20 px-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Mulai Kelola Investasi Anda Sekarang
          </h3>

          <p className="text-gray-600 mb-5 text-sm">
            Sistem modern untuk memantau investor, mengelola komunikasi, dan
            menganalisis performa investasi.
          </p>

          <button
            onClick={() => handleAuth(authActions.signup)}
            className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
          >
            Mulai Sekarang
          </button>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-2">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Fitur Utama</h2>

          <p className="text-sm text-slate-600 mb-6 max-w-3xl">
            Alat yang dirancang untuk menjadikan proses investor management dan
            reporting lebih cepat dan dapat diandalkan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FeatureCard
                key={i}
                {...f}
                onClick={() => router.push("/features")}
              />
            ))}
          </div>
        </div>
      </section>

<section className="relative py-24 bg-gray-50 overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,220,140,0.18),transparent_70%)]"></div>

  <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
    
    {/* LEFT CONTENT */}
    <div className="space-y-5">
      <span className="inline-block bg-white border border-amber-300 px-5 py-1.5 rounded-full text-xs font-semibold text-amber-600 shadow-sm">
        Why Choose Us
      </span>

      <h2 className="text-3xl md:text-4xl font-bold leading-snug text-slate-900">
        Kenapa Harus <span className="text-amber-500">Export Indonesia?</span>
      </h2>

      <p className="text-slate-600 text-base max-w-md">
        Sistem yang mempermudah pengelolaan investor, komunikasi otomatis, hingga analitik berbasis data.
      </p>
    </div>

    {/* RIGHT FEATURES */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

      {/* ITEM */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white border border-amber-100 shadow-md flex items-center justify-center">
          <Users className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Platform Terpusat</h4>
          <p className="text-sm text-slate-600">
            Semua data investor dalam satu dashboard terorganisir.
          </p>
        </div>
      </div>

      {/* ITEM */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white border border-amber-100 shadow-md flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Analitik & Laporan</h4>
          <p className="text-sm text-slate-600">
            Grafik, insight, dan export CSV dalam satu klik.
          </p>
        </div>
      </div>

      {/* ITEM */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white border border-amber-100 shadow-md flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Komunikasi Otomatis</h4>
          <p className="text-sm text-slate-600">
            Template pesan, broadcast, dan WhatsApp integration.
          </p>
        </div>
      </div>

      {/* ITEM */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white border border-amber-100 shadow-md flex items-center justify-center">
          <PieChart className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Keamanan Tinggi</h4>
          <p className="text-sm text-slate-600">
            Role-based access, audit logs, dan enkripsi data modern.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>


      <footer className="bg-white border-t ">
        <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Export Indonesia — All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm">
            <a href="/terms" className="hover:underline text-slate-600">
              Terms
            </a>
            <a href="/privacy" className="hover:underline text-slate-600">
              Privacy
            </a>
          </div>
        </div>
      </footer>

      <DesignDocHidden text={DESIGN_DOC} />
    </div>
  );
}
