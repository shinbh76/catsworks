export type ProductStockRow = {
  id: string;
  name: string;
  category: string;
  price: number;
  piece: number;
  colors: { name: string; hex: string }[];
};

export const PRODUCT_STOCK_ROWS: ProductStockRow[] = [
  {
    id: "P-10021",
    name: "Minimal Crochet Punching Dress",
    category: "Dress",
    price: 25900,
    piece: 128,
    colors: [
      { name: "Ivory", hex: "#F5F0E6" },
      { name: "Black", hex: "#1F2937" },
      { name: "Teal", hex: "#3EB991" },
    ],
  },
  {
    id: "P-10022",
    name: "Basic Triangle Tee",
    category: "Top",
    price: 12900,
    piece: 342,
    colors: [
      { name: "Black", hex: "#111827" },
      { name: "Gray", hex: "#9CA3AF" },
    ],
  },
  {
    id: "P-10023",
    name: "Wide Pants (Modern Fit)",
    category: "Bottom",
    price: 31900,
    piece: 76,
    colors: [
      { name: "Off-white", hex: "#F8FAFC" },
      { name: "Charcoal", hex: "#334155" },
    ],
  },
  {
    id: "P-10024",
    name: "Stripe Minimal Tee",
    category: "Top",
    price: 9900,
    piece: 510,
    colors: [
      { name: "Navy", hex: "#1E3A8A" },
      { name: "White", hex: "#FFFFFF" },
    ],
  },
  {
    id: "P-10025",
    name: "Light Outer Jacket",
    category: "Outer",
    price: 49900,
    piece: 24,
    colors: [
      { name: "Charcoal", hex: "#0F172A" },
      { name: "Beige", hex: "#E7D8C9" },
      { name: "Khaki", hex: "#7C8A5A" },
    ],
  },
];


