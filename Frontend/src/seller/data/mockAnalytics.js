export const mockDashboardStats = {
  totalRevenue: 54320.50,
  revenueChange: 12.5, // +12.5% compared to last month
  totalOrders: 1245,
  ordersChange: 8.3,
  totalCustomers: 840,
  customersChange: 15.2,
  averageOrderValue: 43.63,
  aovChange: 3.9
};

export const mockMonthlyRevenue = [
  { month: "Jan", revenue: 12000, orders: 280, customers: 120 },
  { month: "Feb", revenue: 15000, orders: 320, customers: 150 },
  { month: "Mar", revenue: 18500, orders: 410, customers: 190 },
  { month: "Apr", revenue: 14000, orders: 300, customers: 140 },
  { month: "May", revenue: 22000, orders: 490, customers: 210 },
  { month: "Jun", revenue: 24500, orders: 530, customers: 240 }
];

export const mockCategorySales = [
  { name: "Shirts", value: 8500, count: 210, color: "#84cc16" },
  { name: "Pants", value: 12400, count: 180, color: "#10B981" },
  { name: "Jackets", value: 14200, count: 120, color: "#F59E0B" },
  { name: "Shoes", value: 11500, count: 110, color: "#65a30d" },
  { name: "Dresses", value: 5400, count: 65, color: "#EC4899" },
  { name: "Accessories", value: 2320, count: 90, color: "#6B7280" }
];

export const mockBrandPerformance = [
  { name: "Zara", sales: 15400, itemsSold: 280 },
  { name: "Levi's", sales: 12800, itemsSold: 160 },
  { name: "Nike", sales: 11200, itemsSold: 115 },
  { name: "Gucci", sales: 8500, itemsSold: 25 },
  { name: "H&M", sales: 7400, itemsSold: 295 },
  { name: "Adidas", sales: 6200, itemsSold: 100 },
  { name: "Puma", sales: 3800, itemsSold: 65 }
];

export const mockCustomerGrowth = [
  { date: "06/01", newCustomers: 12, returningCustomers: 25 },
  { date: "06/03", newCustomers: 18, returningCustomers: 30 },
  { date: "06/05", newCustomers: 15, returningCustomers: 28 },
  { date: "06/07", newCustomers: 22, returningCustomers: 35 },
  { date: "06/09", newCustomers: 28, returningCustomers: 42 },
  { date: "06/10", newCustomers: 30, returningCustomers: 45 }
];

export const mockTopProducts = [
  { _id: "prod_6", name: "Leather Crossbody Bag", brand: "Gucci", category: "Accessories", sales: 12, revenue: 4799.88, stock: 12, rating: 5.0 },
  { _id: "prod_3", name: "Air Max Sneakers", brand: "Nike", category: "Shoes", sales: 35, revenue: 4199.65, stock: 5, rating: 4.8 },
  { _id: "prod_13", name: "Classic Wool Trench Coat", brand: "Zara", category: "Jackets", sales: 15, revenue: 2249.85, stock: 15, rating: 5.0 },
  { _id: "prod_1", name: "Classic Denim Jacket", brand: "Levi's", category: "Jackets", sales: 25, revenue: 1999.75, stock: 45, rating: 4.9 },
  { _id: "prod_10", name: "Premium Oxford Shirt", brand: "Zara", category: "Shirts", sales: 30, revenue: 1799.70, stock: 50, rating: 4.5 }
];

export const mockBanners = [
  { _id: "ban_1", title: "Summer Season Sale", subtitle: "Up to 50% Off", imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800", link: "/products?category=Dresses", isActive: true },
  { _id: "ban_2", title: "New Sneakers Arrival", subtitle: "Explore Nike & Puma", imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800", link: "/products?category=Shoes", isActive: true },
  { _id: "ban_3", title: "Premium Wool Collection", subtitle: "Luxury Coats & Jackets", imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800", link: "/products?category=Jackets", isActive: false }
];
