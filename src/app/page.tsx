"use client";

import { useRouter } from "next/navigation";
import { Users, TrendingUp, MessageSquare, Radio, PieChart, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import CardComponents from "@/components/ui/home/page";

const featureCards = [
  {
    title: "Manajemen Investor",
    description:
      "Tambah, ubah, dan pantau investor dengan profil yang lengkap. Simpan informasi kontak, riwayat investasi, dan catatan komunikasi untuk menjaga relasi yang lebih baik.",
    icon: Users,
    buttonText: "Kelola Investor",
    buttonPath: "/dashboard/investors",
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50",
  },
  {
    title: "Pemantauan Investasi",
    description:
      "Pantau tahapan, nominal, dan performa investasi di seluruh portofolio. Catat semua transaksi, tahapan, dan buat laporan terperinci untuk analisis.",
    icon: TrendingUp,
    buttonText: "Lacak Investasi",
    buttonPath: "/dashboard/investments",
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50",
  },
  {
    title: "Komunikasi WhatsApp",
    description:
      "Integrasikan WhatsApp untuk komunikasi tanpa hambatan dengan jaringan investor. Kirim pembaruan, pengumuman, dan jaga kontak rutin melalui alur pesan otomatis.",
    icon: MessageCircle,
    buttonText: "Integrasi WhatsApp",
    buttonPath: "/dashboard/wabroadcast",
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50",
  },
  {
    title: "Template Pesan",
    description:
      "Buat dan kelola template pesan yang dapat digunakan kembali untuk komunikasi konsisten. Rancang template profesional dengan variabel dinamis untuk pembaruan investor yang personal.",
    icon: MessageSquare,
    buttonText: "Kelola Template",
    buttonPath: "/dashboard/message-templates",
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50",
  },
  {
    title: "Grup Siaran",
    description:
      "Kelompokkan investor dalam grup terarah untuk pesan dan pembaruan yang efisien. Buat segmentasi berdasarkan tahapan investasi, minat, atau kriteria lain agar komunikasi lebih tepat sasaran.",
    icon: Radio,
    buttonText: "Kelola Grup",
    buttonPath: "/dashboard/wabroadcast/broadcastgroups",
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50",
  },
  {
    title: "Analitik Dasbor",
    description:
      "Lihat analitik dan wawasan lengkap tentang performa hubungan investor Anda. Fitur pelaporan lanjutan dengan grafik, metrik, dan pantauan KPI — Segera Hadir!",
    icon: PieChart,
    buttonText: "Lihat Dasbor",
    buttonPath: "/dashboard",
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50",
  },
];

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-linear-to-br from-white via-yellow-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Header />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <CardComponents
                key={index}
                id={index}
                card={card}
                router={router}
                Icon={Icon}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}