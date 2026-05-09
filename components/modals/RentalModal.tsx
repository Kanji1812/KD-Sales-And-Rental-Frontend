import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMockStore, Rental } from "@/src/store/useMockStore";
import { toast } from "sonner";

interface RentalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rental?: Rental | null;
}

export function RentalModal({ open, onOpenChange, rental }: RentalModalProps) {
  const { addRental, updateRental, customers, products } = useMockStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerId: "",
    productId: "",
    startDate: "",
    endDate: "",
    status: "Active",
    deposit: "50",
  });

  useEffect(() => {
    if (rental && open) {
      setFormData({
        customerId: rental.customerId,
        productId: rental.productId,
        startDate: rental.startDate,
        endDate: rental.endDate,
        status: rental.status,
        deposit: rental.deposit.toString(),
      });
    } else if (open) {
      setFormData({
        customerId: customers[0]?.id || "",
        productId: products[0]?.id || "",
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        status: "Active",
        deposit: "50",
      });
    }
  }, [rental, open, customers, products]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerId || !formData.productId || !formData.startDate || !formData.endDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const customer = customers.find(c => c.id === formData.customerId);
      const product = products.find(p => p.id === formData.productId);
      
      const payload = {
        customerId: formData.customerId,
        customerName: customer?.name || "Unknown",
        productId: formData.productId,
        productName: product?.name || "Unknown",
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
        totalCost: (product?.price || 50) * 3, // mock 3 days calculation
        deposit: Number(formData.deposit),
      };

      if (rental) {
        updateRental(rental.id, payload);
        toast.success("Rental updated successfully");
      } else {
        addRental(payload);
        toast.success("Rental created successfully");
      }
      
      setLoading(false);
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{rental ? "Edit Rental" : "Create New Rental"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer *</label>
              <select 
                name="customerId" 
                value={formData.customerId} 
                onChange={handleChange}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select a customer</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Product *</label>
              <select 
                name="productId" 
                value={formData.productId} 
                onChange={handleChange}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select a product</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date *</label>
              <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date *</label>
              <Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Deposit ($)</label>
              <Input type="number" name="deposit" value={formData.deposit} onChange={handleChange} />
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : rental ? "Update Rental" : "Create Rental"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
