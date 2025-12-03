import { LanguageProvider } from '@/common/providers/LanguageProvider'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
            <div>{children}</div>)
    </LanguageProvider>
  )

}
