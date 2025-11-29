"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

type CardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  buttonText: string;
  iconBg?: string;
  iconColor?: string;
};

export default function Card({
  icon: Icon,
  title,
  description,
  buttonText,
  iconBg = "bg-amber-50",
  iconColor = "text-amber-500",
}: CardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <div
          className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
        >
          <Icon className={`${iconColor} w-6 h-6`} />
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          {title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
      </div>

      <button
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition"
      >
        {buttonText}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
