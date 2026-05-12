"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Edit, History, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { RentalModal } from "@/components/modals/RentalModal";
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
import { formatCurrency, type Rental, useMockStore } from "@/src/store/useMockStore";

export default function RentalsPage() {
  const { rentals, deleteRental, updateRental } = useMockStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);

  const filteredRentals = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return rentals.filter((rental) => {
      const matchesSearch =
        rental.rentalNumber.toLowerCase().includes(query) ||
        rental.customerName.toLowerCase().includes(query) ||
        rental.productName.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || rental.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [rentals, searchQuery, statusFilter]);

  const handleDeleteRental = (id: string) => {
    if (confirm("Delete this mock rental booking?")) {
      deleteRental(id);
      toast.success("Rental booking deleted");
    }
  };

  const handleMarkReturned = (rental: Rental) => {
    updateRental(rental.id, {
      status: "completed",
      returnDate: new Date().toISOString().split("T")[0],
      paymentStatus: "paid",
    });
    toast.success("Rental marked as returned");
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <PageHeader
        eyebrow="Rentals app"
        title="Rental Tracking"
        description="Manage rental bookings, deposits, return status, late fees, and frontend-only return workflows without real API mutations."
        actions={
          <>
            <Button variant="outline" className="h-10" onClick={() => toast.success("Rental audit timeline opened")}>
              <History className="mr-2 size-4" />
              Audit Trail
            </Button>
            <Button className="h-10" onClick={() => { setSelectedRental(null); setIsModalOpen(true); }}>
              <Plus className="mr-2 size-4" />
              Create Rental
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          ["Active", rentals.filter((rental) => rental.status === "active").length],
          ["Upcoming", rentals.filter((rental) => rental.status === "upcoming").length],
          ["Overdue", rentals.filter((rental) => rental.status === "overdue").length],
          ["Deposits Held", formatCurrency(rentals.filter((rental) => rental.status !== "completed").reduce((sum, rental) => sum + rental.deposit, 0))],
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
                placeholder="Search rental no, customer, product"
                className="h-10 pl-9"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-10 rounded-lg border bg-background px-3 text-sm"
            >
              <option value="all">All statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="overdue">Overdue</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Rental</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Deposit</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRentals.map((rental) => (
                  <TableRow key={rental.id}>
                    <TableCell className="pl-6">
                      <div className="font-mono text-xs">{rental.rentalNumber}</div>
                      <div className="text-xs text-muted-foreground">{rental.paymentStatus}</div>
                    </TableCell>
                    <TableCell className="font-medium">{rental.customerName}</TableCell>
                    <TableCell>{rental.productName}</TableCell>
                    <TableCell className="text-sm">
                      <div>{rental.startDate}</div>
                      <div className="text-muted-foreground">to {rental.endDate}</div>
                    </TableCell>
                    <TableCell>{formatCurrency(rental.deposit)}</TableCell>
                    <TableCell>
                      <div className="font-semibold">{formatCurrency(rental.totalCost)}</div>
                      {rental.lateFee ? <div className="text-xs text-rose-600">Late fee {formatCurrency(rental.lateFee)}</div> : null}
                    </TableCell>
                    <TableCell><StatusBadge status={rental.status} /></TableCell>
                    <TableCell className="pr-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {rental.status !== "completed" ? (
                            <DropdownMenuItem onClick={() => handleMarkReturned(rental)}>
                              <CheckCircle2 className="mr-2 size-4 text-emerald-600" />
                              Mark returned
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuItem onClick={() => { setSelectedRental(rental); setIsModalOpen(true); }}>
                            <Edit className="mr-2 size-4 text-blue-600" />
                            Edit rental
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-rose-600" onClick={() => handleDeleteRental(rental.id)}>
                            <Trash2 className="mr-2 size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredRentals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                      No rental bookings match the current filters.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <RentalModal key={selectedRental?.id ?? "new-rental"} open={isModalOpen} onOpenChange={setIsModalOpen} rental={selectedRental} />
    </div>
  );
}
