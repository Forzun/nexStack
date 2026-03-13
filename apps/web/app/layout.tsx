import { Geist, Geist_Mono, Hanken_Grotesk } from "next/font/google"
import "@workspace/ui/globals.css"
import { TooltipProvider } from "@workspace/ui/components/tooltip";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { ViewTransitions } from "next-view-transitions";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${hankenGrotesk.className} antialiased `}
        >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
          <ViewTransitions>  
          <TooltipProvider>
            <Toaster theme="system" />
            {children}
          </TooltipProvider>
        </ViewTransitions>
        </ThemeProvider>
      </body>
    </html>
  )
}