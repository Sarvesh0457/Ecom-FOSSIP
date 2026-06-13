import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/shared/Table';
import { 
  RevenueAreaChart, 
  CategoryPieChart, 
  BrandBarChart, 
  CustomerLineChart 
} from '../../components/shared/Charts';
import { 
  FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp,
  FiArrowUpRight, FiArrowDownRight, FiPlusCircle, FiEye
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { data, loading, error } = useDashboard();
  const navigate = useNavigate();

  if (error) {
    return (
      <div className="p-6 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 border border-rose-200 dark:border-rose-900 rounded-xl">
        <p className="font-semibold">Failed to load dashboard data: {error}</p>
      </div>
    );
  }

  // Fallbacks if data is loading/null
  const stats = data?.stats || {
    totalRevenue: 0, revenueChange: 0,
    totalOrders: 0, ordersChange: 0,
    totalCustomers: 0, customersChange: 0,
    averageOrderValue: 0, aovChange: 0
  };

  const statCardsData = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: stats.revenueChange,
      icon: FiDollarSign,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-450",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      change: stats.ordersChange,
      icon: FiShoppingBag,
      color: "from-lime-500/20 to-green-500/20 text-lime-600 dark:text-lime-500",
    },
    {
      title: "Customers",
      value: stats.totalCustomers.toLocaleString(),
      change: stats.customersChange,
      icon: FiUsers,
      color: "from-lime-500/20 to-lime-600/20 text-lime-600 dark:text-lime-400",
    },
    {
      title: "Avg Order Value",
      value: `$${stats.averageOrderValue.toLocaleString()}`,
      change: stats.aovChange,
      icon: FiTrendingUp,
      color: "from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Real-time statistics & business insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate('/reports')}
            icon={FiTrendingUp}
          >
            Analytics Reports
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate('/products/add')}
            icon={FiPlusCircle}
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCardsData.map((card, i) => {
          const IconComp = card.icon;
          const isPositive = card.change >= 0;
          return (
            <Card key={i} className="relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{card.title}</p>
                  {loading ? (
                    <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 animate-pulse rounded mt-1"></div>
                  ) : (
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{card.value}</h3>
                  )}
                </div>
                <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${card.color} shrink-0`}>
                  <IconComp className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-4 text-xs font-medium">
                {isPositive ? (
                  <span className="flex items-center text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded-md">
                    <FiArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    +{card.change}%
                  </span>
                ) : (
                  <span className="flex items-center text-rose-600 dark:text-rose-450 bg-rose-50 dark:bg-rose-950/20 px-1.5 py-0.5 rounded-md">
                    <FiArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                    {card.change}%
                  </span>
                )}
                <span className="text-slate-450 dark:text-slate-500">vs last month</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Area Chart */}
        <Card title="Revenue Trend" subtitle="Monthly earnings chart">
          {loading ? (
            <div className="h-[300px] w-full bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg"></div>
          ) : (
            <RevenueAreaChart data={data?.monthlyRevenue || []} />
          )}
        </Card>

        {/* Customer Growth Line Chart */}
        <Card title="Customer Acquisition" subtitle="New vs Returning users">
          {loading ? (
            <div className="h-[300px] w-full bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg"></div>
          ) : (
            <CustomerLineChart data={data?.customerGrowth || []} />
          )}
        </Card>

        {/* Sales Category Pie Chart */}
        <Card title="Sales by Category" subtitle="Share of category revenue">
          {loading ? (
            <div className="h-[300px] w-full bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg flex items-center justify-center"></div>
          ) : (
            <CategoryPieChart data={data?.categorySales || []} />
          )}
        </Card>

        {/* Brand Bar Chart */}
        <Card title="Brand Performance" subtitle="Top performing brands by revenue">
          {loading ? (
            <div className="h-[300px] w-full bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg"></div>
          ) : (
            <BrandBarChart data={data?.brandPerformance || []} />
          )}
        </Card>
      </div>

      {/* Lists / Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card 
          title="Recent Orders" 
          subtitle="Latest transactions" 
          action={
            <Link to="/orders" className="text-xs font-semibold text-lime-600 hover:text-lime-700 dark:text-lime-500 dark:hover:text-lime-400">
              View All
            </Link>
          }
        >
          <Table 
            headers={["Order No.", "Customer", "Amount", "Status", "Action"]}
            items={data?.recentOrders || []}
            loading={loading}
            renderRow={(order) => (
              <>
                <td className="px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white">{order.orderNumber}</td>
                <td className="px-5 py-3.5">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-850 dark:text-slate-200">{order.customer.name}</span>
                    <span className="text-xs text-slate-450 dark:text-slate-500">{order.customer.email}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm font-bold text-slate-850 dark:text-slate-250">${order.totalAmount.toLocaleString()}</td>
                <td className="px-5 py-3.5">
                  <Badge content={order.status} />
                </td>
                <td className="px-5 py-3.5">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate(`/orders?id=${order._id}`)}
                    icon={FiEye}
                  >
                    View
                  </Button>
                </td>
              </>
            )}
          />
        </Card>

        {/* Top Selling Products */}
        <Card 
          title="Top Selling Products" 
          subtitle="Top performing items by sales count"
          action={
            <Link to="/products" className="text-xs font-semibold text-lime-600 hover:text-lime-700 dark:text-lime-500 dark:hover:text-lime-400">
              View All
            </Link>
          }
        >
          <Table 
            headers={["Product", "Category", "Sales", "Revenue", "Stock"]}
            items={data?.topProducts || []}
            loading={loading}
            renderRow={(prod) => (
              <>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 border dark:bg-slate-800 dark:border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                      <span className="font-bold text-xs text-lime-700">P</span>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-850 dark:text-slate-200 truncate max-w-[150px]">{prod.name}</span>
                      <span className="text-[10px] font-medium text-slate-450 uppercase">{prod.brand}</span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400">{prod.category}</td>
                <td className="px-5 py-3.5 text-sm font-bold text-slate-850 dark:text-slate-200">{prod.sales} sold</td>
                <td className="px-5 py-3.5 text-sm font-bold text-emerald-600 dark:text-emerald-450">${prod.revenue.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-sm font-medium">
                  {prod.stock === 0 ? (
                    <span className="text-rose-600 font-semibold dark:text-rose-450">Out of Stock</span>
                  ) : (
                    <span className="text-slate-650 dark:text-slate-400">{prod.stock} left</span>
                  )}
                </td>
              </>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
