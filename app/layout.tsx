import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CatsWorks Admin",
  description: "CatsWorks 관리자 대시보드",
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
      <body className="font-asia-light antialiased">
        {children}
      </body>
    </html>
  );
}
