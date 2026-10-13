import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asiftauhid.me"),
  title: {
    default: "Asif Shahriar Tauhid — Full Stack Developer",
    template: "%s | Asif Shahriar Tauhid",
  },
  description:
    "Portfolio of Asif Shahriar Tauhid: Full Stack Developer specializing in scalable systems, modern React / Next.js web platforms, and PostgreSQL backend architecture.",
  keywords: [
    "Asif Shahriar Tauhid",
    "Asif Tauhid",
    "Full Stack Developer",
    "Software Engineer",
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "asiftauhid.me",
  ],
  authors: [{ name: "Asif Shahriar Tauhid", url: "https://asiftauhid.me" }],
  creator: "Asif Shahriar Tauhid",
  alternates: {
    canonical: "https://asiftauhid.me",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asiftauhid.me",
    siteName: "Asif Shahriar Tauhid — Portfolio",
    title: "Asif Shahriar Tauhid — Full Stack Developer",
    description:
      "Full Stack Developer building scalable, user-focused applications with Next.js, React, Node.js, and PostgreSQL.",
    images: [
      {
        url: "https://i.ibb.co.com/N6hpS06K/Gemini-Generated-Image-og2dtnog2dtnog2d.webp",
        width: 1200,
        height: 630,
        alt: "Asif Shahriar Tauhid — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asif Shahriar Tauhid — Full Stack Developer",
    description:
      "Full Stack Developer building scalable, user-focused applications with Next.js, React, Node.js, and PostgreSQL.",
    creator: "@monkeyluffy003b",
    images: ["https://i.ibb.co.com/N6hpS06K/Gemini-Generated-Image-og2dtnog2dtnog2d.webp"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22 font-family=%22sans-serif%22 font-weight=%22bold%22 fill=%22%232563eb%22>AT</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-neutral-800 dark:text-neutral-200 selection:bg-neutral-200 dark:selection:bg-neutral-800 transition-colors duration-200 relative`}
      >
        <div className="fixed inset-0 bg-dot-pattern pointer-events-none z-0 opacity-80" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={150}>
            <div className="relative z-10 flex min-h-screen flex-col">
              {children}
            </div>
            <Toaster richColors position="top-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
