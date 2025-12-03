// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import LayoutClient from "@/components/LayoutClient";
import { Toaster } from "@/common/shadcn/ui/sonner";
import QueryProvider from "@/common/providers/QueryProvider";
import { LanguageProvider } from "@/common/providers/LanguageProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 antialiased`}
      >
        <LanguageProvider>
        <QueryProvider>{children}</QueryProvider>
        <Toaster expand position="top-center" richColors />
        </LanguageProvider>

      </body>
    </html>
  );
}
