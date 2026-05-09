"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const products = [
  { id: "P-1001", name: "Silk Evening Gown", category: "Gowns", price: "$120/day", stock: 15, status: "Available" },
  { id: "P-1002", name: "Wool Tailored Suit", category: "Suits", price: "$250/day", stock: 8, status: "Low Stock" },
  { id: "P-1003", name: "Designer Clutch", category: "Accessories", price: "$45/day", stock: 22, status: "Available" },
  { id: "P-1004", name: "Sequin Cocktail Dress", category: "Dresses", price: "$85/day", stock: 0, status: "Out of Stock" },
  { id: "P-1005", name: "Leather Tuxedo Shoes", category: "Shoes", price: "$65/day", stock: 12, status: "Available" },
  { id: "P-1006", name: "Velvet Party Blazer", category: "Suits", price: "$110/day", stock: 4, status: "Low Stock" },
];

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Product Management</h1>
          <p className="text-muted-foreground mt-1">Manage your cloth inventory, rental prices, and stock levels.</p>
        </div>
        <div className="flex items-center space-x-3">
           <Button variant="outline" className="rounded-xl h-11">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
           </Button>
           <Button className="rounded-xl h-11 shadow-lg shadow-primary/20">
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
                <Input placeholder="Search products by name, SKU..." className="pl-10 rounded-xl" />
              </div>
              <Button variant="outline" size="icon" className="shrink-0 rounded-xl">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
               <span className="text-sm text-muted-foreground">Showing 1-10 of 120 products</span>
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
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                  <TableCell className="pl-6 font-mono text-xs">{product.id}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "rounded-lg px-2.5 py-0.5 font-medium",
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
                      <DropdownMenuContent align="end" className="w-40 rounded-xl">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" /> Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-rose-500 focus:text-rose-500">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
