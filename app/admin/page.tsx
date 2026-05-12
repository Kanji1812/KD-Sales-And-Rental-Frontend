"use client";

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  CalendarDays,
  IndianRupee,
  PackageCheck,
  Plus,
  ReceiptText,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MetricCard } from "@/components/admin/metric-card";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatCurrency, useMockStore } from "@/src/store/useMockStore";

export default function AdminDashboard() {
  const { products, orders, rentals, activityLogs, dashboardData } = useMockStore();
  const totalRevenue = orders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + order.totalAmount, 0);
  const blockedStock = products.reduce(
    (sum, product) => sum + product.rentedQty + product.washingQty + product.reservedQty,
    0
  );
  const overdueRentals = rentals.filter((rental) => rental.status === "overdue");

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <PageHeader
        eyebrow="KD Sales & Rental"
        title="Enterprise Command Center"
        description="Frontend-only ERP cockpit aligned with catalog, inventory, customers, sales, rentals, billing, subscriptions, and reports modules."
        actions={
          <>
            <Link href="/admin/rentals">
              <Button variant="outline" className="h-10">
                <CalendarDays className="mr-2 size-4" />
                New Rental
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button className="h-10">
                <Plus className="mr-2 size-4" />
                Create Invoice
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Collected Revenue"
          value={formatCurrency(totalRevenue)}
          detail={`${dashboardData.stats.totalRevenueTrend} versus last month`}
          icon={IndianRupee}
          tone="emerald"
        />
        <MetricCard
          title="Sales Invoices"
          value={orders.length.toString()}
          detail={`${orders.filter((order) => order.paymentStatus === "pending").length} awaiting payment`}
          icon={ReceiptText}
          tone="blue"
        />
        <MetricCard
          title="Rental Pipeline"
          value={rentals.filter((rental) => rental.status === "active").length.toString()}
          detail={`${overdueRentals.length} overdue return needs attention`}
          icon={CalendarDays}
          tone={overdueRentals.length ? "rose" : "emerald"}
        />
        <MetricCard
          title="Inventory Blocked"
          value={blockedStock.toString()}
          detail="Rented, washing, and reserved pieces"
          icon={PackageCheck}
          tone="amber"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Sales, rental, and subscription income by month.</CardDescription>
            </div>
            <Activity className="size-5 text-emerald-600" />
          </CardHeader>
          <CardContent className="h-[330px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardData.revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${Number(value) / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Area type="monotone" dataKey="sales" stackId="1" stroke="#2563eb" fill="#bfdbfe" />
                <Area type="monotone" dataKey="rentals" stackId="1" stroke="#059669" fill="#bbf7d0" />
                <Area type="monotone" dataKey="subscriptions" stackId="1" stroke="#d97706" fill="#fde68a" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Health</CardTitle>
            <CardDescription>Available stock by backend catalog category.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {dashboardData.inventorySummary.map((category) => {
              const availablePercent = Math.round((category.available / category.count) * 100);
              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-muted-foreground">{category.available}/{category.count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className={category.color} style={{ width: `${availablePercent}%`, height: "100%" }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent Sales Invoices</CardTitle>
            <CardDescription>GST billing and payment status from the sales module.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="pl-6 font-mono text-xs">{order.invoiceNumber}</TableCell>
                    <TableCell className="font-medium">{order.customerName}</TableCell>
                    <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                    <TableCell><StatusBadge status={order.paymentStatus} /></TableCell>
                    <TableCell><StatusBadge status={order.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational Feed</CardTitle>
            <CardDescription>Activity tracking aligned with user_activity_logs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activityLogs.map((log) => (
              <div key={log.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{log.moduleName}</p>
                  <StatusBadge status={log.status} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{log.description}</p>
                <p className="mt-2 text-xs text-muted-foreground">{log.createdAt}</p>
              </div>
            ))}
            {overdueRentals.length > 0 ? (
              <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                <AlertTriangle className="size-4" />
                {overdueRentals.length} rental return requires follow-up.
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
