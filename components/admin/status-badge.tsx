"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  active: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  inactive: "bg-slate-500/10 text-slate-700 dark:text-slate-300",
  low_stock: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  out_of_stock: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  paid: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  pending: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  failed: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  completed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  processing: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  cancelled: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  upcoming: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  overdue: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
};

const statusLabels: Record<string, string> = {
  active: "Active",
  inactive: "Inactive",
  low_stock: "Low Stock",
  out_of_stock: "Out of Stock",
  paid: "Paid",
  pending: "Pending",
  failed: "Failed",
  completed: "Completed",
  processing: "Processing",
  cancelled: "Cancelled",
  upcoming: "Upcoming",
  overdue: "Overdue",
  success: "Success",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-md border-transparent px-2 py-0.5 text-xs font-semibold",
        statusStyles[status] ?? "bg-slate-500/10 text-slate-700",
        className
      )}
    >
      {statusLabels[status] ?? status}
    </Badge>
  );
}
