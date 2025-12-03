"use client";

import { useLanguage } from '@/common/providers/LanguageProvider';
import React from 'react'

export default function Test() {

    const { t } = useLanguage();
    const { lang, setLang } = useLanguage();

  const toggleLang = () => {
    setLang(lang === "id" ? "en" : "id");
  }
  return (
    <div>
        <p>{t('hero')}</p>
         <button
        onClick={toggleLang}
        className="px-3 py-1 rounded-full border text-sm hover:bg-gray-100"
      >
        {lang === "id" ? "EN" : "ID"}
      </button>
    </div>
  )
  }
