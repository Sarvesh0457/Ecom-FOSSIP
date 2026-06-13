import React, { useState } from "react";
import { useCustomers } from "../../hooks/useCustomers";
import { updateCustomerStatus } from "../../services/customerService";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Table } from "../../components/shared/Table";
import { SearchBar } from "../../components/shared/SearchBar";
import { Pagination } from "../../components/shared/Pagination";
import { Drawer } from "../../components/ui/Drawer";
import {
  FiEye,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShoppingBag,
  FiCalendar,
} from "react-icons/fi";
import "./Customers.css";

const Customers = () => {
  // Filters state
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Drawer state
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  // Hook
  const { customers, loading, error, setCustomers } = useCustomers({
    search,
    status,
  });

  // Pagination
  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleStatusChange = async (customerId, newStatus) => {
    setStatusLoading(true);
    try {
      const updated = await updateCustomerStatus(customerId, newStatus);
      setCustomers((prev) =>
        prev.map((c) =>
          c._id === customerId ? { ...c, status: updated.status } : c,
        ),
      );
      if (selectedCustomer && selectedCustomer._id === customerId) {
        setSelectedCustomer((prev) => ({ ...prev, status: updated.status }));
      }
    } catch (err) {
      alert("Error updating customer status: " + err.message);
    } finally {
      setStatusLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Customers
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your customer base, view purchase history, and track customer
          engagement.
        </p>
      </div>

      {/* Search and Filters */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search customers by name, email, or phone..."
      >
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs md:text-sm text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-lime-500"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </SearchBar>

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-455 border border-rose-200 dark:border-rose-900 rounded-xl">
          <p>{error}</p>
        </div>
      )}

      {/* Table list */}
      <Table
        headers={[
          "Customer Name",
          "Email",
          "Phone",
          "Total Orders",
          "Total Spent",
          "Status",
          "Action",
        ]}
        items={currentItems}
        loading={loading}
        emptyMessage="No customers found matching your search filters."
        renderRow={(customer) => (
          <>
            <td className="px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white">
              {customer.name}
            </td>
            <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400">
              {customer.email}
            </td>
            <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400">
              {customer.phone}
            </td>
            <td className="px-5 py-3.5">
              <div className="flex items-center gap-2">
                <FiShoppingBag className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {customer.totalOrders}
                </span>
              </div>
            </td>
            <td className="px-5 py-3.5 text-sm font-extrabold text-slate-900 dark:text-white">
              ${customer.totalSpent.toLocaleString()}
            </td>
            <td className="px-5 py-3.5">
              <Badge content={customer.status} />
            </td>
            <td className="px-5 py-3.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCustomer(customer);
                  setDrawerOpen(true);
                }}
                icon={FiEye}
              >
                Details
              </Button>
            </td>
          </>
        )}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Details Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedCustomer?.name}
        subtitle={selectedCustomer?.email}
      >
        {selectedCustomer && (
          <div className="space-y-6">
            {/* Customer Info Card */}
            <Card className="p-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FiMail className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Email
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {selectedCustomer.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Phone
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {selectedCustomer.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiMapPin className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Location
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {selectedCustomer.city}, {selectedCustomer.country}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Purchase History */}
            <Card className="p-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Purchase History
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-lime-50 dark:bg-lime-950/20 p-3 rounded-lg">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-lime-600 dark:text-lime-400">
                    {selectedCustomer.totalOrders}
                  </p>
                </div>
                <div className="bg-sky-50 dark:bg-sky-950/20 p-3 rounded-lg">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Total Spent
                  </p>
                  <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                    ${selectedCustomer.totalSpent}
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Member Since
                  </p>
                  <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    {new Date(selectedCustomer.joinDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Last Order
                  </p>
                  <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                    {new Date(
                      selectedCustomer.lastOrderDate,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>

            {/* Status Management */}
            <Card className="p-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Account Status
              </h3>
              <div className="flex items-center justify-between mb-4">
                <Badge content={selectedCustomer.status} />
              </div>
              <div className="flex gap-3">
                <Button
                  variant={
                    selectedCustomer.status === "Active" ? "primary" : "ghost"
                  }
                  size="sm"
                  onClick={() =>
                    handleStatusChange(selectedCustomer._id, "Active")
                  }
                  disabled={statusLoading}
                >
                  Activate
                </Button>
                <Button
                  variant={
                    selectedCustomer.status === "Inactive" ? "primary" : "ghost"
                  }
                  size="sm"
                  onClick={() =>
                    handleStatusChange(selectedCustomer._id, "Inactive")
                  }
                  disabled={statusLoading}
                >
                  Deactivate
                </Button>
              </div>
            </Card>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Customers;
