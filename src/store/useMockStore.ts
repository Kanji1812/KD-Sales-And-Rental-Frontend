import { create } from "zustand";
import {
  mockActivityLogs,
  mockCustomers,
  mockDashboardData,
  mockOrders,
  mockProducts,
  mockRentals,
  mockSubscriptionPlans,
  type ActivityLog,
  type Customer,
  type Order,
  type Product,
  type Rental,
  type SubscriptionPlan,
} from "@/src/mock/enterprise";

export type {
  ActivityLog,
  Customer,
  Order,
  Product,
  Rental,
  SubscriptionPlan,
};

interface MockState {
  products: Product[];
  customers: Customer[];
  orders: Order[];
  rentals: Rental[];
  activityLogs: ActivityLog[];
  subscriptionPlans: SubscriptionPlan[];
  dashboardData: typeof mockDashboardData;

  addProduct: (product: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  addCustomer: (customer: Omit<Customer, "id" | "joinDate" | "lastInvoiceAt" | "activeRentals">) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  addOrder: (order: Omit<Order, "id" | "saleDate" | "invoiceNumber">) => void;
  updateOrder: (id: string, order: Partial<Order>) => void;
  deleteOrder: (id: string) => void;

  addRental: (rental: Omit<Rental, "id" | "rentalNumber" | "returnDate">) => void;
  updateRental: (id: string, rental: Partial<Rental>) => void;
  deleteRental: (id: string) => void;
}

const generateId = (prefix: string) => `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
const todayIso = () => new Date().toISOString().split("T")[0];

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export const useMockStore = create<MockState>((set) => ({
  products: mockProducts,
  customers: mockCustomers,
  orders: mockOrders,
  rentals: mockRentals,
  activityLogs: mockActivityLogs,
  subscriptionPlans: mockSubscriptionPlans,
  dashboardData: mockDashboardData,

  addProduct: (product) =>
    set((state) => ({
      products: [{ ...product, id: generateId("PRD"), createdAt: todayIso() }, ...state.products],
    })),
  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),

  addCustomer: (customer) =>
    set((state) => ({
      customers: [
        {
          ...customer,
          id: generateId("CUS"),
          activeRentals: 0,
          lastInvoiceAt: todayIso(),
          joinDate: todayIso(),
        },
        ...state.customers,
      ],
    })),
  updateCustomer: (id, updatedCustomer) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id ? { ...customer, ...updatedCustomer } : customer
      ),
    })),
  deleteCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id),
    })),

  addOrder: (order) =>
    set((state) => ({
      orders: [
        {
          ...order,
          id: generateId("SAL"),
          invoiceNumber: `KD-SAL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          saleDate: todayIso(),
        },
        ...state.orders,
      ],
    })),
  updateOrder: (id, updatedOrder) =>
    set((state) => ({
      orders: state.orders.map((order) => (order.id === id ? { ...order, ...updatedOrder } : order)),
    })),
  deleteOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    })),

  addRental: (rental) =>
    set((state) => ({
      rentals: [
        {
          ...rental,
          id: generateId("RNT"),
          rentalNumber: `KD-RNT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          returnDate: "",
        },
        ...state.rentals,
      ],
    })),
  updateRental: (id, updatedRental) =>
    set((state) => ({
      rentals: state.rentals.map((rental) =>
        rental.id === id ? { ...rental, ...updatedRental } : rental
      ),
    })),
  deleteRental: (id) =>
    set((state) => ({
      rentals: state.rentals.filter((rental) => rental.id !== id),
    })),
}));
