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
import { useLanguage } from "@/common/providers/LanguageProvider";

export default function LandingPage() {

  const { t } = useLanguage();


const features = [
  {
    icon: Users,
    title: t("lp.0.feature_1_title"),
    description: t("lp.0.feature_1_desc"),
    buttonText: t("lp.0.feature_1_button"),
  },
  {
    icon: TrendingUp,
    title: t("lp.0.feature_2_title"),
    description: t("lp.0.feature_2_desc"),
    buttonText: t("lp.0.feature_2_button"),
  },
  {
    icon: MessageCircle,
    title: t("lp.0.feature_3_title"),
    description: t("lp.0.feature_3_desc"),
    buttonText: t("lp.0.feature_3_button"),
  },
  {
    icon: MessageSquare,
    title: t("lp.0.feature_4_title"),
    description: t("lp.0.feature_4_desc"),
    buttonText: t("lp.0.feature_4_button"),
  },
  {
    icon: Radio,
    title: t("lp.0.feature_5_title"),
    description: t("lp.0.feature_5_desc"),
    buttonText: t("lp.0.feature_5_button"),
  },
  {
    icon: PieChart,
    title: t("lp.0.feature_6_title"),
    description: t("lp.0.feature_6_desc"),
    buttonText: t("lp.0.feature_6_button"),
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
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{t("lp.0.features_title")}</h2>

          <p className="text-sm text-slate-600 mb-6 max-w-3xl">
            {t("lp.0.features_subtitle")}
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
