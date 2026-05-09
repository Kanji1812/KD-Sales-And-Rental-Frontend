"use client";

import { useState, useMemo } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  UserPlus,
  Mail,
  Shield,
  Trash2,
  Edit,
  ArrowUpDown
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMockStore, Customer } from "@/src/store/useMockStore";
import { CustomerModal } from "@/components/modals/CustomerModal";
import { toast } from "sonner";

export default function UsersPage() {
  const { customers, deleteCustomer } = useMockStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Search filter
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [customers, searchQuery]);

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(id);
      toast.success("Customer deleted successfully");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Customer Management</h1>
          <p className="text-muted-foreground mt-1">Manage your customer database and view their history.</p>
        </div>
        <div className="flex items-center space-x-3">
           <Button variant="outline" className="rounded-xl h-11" onClick={() => toast.success("Export started!")}>
              <Download className="mr-2 h-4 w-4" />
              Export
           </Button>
           <Button className="rounded-xl h-11 shadow-lg shadow-primary/20" onClick={handleAddCustomer}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Customer
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Customers", value: customers.length.toString(), icon: Shield, color: "text-primary" },
          { label: "Active Now", value: customers.filter(c => c.status === "Active").length.toString(), icon: Mail, color: "text-emerald-500" },
          { label: "Inactive", value: customers.filter(c => c.status === "Inactive").length.toString(), icon: UserPlus, color: "text-amber-500" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className={cn("w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center", stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
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
                  placeholder="Search by name, email..." 
                  className="pl-10 rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
               <span className="text-sm text-muted-foreground">Showing {filteredCustomers.length} customers</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/10">
                        <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-sm leading-none">{customer.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{customer.phone}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "rounded-lg px-2.5 py-0.5 font-medium border-transparent",
                        customer.status === "Active" && "bg-emerald-500/10 text-emerald-600",
                        customer.status === "Inactive" && "bg-slate-500/10 text-slate-600"
                      )}
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">${customer.totalSpent}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{customer.joinDate}</TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditCustomer(customer)}>
                          <Edit className="mr-2 h-4 w-4 text-blue-500" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-rose-500 focus:text-rose-500 focus:bg-rose-50" onClick={() => handleDeleteCustomer(customer.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No customers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CustomerModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        customer={selectedCustomer} 
      />
    </div>
  );
}
