import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type Order, useMockStore } from "@/src/store/useMockStore";

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order?: Order | null;
}

export function OrderModal({ open, onOpenChange, order }: OrderModalProps) {
  const { addOrder, updateOrder, customers, products } = useMockStore();
  const [loading, setLoading] = useState(false);
  const initialFormData = order
    ? {
        customerId: order.customerId,
        productId: order.items[0] ?? "",
        paymentStatus: order.paymentStatus,
        status: order.status,
        paymentMethod: order.paymentMethod,
        discountAmount: order.discountAmount.toString(),
      }
    : {
        customerId: customers[0]?.id ?? "",
        productId: products.find((product) => product.isSellable)?.id ?? products[0]?.id ?? "",
        paymentStatus: "pending",
        status: "processing",
        paymentMethod: "UPI",
        discountAmount: "0",
      };
  const [formData, setFormData] = useState(initialFormData);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === formData.productId),
    [formData.productId, products]
  );
  const subtotal = selectedProduct?.salePrice ?? 0;
  const gstRate = 12;
  const gstAmount = Math.round((subtotal * gstRate) / 100);
  const totalAmount = subtotal + gstAmount - Number(formData.discountAmount || 0);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.customerId || !formData.productId) {
      toast.error("Select a customer and product");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const customer = customers.find((item) => item.id === formData.customerId);
      const payload = {
        shopId: order?.shopId ?? "SHOP-001",
        customerId: formData.customerId,
        customerName: customer?.name ?? "Unknown Customer",
        subtotal,
        gstRate,
        gstAmount,
        discountAmount: Number(formData.discountAmount || 0),
        totalAmount,
        paymentStatus: formData.paymentStatus as Order["paymentStatus"],
        status: formData.status as Order["status"],
        notes: order?.notes ?? "Frontend mock sales invoice.",
        items: [formData.productId],
        paymentMethod: formData.paymentMethod,
        createdBy: order?.createdBy ?? "KD Admin",
      };

      if (order) {
        updateOrder(order.id, payload);
        toast.success("Invoice updated");
      } else {
        addOrder(payload);
        toast.success("Invoice created");
      }

      setLoading(false);
      onOpenChange(false);
    }, 450);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>{order ? "Edit Sales Invoice" : "Create Sales Invoice"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <Field label="Customer">
            <select name="customerId" value={formData.customerId} onChange={handleChange} className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
              {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
            </select>
          </Field>
          <Field label="Product">
            <select name="productId" value={formData.productId} onChange={handleChange} className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
              {products.filter((product) => product.isSellable).map((product) => (
                <option key={product.id} value={product.id}>{product.name} / {product.sku}</option>
              ))}
            </select>
          </Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Payment Status">
              <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </Field>
            <Field label="Sale Status">
              <select name="status" value={formData.status} onChange={handleChange} className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </Field>
            <Field label="Payment Method">
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
                <option>UPI</option>
                <option>Card</option>
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>Payment Link</option>
              </select>
            </Field>
            <Field label="Discount">
              <input type="number" name="discountAmount" value={formData.discountAmount} onChange={handleChange} className="h-10 w-full rounded-lg border bg-background px-3 text-sm" />
            </Field>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
            <div className="mt-2 flex justify-between"><span>GST ({gstRate}%)</span><span>₹{gstAmount.toLocaleString("en-IN")}</span></div>
            <div className="mt-2 flex justify-between font-semibold"><span>Total</span><span>₹{totalAmount.toLocaleString("en-IN")}</span></div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : order ? "Update Invoice" : "Create Invoice"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2 text-sm font-medium">
      <span>{label}</span>
      {children}
    </label>
  );
}
