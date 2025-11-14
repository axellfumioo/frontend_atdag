"use client";

export default function Header() {
  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 ">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 text-center">
          Get Started with Your Investment Management
        </h1>

        <p className="text-gray-600 text-sm mb-4 sm:mb-8 hidden sm:block text-center">
          Manage investors, track investments, and connect with WhatsApp tools.
        </p>
      </div>
    </div>
  );
}