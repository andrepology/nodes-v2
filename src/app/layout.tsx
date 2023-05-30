'use client'

import './globals.css'
import { Inter } from 'next/font/google'

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import NodeNavigator from '@/components/NodeNavigator'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " w-screen h-screen"}>

        {children}

      </body>
    </html>
  )
}
