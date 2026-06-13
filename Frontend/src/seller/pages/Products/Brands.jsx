import React, { useState } from 'react';
import { useBrands } from '../../hooks/useBrands';
import { createBrand, updateBrand, deleteBrand } from '../../services/productService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Table } from '../../components/shared/Table';
import { SearchBar } from '../../components/shared/SearchBar';
import { FiPlus, FiEdit2, FiTrash2, FiLayers } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

export const Brands = () => {
  const { brands, loading, error, setBrands } = useBrands();
  const [search, setSearch] = useState('');

  // Modals & Form states
  const [isOpen, setIsOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: { name: '', description: '', logo: '', status: 'Active' }
  });

  // Open for Create
  const handleCreateOpen = () => {
    reset({ name: '', description: '', logo: '', status: 'Active' });
    setEditingBrand(null);
    setIsOpen(true);
  };

  // Open for Edit
  const handleEditOpen = (brd) => {
    setValue('name', brd.name);
    setValue('description', brd.description || '');
    setValue('logo', brd.logo || '');
    setValue('status', brd.status || 'Active');
    setEditingBrand(brd);
    setIsOpen(true);
  };

  // Open for Delete
  const handleDeleteOpen = (brd) => {
    setDeleteItem(brd);
    setDeleteOpen(true);
  };

  const onSubmit = async (data) => {
    setActionLoading(true);
    try {
      if (editingBrand) {
        // Edit brand
        const updated = await updateBrand(editingBrand._id, data);
        setBrands(prev => prev.map(b => b._id === editingBrand._id ? { ...b, ...updated } : b));
      } else {
        // Create brand
        const created = await createBrand(data);
        setBrands(prev => [...prev, created]);
      }
      setIsOpen(false);
    } catch (err) {
      alert("Error saving brand: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    setActionLoading(true);
    try {
      await deleteBrand(deleteItem._id);
      setBrands(prev => prev.filter(b => b._id !== deleteItem._id));
      setDeleteOpen(false);
      setDeleteItem(null);
    } catch (err) {
      alert("Error deleting brand: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Filtering
  const filteredBrands = brands.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    (b.description && b.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Brands</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage brand labels and manufacture settings.</p>
        </div>
        <Button 
          variant="primary" 
          onClick={handleCreateOpen}
          icon={FiPlus}
        >
          Add Brand
        </Button>
      </div>

      {/* Filter search bar */}
      <SearchBar 
        value={search} 
        onChange={setSearch} 
        placeholder="Search brands by name or description..." 
      />

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 border border-rose-200 dark:border-rose-900 rounded-xl">
          <p>{error}</p>
        </div>
      )}

      {/* Brands Table */}
      <Table
        headers={["Logo", "Name", "Description", "Status", "Actions"]}
        items={filteredBrands}
        loading={loading}
        emptyMessage="No brands found matching your query."
        renderRow={(brd) => (
          <>
            <td className="px-5 py-3.5">
              <img 
                src={brd.logo || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100"} 
                alt={brd.name} 
                className="w-10 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900" 
              />
            </td>
            <td className="px-5 py-3.5 text-sm font-bold text-slate-900 dark:text-white">{brd.name}</td>
            <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400 max-w-sm truncate">{brd.description || "—"}</td>
            <td className="px-5 py-3.5 text-sm">
              <Badge content={brd.status} />
            </td>
            <td className="px-5 py-3.5">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditOpen(brd)}
                  icon={FiEdit2}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteOpen(brd)}
                  className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                  icon={FiTrash2}
                />
              </div>
            </td>
          </>
        )}
      />

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={editingBrand ? "Edit Brand" : "Add New Brand"}
        footer={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={actionLoading}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit(onSubmit)} loading={actionLoading}>
              {editingBrand ? "Save Changes" : "Create Brand"}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Brand Name *</label>
            <input
              type="text"
              placeholder="e.g. Nike"
              {...register('name', { required: 'Brand name is required' })}
              className={`w-full px-3 py-2 rounded-lg border ${errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-800 focus:ring-lime-500'} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1`}
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1.5">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Logo Image URL</label>
            <input
              type="text"
              placeholder="https://images.unsplash.com/photo-..."
              {...register('logo')}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-lime-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Brand Status</label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-lime-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Description</label>
            <textarea
              placeholder="Describe the brand company background..."
              rows={3}
              {...register('description')}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-lime-500"
            />
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Confirm Brand Deletion"
        footer={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setDeleteOpen(false)} disabled={actionLoading}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete} loading={actionLoading} icon={FiTrash2}>Delete Brand</Button>
          </div>
        }
      >
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Are you sure you want to delete <strong className="text-slate-800 dark:text-white font-bold">{deleteItem?.name}</strong>? 
          This will delete the manufacturer record permanently.
        </p>
      </Modal>
    </div>
  );
};

export default Brands;
