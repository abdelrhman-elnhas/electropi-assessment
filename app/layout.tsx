import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import NextAuthProvider from "./providers/NextAuthProvider";
import { QueryClientWrapper } from "@/components/QueryClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AE Ecommerce",
  description: "AE Ecommerce Website built with Next.js, TypeScript, Tailwind CSS, and NextAuth.js for authentication.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Providers>
          <NextAuthProvider>
            <QueryClientWrapper>
              {children}
            </QueryClientWrapper>
          </NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}