"use client";

import { SectionWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Basic",
    price: "$49",
    description: "Perfect for small boutiques starting their digital journey.",
    features: [
      "Up to 500 Inventory Items",
      "Basic Rental Tracking",
      "Email Support",
      "Sales Reports",
      "Single User",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: "$149",
    description: "Ideal for growing retailers with multiple staff members.",
    features: [
      "Unlimited Inventory Items",
      "Advanced Rental Management",
      "Priority Email Support",
      "Detailed Analytics Dashboard",
      "Up to 10 Users",
      "Bulk Inventory Import",
    ],
    cta: "Go Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large-scale fashion enterprises.",
    features: [
      "Custom Feature Development",
      "Dedicated Account Manager",
      "24/7 Phone Support",
      "Unlimited Users",
      "Multi-store Sync",
      "API Access",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingPreview() {
  return (
    <SectionWrapper className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose the plan that fits your business needs. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col p-8 rounded-3xl bg-white dark:bg-slate-950 border transition-all duration-300 relative",
                plan.popular ? "border-primary shadow-2xl scale-105 z-10" : "border-slate-200 shadow-lg"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-heading font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start space-x-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href={plan.name === "Enterprise" ? "/contact" : "/register"}>
                <Button 
                  className="w-full rounded-xl h-12 text-base" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
