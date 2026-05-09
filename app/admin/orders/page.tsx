"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  Download, 
  MoreHorizontal, 
  Eye, 
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  Edit
} from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMockStore, Order } from "@/src/store/useMockStore";
import { OrderModal } from "@/components/modals/OrderModal";
import { toast } from "sonner";

export default function OrdersPage() {
  const { orders, deleteOrder } = useMockStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Search filter
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [orders, searchQuery]);

  const handleAddOrder = () => {
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleDeleteOrder = (id: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      deleteOrder(id);
      toast.success("Order deleted successfully");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Orders & Bookings</h1>
          <p className="text-muted-foreground mt-1">Track all sales, rentals, and customer transactions.</p>
        </div>
        <div className="flex items-center space-x-3">
           <Button variant="outline" className="rounded-xl h-11" onClick={() => toast.success("Export started!")}>
              <Download className="mr-2 h-4 w-4" />
              Export
           </Button>
           <Button className="rounded-xl h-11 shadow-lg shadow-primary/20" onClick={handleAddOrder}>
              <Plus className="mr-2 h-4 w-4" />
              Create Order
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: orders.length.toString(), icon: CheckCircle2, color: "text-primary" },
          { label: "Completed", value: orders.filter(o => o.status === "Completed").length.toString(), icon: Clock, color: "text-amber-500" },
          { label: "Pending", value: orders.filter(o => o.status === "Pending").length.toString(), icon: AlertCircle, color: "text-rose-500" },
          { label: "Revenue", value: "$" + orders.reduce((acc, o) => acc + o.totalAmount, 0).toLocaleString(), icon: CheckCircle2, color: "text-emerald-500" },
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
                <Input 
                  placeholder="Search by ID, customer..." 
                  className="pl-10 rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                  <TableCell className="pl-6 font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{order.date}</TableCell>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditOrder(order)}>
                          <Edit className="mr-2 h-4 w-4 text-blue-500" /> Edit Order
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-rose-500 focus:text-rose-500 focus:bg-rose-50" onClick={() => handleDeleteOrder(order.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <OrderModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        order={selectedOrder} 
      />
    </div>
  );
}
