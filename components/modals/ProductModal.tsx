import React, { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Product, useMockStore } from "@/src/store/useMockStore";

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
}

const emptyForm = {
  name: "",
  sku: "",
  brand: "",
  category: "Designer Sarees",
  size: "",
  color: "",
  salePrice: "0",
  rentalPrice: "0",
  securityDeposit: "0",
  availableQty: "1",
  status: "active",
  isRentable: true,
  isSellable: true,
  description: "",
};

export function ProductModal({ open, onOpenChange, product }: ProductModalProps) {
  const { addProduct, updateProduct } = useMockStore();
  const [loading, setLoading] = useState(false);
  const initialFormData = product
    ? {
        name: product.name,
        sku: product.sku,
        brand: product.brand,
        category: product.category,
        size: product.size,
        color: product.color,
        salePrice: product.salePrice.toString(),
        rentalPrice: product.rentalPrice.toString(),
        securityDeposit: product.securityDeposit.toString(),
        availableQty: product.availableQty.toString(),
        status: product.status,
        isRentable: product.isRentable,
        isSellable: product.isSellable,
        description: product.description,
      }
    : emptyForm;
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = event.target;
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setFormData((current) => ({ ...current, [target.name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.name || !formData.sku || !formData.brand) {
      toast.error("Product name, SKU, and brand are required");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const availableQty = Number(formData.availableQty);
      const payload = {
        shopId: product?.shopId ?? "SHOP-001",
        categoryId: product?.categoryId ?? "CAT-MOCK",
        category: formData.category,
        name: formData.name,
        sku: formData.sku,
        brand: formData.brand,
        size: formData.size,
        color: formData.color,
        description: formData.description,
        purchasePrice: product?.purchasePrice ?? Math.round(Number(formData.salePrice) * 0.62),
        salePrice: Number(formData.salePrice),
        rentalPrice: Number(formData.rentalPrice),
        securityDeposit: Number(formData.securityDeposit),
        isRentable: formData.isRentable,
        isSellable: formData.isSellable,
        status: formData.status as Product["status"],
        thumbnailImage: product?.thumbnailImage ?? "/placeholder-product.jpg",
        totalQty: product?.totalQty ?? availableQty,
        availableQty,
        rentedQty: product?.rentedQty ?? 0,
        soldQty: product?.soldQty ?? 0,
        damagedQty: product?.damagedQty ?? 0,
        washingQty: product?.washingQty ?? 0,
        reservedQty: product?.reservedQty ?? 0,
      };

      if (product) {
        updateProduct(product.id, payload);
        toast.success("Product updated");
      } else {
        addProduct(payload);
        toast.success("Product created");
      }

      setLoading(false);
      onOpenChange(false);
    }, 450);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Product Name *"><Input name="name" value={formData.name} onChange={handleChange} /></Field>
            <Field label="SKU *"><Input name="sku" value={formData.sku} onChange={handleChange} /></Field>
            <Field label="Brand *"><Input name="brand" value={formData.brand} onChange={handleChange} /></Field>
            <Field label="Category">
              <select name="category" value={formData.category} onChange={handleChange} className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
                <option>Designer Sarees</option>
                <option>Lehengas</option>
                <option>Sherwanis</option>
                <option>Gowns</option>
                <option>Accessories</option>
              </select>
            </Field>
            <Field label="Size"><Input name="size" value={formData.size} onChange={handleChange} /></Field>
            <Field label="Color"><Input name="color" value={formData.color} onChange={handleChange} /></Field>
            <Field label="Sale Price"><Input type="number" name="salePrice" value={formData.salePrice} onChange={handleChange} /></Field>
            <Field label="Rental Price"><Input type="number" name="rentalPrice" value={formData.rentalPrice} onChange={handleChange} /></Field>
            <Field label="Security Deposit"><Input type="number" name="securityDeposit" value={formData.securityDeposit} onChange={handleChange} /></Field>
            <Field label="Available Qty"><Input type="number" name="availableQty" value={formData.availableQty} onChange={handleChange} /></Field>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Status">
              <select name="status" value={formData.status} onChange={handleChange} className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
                <option value="active">Active</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>
            <label className="flex items-center gap-2 rounded-lg border p-3 text-sm">
              <input type="checkbox" name="isRentable" checked={formData.isRentable} onChange={handleChange} />
              Rentable
            </label>
            <label className="flex items-center gap-2 rounded-lg border p-3 text-sm">
              <input type="checkbox" name="isSellable" checked={formData.isSellable} onChange={handleChange} />
              Sellable
            </label>
          </div>
          <Field label="Description">
            <textarea name="description" value={formData.description} onChange={handleChange} className="min-h-20 w-full rounded-lg border bg-background px-3 py-2 text-sm" />
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : product ? "Update Product" : "Create Product"}</Button>
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
