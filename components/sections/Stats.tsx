"use client";

import { SectionWrapper } from "@/components/layout/PageWrapper";
import { Users, ShoppingBag, Globe, Award } from "lucide-react";

const stats = [
  { label: "Active Users", value: "10,000+", icon: Users },
  { label: "Orders Processed", value: "2M+", icon: ShoppingBag },
  { label: "Countries Supported", value: "50+", icon: Globe },
  { label: "Awards Won", value: "15+", icon: Award },
];

export function Stats() {
  return (
    <SectionWrapper className="py-12 bg-white dark:bg-slate-900/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-2">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-slate-100">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
