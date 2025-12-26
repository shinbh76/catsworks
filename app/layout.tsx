import type { Metadata } from "next";
import { asiaGothic } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "CatsWorks Admin",
  description: "CatsWorks Admin UI",
  icons: {
    icon: "/logo/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${asiaGothic.variable} font-asia antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
