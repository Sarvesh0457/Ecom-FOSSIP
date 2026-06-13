import axiosInstance from '../api/axiosInstance';
import { 
  mockDashboardStats, 
  mockMonthlyRevenue, 
  mockCategorySales, 
  mockBrandPerformance, 
  mockCustomerGrowth,
  mockTopProducts
} from '../data/mockAnalytics';
import { mockOrders } from '../data/mockOrders';

const USE_MOCK = true;

export const getDashboardStats = async () => {
  if (USE_MOCK) {
    // Return mock data after small delay to simulate api
    return {
      stats: mockDashboardStats,
      monthlyRevenue: mockMonthlyRevenue,
      categorySales: mockCategorySales,
      brandPerformance: mockBrandPerformance,
      customerGrowth: mockCustomerGrowth,
      topProducts: mockTopProducts,
      recentOrders: mockOrders.slice(0, 5)
    };
  }
  const response = await axiosInstance.get('/dashboard/stats');
  return response.data;
};
