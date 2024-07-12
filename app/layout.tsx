import type { Metadata } from "next"
import { Recursive } from "next/font/google"
import "./globals.css"

const recursive = Recursive({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Code Snippet",
  description: "Code snippet app, for storing and reuse code",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`dark ${recursive.className}`}>
        {children}
      </body>
    </html>
  )
}
