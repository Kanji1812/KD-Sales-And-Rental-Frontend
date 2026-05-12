export type ProductStatus = "active" | "inactive" | "low_stock" | "out_of_stock";
export type PaymentStatus = "paid" | "pending" | "failed";
export type SaleStatus = "completed" | "processing" | "cancelled";
export type RentalStatus = "upcoming" | "active" | "overdue" | "completed";
export type CustomerStatus = "active" | "inactive";

export interface Product {
  id: string;
  shopId: string;
  categoryId: string;
  category: string;
  name: string;
  sku: string;
  brand: string;
  size: string;
  color: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  rentalPrice: number;
  securityDeposit: number;
  isRentable: boolean;
  isSellable: boolean;
  status: ProductStatus;
  thumbnailImage: string;
  totalQty: number;
  availableQty: number;
  rentedQty: number;
  soldQty: number;
  damagedQty: number;
  washingQty: number;
  reservedQty: number;
  createdAt: string;
}

export interface Customer {
  id: string;
  shopId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  gstNo: string;
  notes: string;
  status: CustomerStatus;
  totalSpent: number;
  activeRentals: number;
  lastInvoiceAt: string;
  joinDate: string;
}

export interface Order {
  id: string;
  shopId: string;
  customerId: string;
  customerName: string;
  invoiceNumber: string;
  saleDate: string;
  subtotal: number;
  gstRate: number;
  gstAmount: number;
  discountAmount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  status: SaleStatus;
  notes: string;
  items: string[];
  paymentMethod: string;
  createdBy: string;
}

export interface Rental {
  id: string;
  shopId: string;
  customerId: string;
  customerName: string;
  productId: string;
  productName: string;
  rentalNumber: string;
  startDate: string;
  endDate: string;
  returnDate: string;
  status: RentalStatus;
  rentalAmount: number;
  lateFee: number;
  totalCost: number;
  deposit: number;
  paymentStatus: PaymentStatus;
}

export interface ActivityLog {
  id: string;
  activityType: string;
  moduleName: string;
  description: string;
  userName: string;
  status: "success" | "failed";
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  maxUsers: number;
  maxProducts: number;
  maxOrdersPerMonth: number;
  features: string[];
  isActive: boolean;
}

