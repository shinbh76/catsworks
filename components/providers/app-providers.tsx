"use client";

import * as React from "react";
import { AppUiProvider } from "./app-ui-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <AppUiProvider>{children}</AppUiProvider>;
}


