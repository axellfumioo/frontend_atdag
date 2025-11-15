"use client"
import { CardComponentsProps } from "@/types/card";

export default function CardComponents({ key, card, Icon, router }: CardComponentsProps) {
    return (
        <div
                key={key}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div
                  className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>

                <div className="text-lg font-bold text-gray-900 mb-3">
                  {card.title}
                </div>

                <div className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {card.description}
                </div>

                <button
                  onClick={() => router.push(card.buttonPath)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span>{card.buttonText}</span>
                </button>
              </div>
    )
}