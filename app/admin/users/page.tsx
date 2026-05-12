"use client";

import { useMemo, useState } from "react";
import { Download, Edit, MoreHorizontal, Search, Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { CustomerModal } from "@/components/modals/CustomerModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { formatCurrency, type Customer, useMockStore } from "@/src/store/useMockStore";

export default function UsersPage() {
  const { customers, deleteCustomer } = useMockStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        customer.id.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customers, searchQuery, statusFilter]);

  const handleDeleteCustomer = (id: string) => {
    if (confirm("Delete this mock customer profile?")) {
      deleteCustomer(id);
      toast.success("Customer deleted");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <PageHeader
        eyebrow="Customers app"
        title="Customer Management"
        description="Customer profiles with GST numbers, addresses, invoice history, rental activity, search, filters, and frontend-only edit flows."
        actions={
          <>
            <Button variant="outline" className="h-10" onClick={() => toast.success("Mock customer export queued")}>
              <Download className="mr-2 size-4" />
              Export
            </Button>
            <Button className="h-10" onClick={() => { setSelectedCustomer(null); setIsModalOpen(true); }}>
              <UserPlus className="mr-2 size-4" />
              Add Customer
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          ["Total Customers", customers.length.toString()],
          ["Active Customers", customers.filter((customer) => customer.status === "active").length.toString()],
          ["Lifetime Value", formatCurrency(customers.reduce((sum, customer) => sum + customer.totalSpent, 0))],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardContent className="p-4">
              <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
              <p className="mt-2 text-2xl font-semibold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative max-w-xl flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search customer, email, phone"
                className="h-10 pl-9"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-10 rounded-lg border bg-background px-3 text-sm"
            >
              <option value="all">All customers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>GST</TableHead>
                  <TableHead>Active Rentals</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                            {customer.name.split(" ").map((part) => part[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{customer.name}</div>
                          <div className="text-xs text-muted-foreground">{customer.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>{customer.phone}</div>
                      <div className="text-muted-foreground">{customer.email}</div>
                    </TableCell>
                    <TableCell className="text-sm">{customer.gstNo || "Consumer"}</TableCell>
                    <TableCell>{customer.activeRentals}</TableCell>
                    <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
                    <TableCell><StatusBadge status={customer.status} /></TableCell>
                    <TableCell className="pr-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { setSelectedCustomer(customer); setIsModalOpen(true); }}>
                            <Edit className="mr-2 size-4 text-blue-600" />
                            Edit customer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-rose-600" onClick={() => handleDeleteCustomer(customer.id)}>
                            <Trash2 className="mr-2 size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                      No customers match the current filters.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CustomerModal key={selectedCustomer?.id ?? "new-customer"} open={isModalOpen} onOpenChange={setIsModalOpen} customer={selectedCustomer} />
    </div>
  );
}
