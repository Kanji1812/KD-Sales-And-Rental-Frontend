import React, { useMemo, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Rental, useMockStore } from "@/src/store/useMockStore";

interface RentalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rental?: Rental | null;
}

export function RentalModal({ open, onOpenChange, rental }: RentalModalProps) {
  const { addRental, updateRental, customers, products } = useMockStore();
  const [loading, setLoading] = useState(false);
  const rentableProducts = useMemo(() => products.filter((product) => product.isRentable), [products]);
  const defaultStartDate = "2026-05-12";
  const defaultEndDate = "2026-05-15";
  const defaultProduct = rentableProducts[0];
  const initialFormData = rental
    ? {
        customerId: rental.customerId,
        productId: rental.productId,
        startDate: rental.startDate,
        endDate: rental.endDate,
        status: rental.status,
        deposit: rental.deposit.toString(),
        paymentStatus: rental.paymentStatus,
      }
    : {
        customerId: customers[0]?.id ?? "",
        productId: defaultProduct?.id ?? "",
        startDate: defaultStartDate,
        endDate: defaultEndDate,
        status: "active",
        deposit: (defaultProduct?.securityDeposit ?? 0).toString(),
        paymentStatus: "pending",
      };
  const [formData, setFormData] = useState(initialFormData);
  const selectedProduct = useMemo(
    () => products.find((product) => product.id === formData.productId),
    [formData.productId, products]
  );
  const rentalDays = Math.max(
    1,
    differenceInCalendarDays(new Date(formData.endDate || defaultEndDate), new Date(formData.startDate || defaultStartDate))
  );
  const rentalAmount = (selectedProduct?.rentalPrice ?? 0) * rentalDays;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.customerId || !formData.productId || !formData.startDate || !formData.endDate) {
      toast.error("Customer, product, and dates are required");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const customer = customers.find((item) => item.id === formData.customerId);
      const product = products.find((item) => item.id === formData.productId);
      const payload = {
        shopId: rental?.shopId ?? "SHOP-001",
        customerId: formData.customerId,
        customerName: customer?.name ?? "Unknown Customer",
        productId: formData.productId,
        productName: product?.name ?? "Unknown Product",
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status as Rental["status"],
        rentalAmount,
        lateFee: rental?.lateFee ?? 0,
        totalCost: rentalAmount + (rental?.lateFee ?? 0),
        deposit: Number(formData.deposit),
        paymentStatus: formData.paymentStatus as Rental["paymentStatus"],
      };

      if (rental) {
        updateRental(rental.id, payload);
        toast.success("Rental updated");
      } else {
        addRental(payload);
        toast.success("Rental created");
      }

      setLoading(false);
      onOpenChange(false);
    }, 450);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{rental ? "Edit Rental" : "Create Rental"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Customer">
              <select name="customerId" value={formData.customerId} onChange={handleChange} className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
                {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
              </select>
            </Field>
            <Field label="Product">
              <select name="productId" value={formData.productId} onChange={handleChange} className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
                {rentableProducts.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
              </select>
            </Field>
            <Field label="Start Date"><Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} /></Field>
            <Field label="End Date"><Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} /></Field>
            <Field label="Status">
              <select name="status" value={formData.status} onChange={handleChange} className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="overdue">Overdue</option>
                <option value="completed">Completed</option>
              </select>
            </Field>
            <Field label="Payment Status">
              <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </Field>
            <Field label="Deposit"><Input type="number" name="deposit" value={formData.deposit} onChange={handleChange} /></Field>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-sm">
            <div className="flex justify-between"><span>Rental days</span><span>{rentalDays}</span></div>
            <div className="mt-2 flex justify-between"><span>Daily rental</span><span>₹{(selectedProduct?.rentalPrice ?? 0).toLocaleString("en-IN")}</span></div>
            <div className="mt-2 flex justify-between font-semibold"><span>Total rental</span><span>₹{rentalAmount.toLocaleString("en-IN")}</span></div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : rental ? "Update Rental" : "Create Rental"}</Button>
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
