"use client";

import { useMemo, useState } from "react";
import { Download, Edit, Eye, FileText, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { OrderModal } from "@/components/modals/OrderModal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { formatCurrency, type Order, useMockStore } from "@/src/store/useMockStore";

export default function OrdersPage() {
  const { orders, products, deleteOrder } = useMockStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [previewOrder, setPreviewOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return orders.filter((order) => {
      const matchesSearch =
        order.invoiceNumber.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.id.toLowerCase().includes(query);
      const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter;
      return matchesSearch && matchesPayment;
    });
  }, [orders, paymentFilter, searchQuery]);

  const handleDeleteOrder = (id: string) => {
    if (confirm("Delete this mock sales invoice?")) {
      deleteOrder(id);
      toast.success("Sales invoice deleted");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <PageHeader
        eyebrow="Sales app"
        title="Sales Invoices"
        description="GST-ready sales workflow with mock invoice preview, payment tracking, searching, filtering, sorting-ready columns, and CRUD modals."
        actions={
          <>
            <Button variant="outline" className="h-10" onClick={() => toast.success("Mock sales report export queued")}>
              <Download className="mr-2 size-4" />
              Export
            </Button>
            <Button className="h-10" onClick={() => { setSelectedOrder(null); setIsModalOpen(true); }}>
              <Plus className="mr-2 size-4" />
              Create Invoice
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          ["Invoices", orders.length.toString()],
          ["Paid", orders.filter((order) => order.paymentStatus === "paid").length.toString()],
          ["Pending", orders.filter((order) => order.paymentStatus === "pending").length.toString()],
          ["GST Collected", formatCurrency(orders.reduce((sum, order) => sum + order.gstAmount, 0))],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardContent className="p-4">
              <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
              <p className="mt-2 text-2xl font-semibold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative max-w-xl flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search invoice, customer, sale id"
                className="h-10 pl-9"
              />
            </div>
            <select
              value={paymentFilter}
              onChange={(event) => setPaymentFilter(event.target.value)}
              className="h-10 rounded-lg border bg-background px-3 text-sm"
            >
              <option value="all">All payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Subtotal</TableHead>
                  <TableHead>GST</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="pl-6">
                      <div className="font-mono text-xs">{order.invoiceNumber}</div>
                      <div className="text-xs text-muted-foreground">{order.saleDate}</div>
                    </TableCell>
                    <TableCell className="font-medium">{order.customerName}</TableCell>
                    <TableCell>{formatCurrency(order.subtotal)}</TableCell>
                    <TableCell>{formatCurrency(order.gstAmount)}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(order.totalAmount)}</TableCell>
                    <TableCell><StatusBadge status={order.paymentStatus} /></TableCell>
                    <TableCell><StatusBadge status={order.status} /></TableCell>
                    <TableCell className="pr-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setPreviewOrder(order)}>
                            <Eye className="mr-2 size-4 text-emerald-600" />
                            Preview invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setSelectedOrder(order); setIsModalOpen(true); }}>
                            <Edit className="mr-2 size-4 text-blue-600" />
                            Edit invoice
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-rose-600" onClick={() => handleDeleteOrder(order.id)}>
                            <Trash2 className="mr-2 size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                      No invoices match the current filters.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <OrderModal key={selectedOrder?.id ?? "new-order"} open={isModalOpen} onOpenChange={setIsModalOpen} order={selectedOrder} />

      <Dialog open={Boolean(previewOrder)} onOpenChange={(open) => !open && setPreviewOrder(null)}>
        <DialogContent className="sm:max-w-[620px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="size-5" />
              Invoice Preview
            </DialogTitle>
          </DialogHeader>
          {previewOrder ? (
            <div className="space-y-5 py-3">
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-semibold">KD Sales & Rental</p>
                    <p className="text-sm text-muted-foreground">GST billing mock preview</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm">{previewOrder.invoiceNumber}</p>
                    <p className="text-sm text-muted-foreground">{previewOrder.saleDate}</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-muted-foreground">Bill to</p>
                    <p className="font-medium">{previewOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payment</p>
                    <p className="font-medium">{previewOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border">
                {previewOrder.items.map((productId) => {
                  const product = products.find((item) => item.id === productId);
                  return (
                    <div key={productId} className="flex items-center justify-between border-b p-4 last:border-b-0">
                      <div>
                        <p className="font-medium">{product?.name ?? productId}</p>
                        <p className="text-xs text-muted-foreground">{product?.sku ?? "Snapshot item"}</p>
                      </div>
                      <p className="font-semibold">{formatCurrency(product?.salePrice ?? previewOrder.subtotal)}</p>
                    </div>
                  );
                })}
              </div>
              <div className="ml-auto max-w-xs space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(previewOrder.subtotal)}</span></div>
                <div className="flex justify-between"><span>GST ({previewOrder.gstRate}%)</span><span>{formatCurrency(previewOrder.gstAmount)}</span></div>
                <div className="flex justify-between"><span>Discount</span><span>-{formatCurrency(previewOrder.discountAmount)}</span></div>
                <div className="flex justify-between border-t pt-2 text-base font-semibold">
                  <span>Total</span><span>{formatCurrency(previewOrder.totalAmount)}</span>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
