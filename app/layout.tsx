import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { asiaGothic } from "./fonts";
import { AppProviders } from "@/components/providers/app-providers";
import { AppShell } from "@/components/shell/app-shell";

export const metadata: Metadata = {
  title: "CatsWorks Admin",
  description: "CatsWorks Admin UI (DashStack-inspired)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${asiaGothic.variable} font-sans antialiased`}>
        <Script id="catsworks-theme-init" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var raw = window.localStorage.getItem("catsworks-theme");
                var theme = raw ? JSON.parse(raw) : "light";
                if (theme !== "dark" && theme !== "light") theme = "light";
                var root = document.documentElement;
                if (theme === "dark") root.classList.add("dark");
                else root.classList.remove("dark");
              } catch (e) {}
            })();
          `}
        </Script>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