export const mockProducts: Product[] = [
  {
    id: "PRD-1001",
    shopId: "SHOP-001",
    categoryId: "CAT-01",
    category: "Designer Sarees",
    name: "Kanchipuram Silk Saree",
    sku: "KD-SAR-KAN-001",
    brand: "Kalyani Weaves",
    size: "Free Size",
    color: "Maroon Gold",
    description: "Premium bridal silk saree with zari border and blouse piece.",
    purchasePrice: 14500,
    salePrice: 22500,
    rentalPrice: 3200,
    securityDeposit: 8000,
    isRentable: true,
    isSellable: true,
    status: "active",
    thumbnailImage: "/placeholder-product.jpg",
    totalQty: 9,
    availableQty: 5,
    rentedQty: 2,
    soldQty: 1,
    damagedQty: 0,
    washingQty: 1,
    reservedQty: 0,
    createdAt: "2026-04-02",
  },
  {
    id: "PRD-1002",
    shopId: "SHOP-001",
    categoryId: "CAT-02",
    category: "Lehengas",
    name: "Mirror Work Bridal Lehenga",
    sku: "KD-LHG-MIR-014",
    brand: "Riwaaz Couture",
    size: "M",
    color: "Ivory",
    description: "Rental-focused bridal lehenga with mirror work dupatta.",
    purchasePrice: 38000,
    salePrice: 54900,
    rentalPrice: 6500,
    securityDeposit: 15000,
    isRentable: true,
    isSellable: false,
    status: "low_stock",
    thumbnailImage: "/placeholder-product.jpg",
    totalQty: 4,
    availableQty: 1,
    rentedQty: 2,
    soldQty: 0,
    damagedQty: 0,
    washingQty: 1,
    reservedQty: 0,
    createdAt: "2026-03-18",
  },
  {
    id: "PRD-1003",
    shopId: "SHOP-001",
    categoryId: "CAT-03",
    category: "Sherwanis",
    name: "Embroidered Groom Sherwani",
    sku: "KD-SHW-EMB-022",
    brand: "Manyavar Select",
    size: "42",
    color: "Beige",
    description: "Embroidered sherwani set with stole and churidar.",
    purchasePrice: 18500,
    salePrice: 28900,
    rentalPrice: 4200,
    securityDeposit: 9000,
    isRentable: true,
    isSellable: true,
    status: "active",
    thumbnailImage: "/placeholder-product.jpg",
    totalQty: 7,
    availableQty: 4,
    rentedQty: 1,
    soldQty: 1,
    damagedQty: 0,
    washingQty: 1,
    reservedQty: 0,
    createdAt: "2026-03-21",
  },
  {
    id: "PRD-1004",
    shopId: "SHOP-001",
    categoryId: "CAT-04",
    category: "Gowns",
    name: "Sequin Reception Gown",
    sku: "KD-GWN-SEQ-031",
    brand: "Aurelia Luxe",
    size: "L",
    color: "Emerald",
    description: "Evening reception gown with hand-finished sequin layer.",
    purchasePrice: 12000,
    salePrice: 19800,
    rentalPrice: 2800,
    securityDeposit: 6500,
    isRentable: true,
    isSellable: true,
    status: "out_of_stock",
    thumbnailImage: "/placeholder-product.jpg",
    totalQty: 5,
    availableQty: 0,
    rentedQty: 3,
    soldQty: 1,
    damagedQty: 1,
    washingQty: 0,
    reservedQty: 0,
    createdAt: "2026-02-28",
  },
  {
    id: "PRD-1005",
    shopId: "SHOP-001",
    categoryId: "CAT-05",
    category: "Accessories",
    name: "Kundan Bridal Jewellery Set",
    sku: "KD-ACC-KUN-008",
    brand: "Meera Jewels",
    size: "Set",
    color: "Gold",
    description: "Necklace, earrings, tikka, and bangles rental set.",
    purchasePrice: 7600,
    salePrice: 12500,
    rentalPrice: 1500,
    securityDeposit: 5000,
    isRentable: true,
    isSellable: true,
    status: "active",
    thumbnailImage: "/placeholder-product.jpg",
    totalQty: 12,
    availableQty: 8,
    rentedQty: 2,
    soldQty: 1,
    damagedQty: 0,
    washingQty: 0,
    reservedQty: 1,
    createdAt: "2026-04-11",
  },
  {
    id: "PRD-1006",
    shopId: "SHOP-001",
    categoryId: "CAT-01",
    category: "Designer Sarees",
    name: "Organza Party Saree",
    sku: "KD-SAR-ORG-017",
    brand: "House of Tara",
    size: "Free Size",
    color: "Powder Blue",
    description: "Lightweight organza saree for cocktail and engagement events.",
    purchasePrice: 6200,
    salePrice: 9800,
    rentalPrice: 1300,
    securityDeposit: 3000,
    isRentable: true,
    isSellable: true,
    status: "active",
    thumbnailImage: "/placeholder-product.jpg",
    totalQty: 15,
    availableQty: 11,
    rentedQty: 2,
    soldQty: 2,
    damagedQty: 0,
    washingQty: 0,
    reservedQty: 0,
    createdAt: "2026-04-19",
  },
];

export const mockCustomers: Customer[] = [
  {
    id: "CUS-2001",
    shopId: "SHOP-001",
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    phone: "+91 98765 43210",
    address: "Navrangpura, Ahmedabad, Gujarat",
    gstNo: "",
    notes: "Prefers premium sherwani rentals for family functions.",
    status: "active",
    totalSpent: 48200,
    activeRentals: 1,
    lastInvoiceAt: "2026-05-09",
    joinDate: "2025-12-18",
  },
  {
    id: "CUS-2002",
    shopId: "SHOP-001",
    name: "Priya Shah",
    email: "priya.shah@example.com",
    phone: "+91 98241 11002",
    address: "Vesu, Surat, Gujarat",
    gstNo: "",
    notes: "Bridal package customer with multiple fittings.",
    status: "active",
    totalSpent: 73800,
    activeRentals: 2,
    lastInvoiceAt: "2026-05-10",
    joinDate: "2026-01-04",
  },
  {
    id: "CUS-2003",
    shopId: "SHOP-001",
    name: "Kavya Iyer",
    email: "kavya.iyer@example.com",
    phone: "+91 99876 12345",
    address: "Indiranagar, Bengaluru, Karnataka",
    gstNo: "",
    notes: "Buys accessories, rents sarees for events.",
    status: "active",
    totalSpent: 21900,
    activeRentals: 0,
    lastInvoiceAt: "2026-04-24",
    joinDate: "2025-10-29",
  },
  {
    id: "CUS-2004",
    shopId: "SHOP-001",
    name: "Rohan Patel",
    email: "rohan.patel@example.com",
    phone: "+91 90990 44112",
    address: "Alkapuri, Vadodara, Gujarat",
    gstNo: "24AABCR4812Q1Z6",
    notes: "Corporate billing for stage costume purchases.",
    status: "active",
    totalSpent: 56400,
    activeRentals: 0,
    lastInvoiceAt: "2026-05-02",
    joinDate: "2025-09-16",
  },
  {
    id: "CUS-2005",
    shopId: "SHOP-001",
    name: "Nisha Verma",
    email: "nisha.verma@example.com",
    phone: "+91 91234 87650",
    address: "Bandra West, Mumbai, Maharashtra",
    gstNo: "",
    notes: "Inactive after cancelled rental booking.",
    status: "inactive",
    totalSpent: 6700,
    activeRentals: 0,
    lastInvoiceAt: "2026-02-17",
    joinDate: "2025-11-08",
  },
];

