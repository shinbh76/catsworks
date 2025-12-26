import localFont from "next/font/local";

export const asiaGothic = localFont({
  src: [
    {
      path: "../fonts/a-asiagothic-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/a-asiagothic-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/a-asiagothic-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/a-asiagothic-extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-asia",
});

