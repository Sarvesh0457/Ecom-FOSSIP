import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { updateProduct } from '../../services/productService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/shared/Table';
import { SearchBar } from '../../components/shared/SearchBar';
import { Drawer } from '../../components/ui/Drawer';
import { FiAlertTriangle, FiCheckCircle, FiEdit3, FiSave } from 'react-icons/fi';

export const Inventory = () => {
  const [search, setSearch] = useState('');
  const [stockStatus, setStockStatus] = useState(''); // 'Low Stock' | 'Out of Stock' | ''
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setFilters({
      search,
      stockStatus
    });
  }, [search, stockStatus]);

  // Hook
  const { products, loading, error, setProducts } = useProducts(filters);

  // Quick Stock Edit state
  const [editingItem, setEditingItem] = useState(null);
  const [newStock, setNewStock] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Summary counts
  const totalItems = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 10).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  const handleEditStock = (product) => {
    setEditingItem(product);
    setNewStock(product.stock);
    setDrawerOpen(true);
  };

  const handleSaveStock = async () => {
    if (!editingItem) return;
    setIsSaving(true);
    try {
      const updated = await updateProduct(editingItem._id, { stock: newStock });
      // Update local state list
      setProducts(prev => prev.map(p => p._id === editingItem._id ? { ...p, stock: updated.stock } : p));
      setDrawerOpen(false);
      setEditingItem(null);
    } catch (err) {
      alert("Error saving stock: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Inventory Management</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Monitor stock levels, warnings, and trigger restocking.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-lime-50 dark:bg-lime-950/35 text-lime-600 dark:text-lime-500 shrink-0">
            <FiCheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Warehouse Stock</p>
            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">{loading ? "..." : totalItems.toLocaleString()} items</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-amber-250/30">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/35 text-amber-600 dark:text-amber-400 shrink-0">
            <FiAlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Low Stock Alerts</p>
            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">{loading ? "..." : lowStockCount} SKUs</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-rose-250/30">
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/35 text-rose-600 dark:text-rose-455 shrink-0">
            <FiAlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Out of Stock Items</p>
            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">{loading ? "..." : outOfStockCount} SKUs</h4>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Filter stock by SKU or name..."
      >
        <select
          value={stockStatus}
          onChange={(e) => setStockStatus(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs md:text-sm text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-lime-500"
        >
          <option value="">All Stock Statuses</option>
          <option value="Low Stock">Low Stock (1-10 items)</option>
          <option value="Out of Stock">Out of Stock (0 items)</option>
        </select>
      </SearchBar>

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-455 border border-rose-200 dark:border-rose-900 rounded-xl">
          <p>{error}</p>
        </div>
      )}

      {/* Table grid */}
      <Table
        headers={["Product info", "SKU", "Category", "Regular Price", "Current Stock", "Alert Status", "Action"]}
        items={products}
        loading={loading}
        emptyMessage="No stock items found matching your filters."
        renderRow={(prod) => {
          const isOutOfStock = prod.stock === 0;
          const isLowStock = prod.stock > 0 && prod.stock <= 10;
          return (
            <>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <img 
                    src={prod.images?.[0]} 
                    alt={prod.name} 
                    className="w-10 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-850" 
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-850 dark:text-white truncate max-w-[200px]">{prod.name}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-450">{prod.brand}</span>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3.5 text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">{prod.sku}</td>
              <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400">{prod.category}</td>
              <td className="px-5 py-3.5 text-sm font-bold text-slate-850 dark:text-slate-200">${prod.price}</td>
              <td className="px-5 py-3.5">
                <span className={`text-sm font-bold ${isOutOfStock ? 'text-rose-600' : isLowStock ? 'text-amber-600' : 'text-slate-800 dark:text-slate-200'}`}>
                  {prod.stock} units
                </span>
              </td>
              <td className="px-5 py-3.5">
                {isOutOfStock ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900">
                    Out of Stock
                  </span>
                ) : isLowStock ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900">
                    Low Stock Warning
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900">
                    In Stock
                  </span>
                )}
              </td>
              <td className="px-5 py-3.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditStock(prod)}
                  icon={FiEdit3}
                >
                  Edit Stock
                </Button>
              </td>
            </>
          );
        }}
      />

      {/* Quick Edit Stock Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Quick Adjust Stock"
        footer={
          <div className="flex items-center gap-2 justify-end">
            <Button variant="outline" onClick={() => setDrawerOpen(false)} disabled={isSaving}>Cancel</Button>
            <Button variant="primary" onClick={handleSaveStock} loading={isSaving} icon={FiSave}>
              Save Stock Level
            </Button>
          </div>
        }
      >
        {editingItem && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/65 rounded-xl border border-slate-100 dark:border-slate-800">
              <img src={editingItem.images?.[0]} alt={editingItem.name} className="w-16 h-16 object-cover rounded-lg" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{editingItem.name}</h4>
                <p className="text-xs text-slate-450 mt-1">SKU: <strong className="font-mono text-slate-600 dark:text-slate-300">{editingItem.sku}</strong></p>
                <p className="text-xs text-slate-450 mt-0.5">Current Stock: <strong className="text-slate-800 dark:text-white">{editingItem.stock} units</strong></p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">New Stock Level *</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setNewStock(prev => Math.max(0, prev - 1))}
                  className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 flex items-center justify-center text-lg active:scale-95"
                >
                  -
                </button>
                <input
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-24 px-3 py-2 text-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-bold text-base focus:outline-none focus:ring-1 focus:ring-lime-500"
                />
                <button
                  type="button"
                  onClick={() => setNewStock(prev => prev + 1)}
                  className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 flex items-center justify-center text-lg active:scale-95"
                >
                  +
                </button>
              </div>
              <p className="text-[10px] text-slate-450 mt-2">Adjust warehouse shelf quantities directly using step buttons or text inputs.</p>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Inventory;
