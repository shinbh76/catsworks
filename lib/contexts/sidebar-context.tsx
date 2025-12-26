"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsedState] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved === "true") {
      setCollapsedState(true);
    }
  }, []);

  const setCollapsed = (newCollapsed: boolean) => {
    setCollapsedState(newCollapsed);
    localStorage.setItem("sidebar-collapsed", String(newCollapsed));
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}
