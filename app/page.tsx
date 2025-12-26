import { redirect } from "next/navigation";

export default function Home() {
  // Root route → dashboard
  // (AppShell은 layout.tsx에서 공통 적용)
  redirect("/dashboard");
}
