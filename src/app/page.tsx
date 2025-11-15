"use client";

import { useRouter } from "next/navigation";
import { Users, TrendingUp, MessageSquare, Radio, PieChart, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import CardComponents from "@/components/ui/dashboard/Card";

const featureCards = [
  {
    title: "Investor Management",
    description: "Add, edit, and track your investors with comprehensive profiles. Maintain detailed contact information, investment history, and communication records for better relationship management.",
    icon: Users,
    buttonText: "Manage Investors",
    buttonPath: "/investors",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50"
  },
  {
    title: "Investment Tracking",
    description: "Monitor investment stages, amounts, and performance metrics across your portfolio. Keep detailed records of all transactions, stages, and generate comprehensive reports for analysis.",
    icon: TrendingUp,
    buttonText: "Track Investments",
    buttonPath: "/investments",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50"
  },
  {
    title: "WhatsApp Communication",
    description: "Integrate with WhatsApp for seamless communication with your investor network. Send updates, announcements, and maintain regular contact through automated messaging workflows.",
    icon: MessageCircle,
    buttonText: "WhatsApp Integration",
    buttonPath: "/wabroadcast",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50"
  },
  {
    title: "Message Templates",
    description: "Create and manage reusable message templates for consistent communication. Design professional templates with dynamic variables for personalized investor updates and announcements.",
    icon: MessageSquare,
    buttonText: "Message Templates",
    buttonPath: "/message-templates",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50"
  },
  {
    title: "Broadcast Groups",
    description: "Organize investors into targeted groups for efficient messaging and updates. Create segmented groups based on investment stages, interests, or other criteria for more effective communication.",
    icon: Radio,
    buttonText: "Broadcast Groups",
    buttonPath: "/wabroadcast/broadcastgroups",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50"
  },
  {
    title: "Dashboard Analytics",
    description: "View comprehensive analytics and insights about your investor relations performance. Advanced reporting features with charts, metrics, and KPI tracking - Coming Soon!",
    icon: PieChart,
    buttonText: "View Dashboard",
    buttonPath: "/dashboard",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50"
  },
];

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <CardComponents key={index} card={card} router={router} Icon={Icon} />
            );
          })}
        </div>
      </main>
    </>
  );
}