export const mockOrders: Order[] = [
  {
    id: "SAL-3001",
    shopId: "SHOP-001",
    customerId: "CUS-2004",
    customerName: "Rohan Patel",
    invoiceNumber: "KD-SAL-2026-0441",
    saleDate: "2026-05-10",
    subtotal: 28900,
    gstRate: 12,
    gstAmount: 3468,
    discountAmount: 1400,
    totalAmount: 30968,
    paymentStatus: "paid",
    status: "completed",
    notes: "Sherwani sale with minor alteration.",
    items: ["PRD-1003"],
    paymentMethod: "UPI",
    createdBy: "Admin User",
  },
  {
    id: "SAL-3002",
    shopId: "SHOP-001",
    customerId: "CUS-2003",
    customerName: "Kavya Iyer",
    invoiceNumber: "KD-SAL-2026-0442",
    saleDate: "2026-05-09",
    subtotal: 12500,
    gstRate: 3,
    gstAmount: 375,
    discountAmount: 500,
    totalAmount: 12375,
    paymentStatus: "paid",
    status: "completed",
    notes: "Jewellery set purchase.",
    items: ["PRD-1005"],
    paymentMethod: "Card",
    createdBy: "Admin User",
  },
  {
    id: "SAL-3003",
    shopId: "SHOP-001",
    customerId: "CUS-2001",
    customerName: "Aarav Mehta",
    invoiceNumber: "KD-SAL-2026-0443",
    saleDate: "2026-05-08",
    subtotal: 9800,
    gstRate: 12,
    gstAmount: 1176,
    discountAmount: 0,
    totalAmount: 10976,
    paymentStatus: "pending",
    status: "processing",
    notes: "Organza saree reserved for pickup.",
    items: ["PRD-1006"],
    paymentMethod: "Cash",
    createdBy: "Store Manager",
  },
  {
    id: "SAL-3004",
    shopId: "SHOP-001",
    customerId: "CUS-2002",
    customerName: "Priya Shah",
    invoiceNumber: "KD-SAL-2026-0444",
    saleDate: "2026-05-06",
    subtotal: 22500,
    gstRate: 12,
    gstAmount: 2700,
    discountAmount: 1000,
    totalAmount: 24200,
    paymentStatus: "failed",
    status: "cancelled",
    notes: "Cancelled after failed payment link.",
    items: ["PRD-1001"],
    paymentMethod: "Payment Link",
    createdBy: "Store Manager",
  },
];

