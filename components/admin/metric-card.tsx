"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone?: "blue" | "emerald" | "amber" | "rose" | "slate";
}

const toneStyles = {
  blue: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  rose: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  slate: "bg-slate-500/10 text-slate-700 dark:text-slate-300",
};

export function MetricCard({ title, value, detail, icon: Icon, tone = "slate" }: MetricCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        <div className={cn("flex size-10 items-center justify-center rounded-lg", toneStyles[tone])}>
          <Icon className="size-5" />
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}
