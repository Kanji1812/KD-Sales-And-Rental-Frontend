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
import { useMockStore, Customer } from "@/src/store/useMockStore";
import { toast } from "sonner";

interface CustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: Customer | null;
}

export function CustomerModal({ open, onOpenChange, customer }: CustomerModalProps) {
  const { addCustomer, updateCustomer } = useMockStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
    totalSpent: "0",
  });

  useEffect(() => {
    if (customer && open) {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        status: customer.status,
        totalSpent: customer.totalSpent.toString(),
      });
    } else if (open) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        status: "Active",
        totalSpent: "0",
      });
    }
  }, [customer, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        totalSpent: Number(formData.totalSpent),
      };

      if (customer) {
        updateCustomer(customer.id, payload);
        toast.success("Customer updated successfully");
      } else {
        addCustomer(payload);
        toast.success("Customer added successfully");
      }
      
      setLoading(false);
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{customer ? "Edit Customer" : "Add New Customer"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name *</label>
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address *</label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number *</label>
            <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            {customer && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Total Spent ($)</label>
                <Input type="number" name="totalSpent" value={formData.totalSpent} onChange={handleChange} />
              </div>
            )}
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : customer ? "Update Customer" : "Add Customer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
