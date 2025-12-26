import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  asiaGothicLight,
  asiaGothicMedium,
  asiaGothicBold,
  asiaGothicExtraBold,
} from "./fonts";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import { I18nProvider } from "@/lib/contexts/i18n-context";
import { SidebarProvider } from "@/lib/contexts/sidebar-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CatsWorks Admin",
  description: "CatsWorks Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${asiaGothicLight.variable} ${asiaGothicMedium.variable} ${asiaGothicBold.variable} ${asiaGothicExtraBold.variable} antialiased`}
      >
        <ThemeProvider>
          <I18nProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
