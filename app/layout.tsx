import type { Metadata } from "next"
import { Recursive } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

const recursive = Recursive({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Snippet Share",
  description: "Code snippet app, for storing and reuse code",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{ baseTheme: dark }}>
        <body className={`dark ${recursive.className}`}>{children}</body>
      </ClerkProvider>
    </html>
  )
}