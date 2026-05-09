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
import { useMockStore, Order } from "@/src/store/useMockStore";
import { toast } from "sonner";

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order?: Order | null;
}

export function OrderModal({ open, onOpenChange, order }: OrderModalProps) {
  const { addOrder, updateOrder, customers, products } = useMockStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerId: "",
    status: "Pending",
    paymentMethod: "Credit Card",
    selectedProductId: "", // simplified for the mock single product selection initially
  });

  useEffect(() => {
    if (order && open) {
      setFormData({
        customerId: order.customerId,
        status: order.status,
        paymentMethod: order.paymentMethod,
        selectedProductId: order.items[0] || "",
      });
    } else if (open) {
      setFormData({
        customerId: customers[0]?.id || "",
        status: "Pending",
        paymentMethod: "Credit Card",
        selectedProductId: products[0]?.id || "",
      });
    }
  }, [order, open, customers, products]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerId || !formData.selectedProductId) {
      toast.error("Please select a customer and a product");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const customer = customers.find(c => c.id === formData.customerId);
      const product = products.find(p => p.id === formData.selectedProductId);
      
      const payload = {
        customerId: formData.customerId,
        customerName: customer?.name || "Unknown",
        items: [formData.selectedProductId],
        totalAmount: product?.price || 0,
        status: formData.status,
        paymentMethod: formData.paymentMethod,
      };

      if (order) {
        updateOrder(order.id, payload);
        toast.success("Order updated successfully");
      } else {
        addOrder(payload);
        toast.success("Order created successfully");
      }
      
      setLoading(false);
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{order ? "Edit Order" : "Create New Order"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
              name="selectedProductId" 
              value={formData.selectedProductId} 
              onChange={handleChange}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Select a product</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} - ${p.price}</option>
              ))}
            </select>
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
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method</label>
              <select 
                name="paymentMethod" 
                value={formData.paymentMethod} 
                onChange={handleChange}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : order ? "Update Order" : "Create Order"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
