"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { useState } from "react";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 antialiased`}
      >
        <div className="flex h-screen">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

          <div className="flex-1 flex flex-col overflow-hidden">

            <main className="flex-1 overflow-y-auto p-6 lg:p-8">
              {children}
            </main>

            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}