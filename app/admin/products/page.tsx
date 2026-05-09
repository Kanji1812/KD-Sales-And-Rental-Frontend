"use client";

import { useState, useMemo } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowUpDown 
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
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMockStore, Product } from "@/src/store/useMockStore";
import { ProductModal } from "@/components/modals/ProductModal";
import { toast } from "sonner";

export default function ProductsPage() {
  const { products, deleteProduct } = useMockStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Search filter
  const filteredProducts = useMemo(() => {
    return products.filter((product) => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
      toast.success("Product deleted successfully");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Product Management</h1>
          <p className="text-muted-foreground mt-1">Manage your cloth inventory, rental prices, and stock levels.</p>
        </div>
        <div className="flex items-center space-x-3">
           <Button variant="outline" className="rounded-xl h-11" onClick={() => toast.success("Export started!")}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
           </Button>
           <Button className="rounded-xl h-11 shadow-lg shadow-primary/20" onClick={handleAddProduct}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
           </Button>
        </div>
      </div>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="p-6 border-b bg-white/50 dark:bg-slate-900/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-2 w-full md:w-96">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products by name, SKU..." 
                  className="pl-10 rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="shrink-0 rounded-xl">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
               <span className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6 w-[100px]">
                  <Button variant="ghost" className="p-0 hover:bg-transparent font-bold">
                    SKU <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="font-bold">Product Name</TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Rental Price</TableHead>
                <TableHead className="font-bold">Stock</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="text-right pr-6 font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                  <TableCell className="pl-6 font-mono text-xs">{product.id}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-lg">{product.category}</Badge>
                  </TableCell>
                  <TableCell>${product.price}/day</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "rounded-lg px-2.5 py-0.5 font-medium border-transparent",
                        product.status === "Available" && "bg-emerald-500/10 text-emerald-600",
                        product.status === "Low Stock" && "bg-amber-500/10 text-amber-600",
                        product.status === "Out of Stock" && "bg-rose-500/10 text-rose-600"
                      )}
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditProduct(product)}>
                          <Edit className="mr-2 h-4 w-4 text-blue-500" /> Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-rose-500 focus:text-rose-500 focus:bg-rose-50" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ProductModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        product={selectedProduct} 
      />
    </div>
  );
}
