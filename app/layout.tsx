import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aetheris | Premium Student Learning Dashboard",
  description: "Next-generation production-ready learning management metrics dashboard constructed with Next.js, Framer Motion, and Supabase.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark select-none`}>
      <body className="bg-background text-zinc-100 antialiased min-h-screen relative overflow-x-hidden pb-16 md:pb-0">
        {/* Futuristic background glows (GPU accelerated) */}
        <div className="ambient-mesh" aria-hidden="true" />
        
        {children}
      </body>
    </html>
  );
}
