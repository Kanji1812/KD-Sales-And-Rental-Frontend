import React, { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Customer, useMockStore } from "@/src/store/useMockStore";

interface CustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: Customer | null;
}

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  gstNo: "",
  status: "active",
  totalSpent: "0",
  notes: "",
};

export function CustomerModal({ open, onOpenChange, customer }: CustomerModalProps) {
  const { addCustomer, updateCustomer } = useMockStore();
  const [loading, setLoading] = useState(false);
  const initialFormData = customer
    ? {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        gstNo: customer.gstNo,
        status: customer.status,
        totalSpent: customer.totalSpent.toString(),
        notes: customer.notes,
      }
    : emptyForm;
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Name, email, and phone are required");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const payload = {
        shopId: customer?.shopId ?? "SHOP-001",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        gstNo: formData.gstNo,
        notes: formData.notes,
        status: formData.status as Customer["status"],
        totalSpent: Number(formData.totalSpent),
      };

      if (customer) {
        updateCustomer(customer.id, payload);
        toast.success("Customer updated");
      } else {
        addCustomer(payload);
        toast.success("Customer added");
      }

      setLoading(false);
      onOpenChange(false);
    }, 450);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle>{customer ? "Edit Customer" : "Add Customer"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full Name *"><Input name="name" value={formData.name} onChange={handleChange} /></Field>
            <Field label="Email *"><Input type="email" name="email" value={formData.email} onChange={handleChange} /></Field>
            <Field label="Phone *"><Input name="phone" value={formData.phone} onChange={handleChange} /></Field>
            <Field label="GST No"><Input name="gstNo" value={formData.gstNo} onChange={handleChange} /></Field>
            <Field label="Status">
              <select name="status" value={formData.status} onChange={handleChange} className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>
            <Field label="Total Spent"><Input type="number" name="totalSpent" value={formData.totalSpent} onChange={handleChange} /></Field>
          </div>
          <Field label="Address">
            <textarea name="address" value={formData.address} onChange={handleChange} className="min-h-20 w-full rounded-lg border bg-background px-3 py-2 text-sm" />
          </Field>
          <Field label="Notes">
            <textarea name="notes" value={formData.notes} onChange={handleChange} className="min-h-20 w-full rounded-lg border bg-background px-3 py-2 text-sm" />
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : customer ? "Update Customer" : "Add Customer"}</Button>
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
