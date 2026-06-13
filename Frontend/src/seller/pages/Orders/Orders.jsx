import React, { useState, useEffect } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { updateOrderStatus, getOrderById } from '../../services/orderService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/shared/Table';
import { SearchBar } from '../../components/shared/SearchBar';
import { Pagination } from '../../components/shared/Pagination';
import { Drawer } from '../../components/ui/Drawer';
import { FiEye, FiTrendingUp, FiMapPin, FiMail, FiUser, FiCalendar, FiClock } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

export const Orders = () => {
  const [searchParams] = useSearchParams();
  const directOrderId = searchParams.get('id');

  // Filters state
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Drawer state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  // Hook
  const { orders, loading, error, setOrders } = useOrders({ search, status });

  // Direct order redirection from dashboard
  useEffect(() => {
    if (directOrderId && orders.length > 0) {
      const ord = orders.find(o => o._id === directOrderId);
      if (ord) {
        setSelectedOrder(ord);
        setDrawerOpen(true);
      }
    }
  }, [directOrderId, orders]);

  // Pagination
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setStatusLoading(true);
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      // Update order list state
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: updated.status } : o));
      // Update drawer state
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: updated.status }));
      }
    } catch (err) {
      alert("Error updating order status: " + err.message);
    } finally {
      setStatusLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Orders</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">View transaction details, update delivery states, and track fulfillment.</p>
      </div>

      {/* Search and Filters */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search orders by number, customer name or email..."
      >
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setCurrentPage(1); }}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs md:text-sm text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-lime-500"
        >
          <option value="">All Statuses</option>
          <option value="Placed">Placed</option>
          <option value="Packed">Packed</option>
          <option value="Shipped">Shipped</option>
          <option value="Out For Delivery">Out For Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </SearchBar>

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-455 border border-rose-200 dark:border-rose-900 rounded-xl">
          <p>{error}</p>
        </div>
      )}

      {/* Table list */}
      <Table
        headers={["Order Number", "Customer Name", "Order Date", "Items Count", "Total Amount", "Fulfillment", "Action"]}
        items={currentItems}
        loading={loading}
        emptyMessage="No orders found matching your search filters."
        renderRow={(order) => {
          const itemCount = order.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
          return (
            <>
              <td className="px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white">{order.orderNumber}</td>
              <td className="px-5 py-3.5">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-850 dark:text-slate-200">{order.customer.name}</span>
                  <span className="text-xs text-slate-450 dark:text-slate-500">{order.customer.email}</span>
                </div>
              </td>
              <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400">
                {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
              </td>
              <td className="px-5 py-3.5 text-sm text-slate-700 dark:text-slate-300 font-medium">{itemCount} items</td>
              <td className="px-5 py-3.5 text-sm font-extrabold text-slate-900 dark:text-white">${order.totalAmount.toLocaleString()}</td>
              <td className="px-5 py-3.5">
                <Badge content={order.status} />
              </td>
              <td className="px-5 py-3.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setSelectedOrder(order); setDrawerOpen(true); }}
                  icon={FiEye}
                >
                  Details
                </Button>
              </td>
            </>
          );
        }}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Order Details Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={`Order Details: ${selectedOrder?.orderNumber}`}
        footer={
          <div className="flex items-center gap-2 justify-end">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>Close Details</Button>
          </div>
        }
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Status Adjustment Card */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Current Status</span>
                <div className="mt-1">
                  <Badge content={selectedOrder.status} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Update Status</label>
                <select
                  disabled={statusLoading}
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-lime-500"
                >
                  <option value="Placed">Placed</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-455 dark:text-slate-400 uppercase tracking-wider">Customer Details</h4>
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  <FiUser className="w-4 h-4 text-slate-400" />
                  <span>{selectedOrder.customer.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FiMail className="w-4 h-4 text-slate-400" />
                  <span>{selectedOrder.customer.email}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <FiMapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{selectedOrder.shippingAddress}</span>
                </div>
              </div>
            </div>

            {/* Time stamps */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-455 dark:text-slate-400 uppercase tracking-wider">Order Timeline</h4>
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  <FiCalendar className="w-4 h-4 text-slate-400" />
                  <span>Date Placed: {new Date(selectedOrder.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FiClock className="w-4 h-4 text-slate-400" />
                  <span>Time Placed: {new Date(selectedOrder.createdAt).toLocaleTimeString(undefined, { timeStyle: 'short' })}</span>
                </div>
              </div>
            </div>

            {/* Items Purchased */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-455 dark:text-slate-400 uppercase tracking-wider">Ordered Items</h4>
              <div className="border border-slate-200/60 dark:border-slate-800/80 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between gap-4 text-sm hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                      <div>
                        <h5 className="font-bold text-slate-900 dark:text-white">{item.name}</h5>
                        <p className="text-xs text-slate-450 mt-1 flex flex-wrap items-center gap-2">
                          <span>Size: <strong className="text-slate-700 dark:text-slate-350">{item.size}</strong></span>
                          <span className="text-slate-300">|</span>
                          <span className="flex items-center gap-1">
                            Color: 
                            <span className="w-2 h-2 rounded-full bg-current border border-slate-300/40" style={{ color: item.color.toLowerCase() }} />
                            <strong className="text-slate-700 dark:text-slate-350">{item.color}</strong>
                          </span>
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-slate-850 dark:text-slate-200">${item.price}</p>
                        <p className="text-xs text-slate-450 mt-0.5">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Total amount summary */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-slate-850 dark:text-white">Order Total</span>
                  <span className="font-extrabold text-lime-600 dark:text-lime-500 text-base">${selectedOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Orders;
