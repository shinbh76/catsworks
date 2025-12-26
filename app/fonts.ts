import localFont from "next/font/local";

// 폰트 파일이 없어도 작동하도록 fallback 설정
const fontOptions = {
  variable: "",
  display: "swap" as const,
  fallback: ["system-ui", "sans-serif"],
};

export const asiaGothicLight = localFont({
  src: [
    {
      path: "../fonts/a-asiagothic-light.woff2",
      weight: "300",
    },
  ],
  weight: "300",
  variable: "--font-asia-light",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const asiaGothicMedium = localFont({
  src: [
    {
      path: "../fonts/a-asiagothic-medium.woff2",
      weight: "500",
    },
  ],
  weight: "500",
  variable: "--font-asia-medium",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const asiaGothicBold = localFont({
  src: [
    {
      path: "../fonts/a-asiagothic-bold.woff2",
      weight: "700",
    },
  ],
  weight: "700",
  variable: "--font-asia-bold",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const asiaGothicExtraBold = localFont({
  src: [
    {
      path: "../fonts/a-asiagothic-extrabold.woff2",
      weight: "800",
    },
  ],
  weight: "800",
  variable: "--font-asia-extrabold",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
