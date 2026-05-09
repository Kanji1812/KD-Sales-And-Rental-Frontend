"use client";

import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { cn } from "@/lib/utils";

const salesData = [
  { name: "Week 1", sales: 4000, rentals: 2400 },
  { name: "Week 2", sales: 3000, rentals: 1398 },
  { name: "Week 3", sales: 2000, rentals: 9800 },
  { name: "Week 4", sales: 2780, rentals: 3908 },
];

const categoryData = [
  { name: "Gowns", value: 400 },
  { name: "Suits", value: 300 },
  { name: "Accessories", value: 300 },
  { name: "Shoes", value: 200 },
];

const COLORS = ["#6366f1", "#8b5cf6", "#10b981", "#f59e0b"];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Business Reports</h1>
          <p className="text-muted-foreground mt-1">Deep dive into your sales, rentals, and inventory analytics.</p>
        </div>
        <div className="flex items-center space-x-3">
           <Button variant="outline" className="rounded-xl h-11">
              <Calendar className="mr-2 h-4 w-4" />
              Custom Range
           </Button>
           <Button className="rounded-xl h-11 shadow-lg shadow-primary/20">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Net Revenue", value: "$42,500", growth: "+12%", up: true },
          { label: "Avg. Order Value", value: "$185", growth: "+5%", up: true },
          { label: "Return Rate", value: "98%", growth: "+2%", up: true },
          { label: "Churn Rate", value: "1.2%", growth: "-0.5%", up: false },
        ].map((item, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
              <div className="flex items-end justify-between mt-2">
                <h3 className="text-2xl font-bold">{item.value}</h3>
                <span className={cn(
                  "text-xs font-bold px-2 py-1 rounded-lg",
                  item.up ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                )}>
                  {item.growth}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Sales vs Rentals</CardTitle>
            <CardDescription>Comparison of revenue streams over the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rentals" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Revenue by Category</CardTitle>
            <CardDescription>Distribution of income across product types.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