export const mockRentals: Rental[] = [
  {
    id: "RNT-4001",
    shopId: "SHOP-001",
    customerId: "CUS-2002",
    customerName: "Priya Shah",
    productId: "PRD-1002",
    productName: "Mirror Work Bridal Lehenga",
    rentalNumber: "KD-RNT-2026-0188",
    startDate: "2026-05-11",
    endDate: "2026-05-14",
    returnDate: "",
    status: "active",
    rentalAmount: 19500,
    lateFee: 0,
    totalCost: 19500,
    deposit: 15000,
    paymentStatus: "paid",
  },
  {
    id: "RNT-4002",
    shopId: "SHOP-001",
    customerId: "CUS-2001",
    customerName: "Aarav Mehta",
    productId: "PRD-1003",
    productName: "Embroidered Groom Sherwani",
    rentalNumber: "KD-RNT-2026-0189",
    startDate: "2026-05-08",
    endDate: "2026-05-10",
    returnDate: "",
    status: "overdue",
    rentalAmount: 8400,
    lateFee: 1200,
    totalCost: 9600,
    deposit: 9000,
    paymentStatus: "pending",
  },
  {
    id: "RNT-4003",
    shopId: "SHOP-001",
    customerId: "CUS-2003",
    customerName: "Kavya Iyer",
    productId: "PRD-1001",
    productName: "Kanchipuram Silk Saree",
    rentalNumber: "KD-RNT-2026-0190",
    startDate: "2026-05-17",
    endDate: "2026-05-19",
    returnDate: "",
    status: "upcoming",
    rentalAmount: 6400,
    lateFee: 0,
    totalCost: 6400,
    deposit: 8000,
    paymentStatus: "paid",
  },
  {
    id: "RNT-4004",
    shopId: "SHOP-001",
    customerId: "CUS-2002",
    customerName: "Priya Shah",
    productId: "PRD-1005",
    productName: "Kundan Bridal Jewellery Set",
    rentalNumber: "KD-RNT-2026-0181",
    startDate: "2026-05-01",
    endDate: "2026-05-03",
    returnDate: "2026-05-03",
    status: "completed",
    rentalAmount: 3000,
    lateFee: 0,
    totalCost: 3000,
    deposit: 5000,
    paymentStatus: "paid",
  },
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: "LOG-001",
    activityType: "RENTAL_RETURN",
    moduleName: "rentals",
    description: "Marked KD-RNT-2026-0181 as returned and released deposit.",
    userName: "Admin User",
    status: "success",
    createdAt: "2026-05-12 10:25",
  },
  {
    id: "LOG-002",
    activityType: "LOW_STOCK_ALERT",
    moduleName: "inventory",
    description: "Mirror Work Bridal Lehenga available quantity reached threshold.",
    userName: "System",
    status: "success",
    createdAt: "2026-05-12 09:42",
  },
  {
    id: "LOG-003",
    activityType: "PAYMENT_FAILED",
    moduleName: "billing",
    description: "Payment failed for invoice KD-SAL-2026-0444.",
    userName: "System",
    status: "failed",
    createdAt: "2026-05-11 18:07",
  },
];

export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "PLAN-001",
    name: "Growth",
    price: 4999,
    durationDays: 30,
    maxUsers: 8,
    maxProducts: 1200,
    maxOrdersPerMonth: 2500,
    features: ["GST billing", "Rental returns", "Inventory audit"],
    isActive: true,
  },
  {
    id: "PLAN-002",
    name: "Enterprise",
    price: 12999,
    durationDays: 30,
    maxUsers: 35,
    maxProducts: 10000,
    maxOrdersPerMonth: 25000,
    features: ["Multi-branch", "Advanced reports", "Priority support"],
    isActive: true,
  },
];

export const mockDashboardData = {
  stats: {
    totalRevenue: "₹77,519",
    totalRevenueTrend: "+18.4%",
    totalOrders: "4",
    totalOrdersTrend: "+9.2%",
    activeRentals: "2",
    activeRentalsTrend: "-1 overdue",
    totalCustomers: "5",
    totalCustomersTrend: "+2 this month",
  },
  revenueData: [
    { name: "Jan", sales: 82000, rentals: 31000, subscriptions: 4999 },
    { name: "Feb", sales: 98000, rentals: 42000, subscriptions: 4999 },
    { name: "Mar", sales: 111000, rentals: 46000, subscriptions: 4999 },
    { name: "Apr", sales: 135000, rentals: 62000, subscriptions: 12999 },
    { name: "May", sales: 78519, rentals: 38500, subscriptions: 12999 },
  ],
  inventorySummary: [
    { name: "Designer Sarees", count: 24, available: 16, color: "bg-cyan-500" },
    { name: "Lehengas", count: 4, available: 1, color: "bg-rose-500" },
    { name: "Sherwanis", count: 7, available: 4, color: "bg-amber-500" },
    { name: "Accessories", count: 12, available: 8, color: "bg-emerald-500" },
  ],
  rentalAnalytics: [
    { name: "Upcoming", value: 1 },
    { name: "Active", value: 1 },
    { name: "Overdue", value: 1 },
    { name: "Completed", value: 1 },
  ],
};
