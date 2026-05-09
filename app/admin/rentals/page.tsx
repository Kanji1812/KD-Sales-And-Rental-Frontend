"use client";

import { useState, useMemo } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreHorizontal,
  History,
  Edit,
  Trash2
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
import { useMockStore, Rental } from "@/src/store/useMockStore";
import { RentalModal } from "@/components/modals/RentalModal";
import { toast } from "sonner";

export default function RentalsPage() {
  const { rentals, deleteRental, updateRental } = useMockStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);

  // Search filter
  const filteredRentals = useMemo(() => {
    return rentals.filter((rental) => 
      rental.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rental.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rentals, searchQuery]);

  const handleAddRental = () => {
    setSelectedRental(null);
    setIsModalOpen(true);
  };

  const handleEditRental = (rental: Rental) => {
    setSelectedRental(rental);
    setIsModalOpen(true);
  };

  const handleDeleteRental = (id: string) => {
    if (confirm("Are you sure you want to delete this rental record?")) {
      deleteRental(id);
      toast.success("Rental deleted successfully");
    }
  };

  const handleMarkReturned = (rental: Rental) => {
    updateRental(rental.id, { status: "Completed" });
    toast.success("Rental marked as returned");
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Rental Tracking</h1>
          <p className="text-muted-foreground mt-1">Monitor active bookings, returns, and overdue items.</p>
        </div>
        <div className="flex items-center space-x-3">
           <Button variant="outline" className="rounded-xl h-11" onClick={() => toast.success("History log opened!")}>
              <History className="mr-2 h-4 w-4" />
              Rental History
           </Button>
           <Button className="rounded-xl h-11 shadow-lg shadow-primary/20" onClick={handleAddRental}>
              <Plus className="mr-2 h-4 w-4" />
              New Booking
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Now", value: rentals.filter(r => r.status === "Active").length.toString(), icon: Clock, color: "text-primary" },
          { label: "Upcoming", value: rentals.filter(r => r.status === "Upcoming").length.toString(), icon: Calendar, color: "text-blue-500" },
          { label: "Overdue", value: rentals.filter(r => r.status === "Overdue").length.toString(), icon: AlertCircle, color: "text-rose-500" },
          { label: "Completed", value: rentals.filter(r => r.status === "Completed").length.toString(), icon: CheckCircle2, color: "text-emerald-500" },
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
                  placeholder="Search rentals by product or customer..." 
                  className="pl-10 rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRentals.map((rental) => (
                <TableRow key={rental.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                  <TableCell className="pl-6 font-mono text-xs">{rental.id}</TableCell>
                  <TableCell className="font-medium">{rental.customerName}</TableCell>
                  <TableCell>{rental.productName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {rental.startDate} <br/>to {rental.endDate}
                  </TableCell>
                  <TableCell className="font-medium">${rental.totalCost}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "rounded-lg px-2.5 py-0.5 font-medium border-transparent",
                        rental.status === "Active" && "bg-blue-500/10 text-blue-600",
                        rental.status === "Overdue" && "bg-rose-500/10 text-rose-600",
                        rental.status === "Completed" && "bg-emerald-500/10 text-emerald-600",
                        rental.status === "Upcoming" && "bg-amber-500/10 text-amber-600"
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
                      <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg">
                        {rental.status !== "Completed" && (
                          <DropdownMenuItem className="cursor-pointer" onClick={() => handleMarkReturned(rental)}>
                            <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" /> Mark as Returned
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditRental(rental)}>
                          <Edit className="mr-2 h-4 w-4 text-blue-500" /> Edit Rental
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-rose-500 focus:text-rose-500 focus:bg-rose-50" onClick={() => handleDeleteRental(rental.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredRentals.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    No rentals found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <RentalModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        rental={selectedRental} 
      />
    </div>
  );
}
