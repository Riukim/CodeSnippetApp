import type { Metadata } from "next"
import { Recursive } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import GlobalContextProvider from "@/ContextApi"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/sonner"

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
    <html
      lang="en"
      suppressHydrationWarning
    >
      <ClerkProvider
        appearance={{ baseTheme: dark }}
      >
        <GlobalContextProvider>
          <body className={`${recursive.className}`}>
            <ThemeProvider
              defaultTheme="light"
              attribute="class"
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </body>
        </GlobalContextProvider>
      </ClerkProvider>
    </html>
  )
}
