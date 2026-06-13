import React, { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { createCategory, updateCategory, deleteCategory } from '../../services/productService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Table } from '../../components/shared/Table';
import { SearchBar } from '../../components/shared/SearchBar';
import { FiPlus, FiEdit2, FiTrash2, FiFolder } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

export const Categories = () => {
  const { categories, loading, error, setCategories } = useCategories();
  const [search, setSearch] = useState('');

  // Modals & Form states
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: { name: '', description: '' }
  });

  // Open for Create
  const handleCreateOpen = () => {
    reset({ name: '', description: '' });
    setEditingCategory(null);
    setIsOpen(true);
  };

  // Open for Edit
  const handleEditOpen = (cat) => {
    setValue('name', cat.name);
    setValue('description', cat.description || '');
    setEditingCategory(cat);
    setIsOpen(true);
  };

  // Open for Delete
  const handleDeleteOpen = (cat) => {
    setDeleteItem(cat);
    setDeleteOpen(true);
  };

  const onSubmit = async (data) => {
    setActionLoading(true);
    try {
      if (editingCategory) {
        // Edit category
        const updated = await updateCategory(editingCategory._id, data);
        setCategories(prev => prev.map(c => c._id === editingCategory._id ? { ...c, ...updated } : c));
      } else {
        // Create category
        const created = await createCategory(data);
        setCategories(prev => [...prev, created]);
      }
      setIsOpen(false);
    } catch (err) {
      alert("Error saving category: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    setActionLoading(true);
    try {
      await deleteCategory(deleteItem._id);
      setCategories(prev => prev.filter(c => c._id !== deleteItem._id));
      setDeleteOpen(false);
      setDeleteItem(null);
    } catch (err) {
      alert("Error deleting category: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Filtering
  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Categories</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage catalog collection classifications.</p>
        </div>
        <Button 
          variant="primary" 
          onClick={handleCreateOpen}
          icon={FiPlus}
        >
          Add Category
        </Button>
      </div>

      {/* Filter search bar */}
      <SearchBar 
        value={search} 
        onChange={setSearch} 
        placeholder="Search categories by name or description..." 
      />

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 border border-rose-200 dark:border-rose-900 rounded-xl">
          <p>{error}</p>
        </div>
      )}

      {/* Categories Table */}
      <Table
        headers={["Icon", "Name", "Description", "Items Associated", "Actions"]}
        items={filteredCategories}
        loading={loading}
        emptyMessage="No categories found matching your query."
        renderRow={(cat) => (
          <>
            <td className="px-5 py-3.5">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-lime-50 dark:bg-lime-950/30 text-lime-600 dark:text-lime-500">
                <FiFolder className="w-4.5 h-4.5" />
              </span>
            </td>
            <td className="px-5 py-3.5 text-sm font-bold text-slate-900 dark:text-white">{cat.name}</td>
            <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400 max-w-xs truncate">{cat.description || "—"}</td>
            <td className="px-5 py-3.5 text-sm font-medium">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {cat.itemCount || 0} products
              </span>
            </td>
            <td className="px-5 py-3.5">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditOpen(cat)}
                  icon={FiEdit2}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteOpen(cat)}
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
        title={editingCategory ? "Edit Category" : "Add New Category"}
        footer={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={actionLoading}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit(onSubmit)} loading={actionLoading}>
              {editingCategory ? "Save Changes" : "Create Category"}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Category Name *</label>
            <input
              type="text"
              placeholder="e.g. Shirts"
              {...register('name', { required: 'Category name is required' })}
              className={`w-full px-3 py-2 rounded-lg border ${errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-800 focus:ring-lime-500'} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1`}
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1.5">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Description</label>
            <textarea
              placeholder="Describe what items go into this category..."
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
        title="Confirm Category Deletion"
        footer={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setDeleteOpen(false)} disabled={actionLoading}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete} loading={actionLoading} icon={FiTrash2}>Delete Category</Button>
          </div>
        }
      >
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Are you sure you want to delete <strong className="text-slate-800 dark:text-white font-bold">{deleteItem?.name}</strong>? 
          Any product mapped to this category will remain, but their category link will need updating. This action is permanent.
        </p>
      </Modal>
    </div>
  );
};

export default Categories;
