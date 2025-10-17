import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EduCRM',
  description: 'Created with TheDarik',
  generator: 'TheDarik',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
