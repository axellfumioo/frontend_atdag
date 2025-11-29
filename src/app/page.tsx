"use client";

import React from "react";

import Navbar from "@/components/landingpage/Navbar";
import Hero from "@/components/landingpage/Hero";
import Cta from "@/components/landingpage/Cta";
import Card from "@/components/landingpage/Card";

import {
  Users,
  TrendingUp,
  MessageCircle,
  MessageSquare,
  Radio,
  PieChart,
} from "lucide-react";
import Footer from "@/components/Footer";

export default function LandingPage() {

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

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />
      <Hero />
      <Cta />

      {/* Feature Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-2">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Fitur Utama</h2>

          <p className="text-sm text-slate-600 mb-6 max-w-3xl">
            Alat yang dirancang untuk menjadikan proses investor management dan
            reporting lebih cepat dan dapat diandalkan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Card
                key={i}
                {...f}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
