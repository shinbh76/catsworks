"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PageAction {
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  onClick?: () => void;
}

interface PageHeaderProps {
  title: string;
  actions?: PageAction[];
}

export function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-asia-bold">{title}</h1>
      {actions && actions.length > 0 && (
        <div className="flex items-center gap-2">
          <TooltipProvider>
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={action.onClick}
                      className="font-asia-medium"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                      <span className="ml-2">{action.label}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-asia-light">{action.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
