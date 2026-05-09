"use client";

import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreHorizontal,
  ArrowUpDown,
  History
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const rentals = [
  { id: "R-5001", customer: "Sarah Jenkins", product: "Silk Evening Gown", period: "May 05 - May 08", status: "Active", returned: false },
  { id: "R-5002", customer: "Michael Chen", product: "Wool Tailored Suit", period: "May 06 - May 10", status: "Overdue", returned: false },
  { id: "R-5003", customer: "Elena Rodriguez", product: "Designer Handbag", period: "Apr 28 - May 02", status: "Returned", returned: true },
  { id: "R-5004", customer: "James Wilson", product: "Leather Jacket", period: "May 07 - May 14", status: "Pending Pickup", returned: false },
];

export default function RentalsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Rental Tracking</h1>
          <p className="text-muted-foreground mt-1">Monitor active bookings, returns, and overdue items.</p>
        </div>
        <div className="flex items-center space-x-3">
           <Button variant="outline" className="rounded-xl h-11">
              <History className="mr-2 h-4 w-4" />
              Rental History
           </Button>
           <Button className="rounded-xl h-11 shadow-lg shadow-primary/20">
              <Plus className="mr-2 h-4 w-4" />
              New Booking
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Now", value: "142", icon: Clock, color: "text-primary" },
          { label: "Due Today", value: "12", icon: Calendar, color: "text-blue-500" },
          { label: "Overdue", value: "5", icon: AlertCircle, color: "text-rose-500" },
          { label: "Total Returned", value: "2.4k", icon: CheckCircle2, color: "text-emerald-500" },
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
                <Input placeholder="Search rentals by product or customer..." className="pl-10 rounded-xl" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
               <Button variant="outline" size="sm" className="rounded-lg">
                 <Filter className="mr-2 h-3 w-3" /> Filter
               </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Rental Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rentals.map((rental) => (
                <TableRow key={rental.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                  <TableCell className="pl-6 font-mono text-xs">{rental.id}</TableCell>
                  <TableCell className="font-medium">{rental.customer}</TableCell>
                  <TableCell>{rental.product}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{rental.period}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "rounded-lg px-2.5 py-0.5 font-medium",
                        rental.status === "Active" && "bg-blue-500/10 text-blue-600",
                        rental.status === "Overdue" && "bg-rose-500/10 text-rose-600",
                        rental.status === "Returned" && "bg-emerald-500/10 text-emerald-600",
                        rental.status === "Pending Pickup" && "bg-amber-500/10 text-amber-600"
                      )}
                    >
                      {rental.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl">
                        <DropdownMenuItem className="cursor-pointer">
                          <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Returned
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Calendar className="mr-2 h-4 w-4" /> Extend Period
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-rose-500">
                          <AlertCircle className="mr-2 h-4 w-4" /> Report Issue
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
