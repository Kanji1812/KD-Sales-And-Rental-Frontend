import { create } from 'zustand';
import { mockProducts } from '../mock/products';
import { mockCustomers } from '../mock/customers';
import { mockOrders } from '../mock/orders';
import { mockRentals } from '../mock/rentals';
import { mockDashboardData } from '../mock/dashboard';

// Types
export type Product = typeof mockProducts[0];
export type Customer = typeof mockCustomers[0];
export type Order = typeof mockOrders[0];
export type Rental = typeof mockRentals[0];

interface MockState {
  products: Product[];
  customers: Customer[];
  orders: Order[];
  rentals: Rental[];
  dashboardData: typeof mockDashboardData;

  // Actions for Products
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Actions for Customers
  addCustomer: (customer: Omit<Customer, 'id' | 'joinDate'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  // Actions for Orders
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  updateOrder: (id: string, order: Partial<Order>) => void;
  deleteOrder: (id: string) => void;

  // Actions for Rentals
  addRental: (rental: Omit<Rental, 'id'>) => void;
  updateRental: (id: string, rental: Partial<Rental>) => void;
  deleteRental: (id: string) => void;
}

const generateId = (prefix: string) => `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

export const useMockStore = create<MockState>((set) => ({
  products: mockProducts,
  customers: mockCustomers,
  orders: mockOrders,
  rentals: mockRentals,
  dashboardData: mockDashboardData,

  // Products
  addProduct: (product) => set((state) => ({ 
    products: [{ ...product, id: generateId('P') }, ...state.products] 
  })),
  updateProduct: (id, updatedProduct) => set((state) => ({
    products: state.products.map(p => p.id === id ? { ...p, ...updatedProduct } : p)
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(p => p.id !== id)
  })),

  // Customers
  addCustomer: (customer) => set((state) => {
    const newCustomer = { 
      ...customer, 
      id: generateId('C'), 
      joinDate: new Date().toISOString().split('T')[0] 
    };
    return { customers: [newCustomer, ...state.customers] };
  }),
  updateCustomer: (id, updatedCustomer) => set((state) => ({
    customers: state.customers.map(c => c.id === id ? { ...c, ...updatedCustomer } : c)
  })),
  deleteCustomer: (id) => set((state) => ({
    customers: state.customers.filter(c => c.id !== id)
  })),

  // Orders
  addOrder: (order) => set((state) => {
    const newOrder = { 
      ...order, 
      id: generateId('ORD'), 
      date: new Date().toISOString().split('T')[0] 
    };
    return { orders: [newOrder, ...state.orders] };
  }),
  updateOrder: (id, updatedOrder) => set((state) => ({
    orders: state.orders.map(o => o.id === id ? { ...o, ...updatedOrder } : o)
  })),
  deleteOrder: (id) => set((state) => ({
    orders: state.orders.filter(o => o.id !== id)
  })),

  // Rentals
  addRental: (rental) => set((state) => ({ 
    rentals: [{ ...rental, id: generateId('RNT') }, ...state.rentals] 
  })),
  updateRental: (id, updatedRental) => set((state) => ({
    rentals: state.rentals.map(r => r.id === id ? { ...r, ...updatedRental } : r)
  })),
  deleteRental: (id) => set((state) => ({
    rentals: state.rentals.filter(r => r.id !== id)
  })),
}));
