"use client";

import React from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { useSidebar } from "@/lib/contexts/sidebar-context";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300 ease-in-out",
          collapsed ? "ml-[62px]" : "ml-[205px]"
        )}
      >
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
