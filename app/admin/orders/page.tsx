"use client";

import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Eye, 
  ArrowUpDown,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const orders = [
  { id: "#ORD-9901", customer: "Sarah Jenkins", date: "May 05, 2026", total: "$120.00", type: "Rental", status: "Completed" },
  { id: "#ORD-9902", customer: "Michael Chen", date: "May 06, 2026", total: "$250.00", type: "Sale", status: "Pending" },
  { id: "#ORD-9903", customer: "Elena Rodriguez", date: "May 06, 2026", total: "$85.00", type: "Rental", status: "Processing" },
  { id: "#ORD-9904", customer: "James Wilson", date: "May 07, 2026", total: "$195.00", type: "Sale", status: "Completed" },
  { id: "#ORD-9905", customer: "Olivia Brown", date: "May 07, 2026", total: "$310.00", type: "Rental", status: "Shipped" },
  { id: "#ORD-9906", customer: "Daniel Smith", date: "May 07, 2026", total: "$45.00", type: "Sale", status: "Cancelled" },
];

export function OrdersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Orders & Bookings</h1>
          <p className="text-muted-foreground mt-1">Track all sales, rentals, and customer transactions.</p>
        </div>
        <div className="flex items-center space-x-3">
           <Button variant="outline" className="rounded-xl h-11">
              <Calendar className="mr-2 h-4 w-4" />
              Filter by Date
           </Button>
           <Button variant="outline" className="rounded-xl h-11">
              <Download className="mr-2 h-4 w-4" />
              Export
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: "1,245", icon: CheckCircle2, color: "text-primary" },
          { label: "Active Rentals", value: "432", icon: Clock, color: "text-amber-500" },
          { label: "Pending Sales", value: "12", icon: AlertCircle, color: "text-rose-500" },
          { label: "Revenue today", value: "$1,840", icon: CheckCircle2, color: "text-emerald-500" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className={cn("w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="p-6 border-b bg-white/50 dark:bg-slate-900/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-2 w-full md:w-96">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by ID, customer..." className="pl-10 rounded-xl" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
               <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest">Recent First</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                  <TableCell className="pl-6 font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{order.date}</TableCell>
                  <TableCell className="font-bold">{order.total}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-lg">{order.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "rounded-lg px-2.5 py-0.5 font-medium",
                        order.status === "Completed" && "bg-emerald-500/10 text-emerald-600",
                        order.status === "Pending" && "bg-amber-500/10 text-amber-600",
                        order.status === "Processing" && "bg-blue-500/10 text-blue-600",
                        order.status === "Shipped" && "bg-indigo-500/10 text-indigo-600",
                        order.status === "Cancelled" && "bg-rose-500/10 text-rose-600"
                      )}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrdersPage;
