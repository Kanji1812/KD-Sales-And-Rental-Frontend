"use client";

import { StatCard } from "@/components/ui/StatCard";
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  Calendar as CalendarIcon,
  ChevronRight,
  MoreVertical,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from "recharts";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useMockStore } from "@/src/store/useMockStore";
import Link from "next/link";

export default function AdminDashboard() {
  const { dashboardData, orders, rentals, customers } = useMockStore();

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-3">
           <Button variant="outline" className="rounded-xl h-11">
              <CalendarIcon className="mr-2 h-4 w-4" />
              This Month
           </Button>
           <Link href="/admin/orders">
             <Button className="rounded-xl h-11 shadow-lg shadow-primary/20">
                <Plus className="mr-2 h-4 w-4" />
                New Order
             </Button>
           </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={dashboardData.stats.totalRevenue} 
          trend={dashboardData.stats.totalRevenueTrend} 
          isPositive={true} 
          icon={DollarSign} 
        />
        <StatCard 
          title="Total Orders" 
          value={orders.length.toString()} 
          trend={dashboardData.stats.totalOrdersTrend} 
          isPositive={true} 
          icon={ShoppingCart} 
        />
        <StatCard 
          title="Active Rentals" 
          value={rentals.filter(r => r.status === "Active").length.toString()} 
          trend={dashboardData.stats.activeRentalsTrend} 
          isPositive={false} 
          icon={CalendarIcon} 
        />
        <StatCard 
          title="Total Customers" 
          value={customers.length.toString()} 
          trend={dashboardData.stats.totalCustomersTrend} 
          isPositive={true} 
          icon={Users} 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-md overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Revenue Analytics</CardTitle>
              <CardDescription>Monthly revenue growth and projections.</CardDescription>
            </div>
            <TrendingUp className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardData.revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: 'white'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">Inventory Summary</CardTitle>
            <CardDescription>Top performing categories.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            {dashboardData.inventorySummary.map((cat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{cat.name}</span>
                  <span className="text-muted-foreground">{cat.count} items</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full", cat.color)} 
                    style={{ width: `${(cat.count / 500) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-xs text-primary font-bold uppercase tracking-widest mt-4">
              View Detailed Report
              <ChevronRight className="ml-2 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Recent Orders</CardTitle>
            <CardDescription>Latest transactions across your platform.</CardDescription>
          </div>
          <Link href="/admin/orders">
            <Button variant="outline" size="sm" className="rounded-lg">View All</Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
              <TableRow>
                <TableHead className="pl-6">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                  <TableCell className="pl-6 font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell className="font-bold">${order.totalAmount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-lg">{order.paymentMethod}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "rounded-lg px-2.5 py-0.5 font-medium border-transparent",
                        order.status === "Completed" && "bg-emerald-500/10 text-emerald-600",
                        order.status === "Pending" && "bg-amber-500/10 text-amber-600",
                        order.status === "Processing" && "bg-blue-500/10 text-blue-600",
                        order.status === "Cancelled" && "bg-rose-500/10 text-rose-600"
                      )}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {recentOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-16 text-center text-muted-foreground">
                    No recent orders.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
