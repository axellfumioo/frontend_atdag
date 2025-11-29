"use client";

import React from "react";

export default function Hero() {
  return (
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
  );
}
