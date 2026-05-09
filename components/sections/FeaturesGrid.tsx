"use client";

import { SectionWrapper } from "@/components/layout/PageWrapper";
import { 
  BarChart3, 
  Calendar, 
  Package, 
  Users2, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  Layout 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    title: "Inventory Management",
    description: "Track every item in your collection with real-time stock updates and automated alerts.",
    icon: Package,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Rental Bookings",
    description: "Advanced calendar system for managing cloth rentals, return dates, and late fees.",
    icon: Calendar,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Sales Analytics",
    description: "Deep insights into your best-performing products and seasonal sales trends.",
    icon: BarChart3,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "User Permissions",
    description: "Role-based access control for admins, staff, and customers to ensure security.",
    icon: Users2,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Automated Billing",
    description: "Subscription-based billing models and automated invoicing for wholesale clients.",
    icon: CreditCard,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    title: "Custom Dashboards",
    description: "Personalize your workspace with drag-and-drop widgets and custom reporting.",
    icon: Layout,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

export function FeaturesGrid() {
  return (
    <SectionWrapper className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold">Powerful Features for Modern Business</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Everything you need to scale your fashion enterprise in a single, unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-950">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-heading font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
