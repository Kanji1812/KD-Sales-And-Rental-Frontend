"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, Download, Edit, Filter, MoreHorizontal, PackagePlus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { ProductModal } from "@/components/modals/ProductModal";
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
import { formatCurrency, type Product, useMockStore } from "@/src/store/useMockStore";

type SortKey = "name" | "availableQty" | "rentalPrice" | "salePrice";

export default function ProductsPage() {
  const { products, deleteProduct } = useMockStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = useMemo(() => Array.from(new Set(products.map((product) => product.category))), [products]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return products
      .filter((product) => categoryFilter === "all" || product.category === categoryFilter)
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query)
      )
      .sort((a, b) => {
        if (sortKey === "name") return a.name.localeCompare(b.name);
        return Number(b[sortKey]) - Number(a[sortKey]);
      });
  }, [products, searchQuery, categoryFilter, sortKey]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Delete this product from the frontend mock catalog?")) {
      deleteProduct(id);
      toast.success("Product deleted from mock catalog");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <PageHeader
        eyebrow="Catalog app"
        title="Product & Inventory Management"
        description="Manage SKU metadata, sale pricing, rental pricing, deposits, and stock buckets using mock data shaped from products and inventory tables."
        actions={
          <>
            <Button variant="outline" className="h-10" onClick={() => toast.success("Mock CSV export queued")}>
              <Download className="mr-2 size-4" />
              Export
            </Button>
            <Button className="h-10" onClick={handleAddProduct}>
              <PackagePlus className="mr-2 size-4" />
              Add Product
            </Button>
          </>
        }
      />

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-3 md:flex-row">
              <div className="relative max-w-xl flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by name, SKU, or brand"
                  className="h-10 pl-9"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="h-10 rounded-lg border bg-background px-3 text-sm"
              >
                <option value="all">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value as SortKey)}
                className="h-10 rounded-lg border bg-background px-3 text-sm"
              >
                <option value="name">Sort by name</option>
                <option value="availableQty">Available stock</option>
                <option value="rentalPrice">Rental price</option>
                <option value="salePrice">Sale price</option>
              </select>
            </div>
            <Button variant="outline" className="h-10">
              <Filter className="mr-2 size-4" />
              {filteredProducts.length} products
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">SKU</TableHead>
                  <TableHead>
                    <Button variant="ghost" className="h-7 px-0" onClick={() => setSortKey("name")}>
                      Product <ArrowUpDown className="ml-2 size-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Sale/Rental</TableHead>
                  <TableHead>Stock Buckets</TableHead>
                  <TableHead>Flags</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="pl-6 font-mono text-xs">{product.sku}</TableCell>
                    <TableCell>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.category} / {product.brand}</div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>{formatCurrency(product.salePrice)} sale</div>
                      <div className="text-muted-foreground">{formatCurrency(product.rentalPrice)} rental</div>
                    </TableCell>
                    <TableCell>
                      <div className="grid min-w-56 grid-cols-4 gap-2 text-xs">
                        <span className="rounded-md bg-emerald-50 px-2 py-1 text-emerald-700">Avail {product.availableQty}</span>
                        <span className="rounded-md bg-blue-50 px-2 py-1 text-blue-700">Rent {product.rentedQty}</span>
                        <span className="rounded-md bg-amber-50 px-2 py-1 text-amber-700">Wash {product.washingQty}</span>
                        <span className="rounded-md bg-rose-50 px-2 py-1 text-rose-700">Dmg {product.damagedQty}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>{product.isSellable ? "Sellable" : "Rental only"}</div>
                      <div className="text-muted-foreground">{product.isRentable ? "Rentable" : "Sale only"}</div>
                    </TableCell>
                    <TableCell><StatusBadge status={product.status} /></TableCell>
                    <TableCell className="pr-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}>
                            <Edit className="mr-2 size-4 text-blue-600" />
                            Edit product
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-rose-600" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash2 className="mr-2 size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                      No products match the current filters.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ProductModal key={selectedProduct?.id ?? "new-product"} open={isModalOpen} onOpenChange={setIsModalOpen} product={selectedProduct} />
    </div>
  );
}
