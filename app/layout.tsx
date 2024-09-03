import GlobalContextProvider from "@/ContextApi"
import ClerkThemeProvider from "@/components/ClerkThemeProvider"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import { Recursive } from "next/font/google"
import "./globals.css"

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
      <body className={`${recursive.className}`}>
        <ThemeProvider
          defaultTheme="dark"
          attribute="class"
        >
          <ClerkThemeProvider>
            <GlobalContextProvider>
              {children}
              <Toaster />
            </GlobalContextProvider>
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
