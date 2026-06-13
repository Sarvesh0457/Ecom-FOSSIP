import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useBrands } from '../../hooks/useBrands';
import { deleteProduct } from '../../services/productService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Drawer } from '../../components/ui/Drawer';
import { Modal } from '../../components/ui/Modal';
import { Table } from '../../components/shared/Table';
import { SearchBar } from '../../components/shared/SearchBar';
import { Pagination } from '../../components/shared/Pagination';
import { FiEye, FiEdit2, FiTrash2, FiPlusCircle, FiXCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const AllProducts = () => {
  const navigate = useNavigate();
  
  // States
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Drawer & Modal States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteProductItem, setDeleteProductItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filters object
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setFilters({
      search,
      category: selectedCategory,
      brand: selectedBrand
    });
    setCurrentPage(1); // Reset page on filter change
  }, [search, selectedCategory, selectedBrand]);

  // Hooks
  const { products, loading, error, setProducts, refetch } = useProducts(filters);
  const { categories } = useCategories();
  const { brands } = useBrands();

  // Sorting
  const getSortedProducts = () => {
    let list = [...products];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.price) - (b.price));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.price) - (a.price));
    } else if (sortBy === 'stock-asc') {
      list.sort((a, b) => a.stock - b.stock);
    } else if (sortBy === 'stock-desc') {
      list.sort((a, b) => b.stock - a.stock);
    }
    return list;
  };

  const sortedProducts = getSortedProducts();

  // Pagination calculations
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Delete Action Handler
  const handleDeleteConfirm = async () => {
    if (!deleteProductItem) return;
    setIsDeleting(true);
    try {
      await deleteProduct(deleteProductItem._id);
      // Remove from state
      setProducts(prev => prev.filter(p => p._id !== deleteProductItem._id));
      setModalOpen(false);
      setDeleteProductItem(null);
      if (selectedProduct?._id === deleteProductItem._id) {
        setDrawerOpen(false);
        setSelectedProduct(null);
      }
    } catch (err) {
      alert("Error deleting product: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteModal = (product) => {
    setDeleteProductItem(product);
    setModalOpen(true);
  };

  const openDetailsDrawer = (product) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">All Products</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage, filter, and modify catalog items.</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => navigate('/products/add')}
          icon={FiPlusCircle}
        >
          Add Product
        </Button>
      </div>

      {/* Filters Search Bar */}
      <SearchBar 
        value={search} 
        onChange={setSearch} 
        placeholder="Search by product name or SKU..."
      >
        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs md:text-sm text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-lime-500"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>

        {/* Brand Dropdown */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs md:text-sm text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-lime-500"
        >
          <option value="">All Brands</option>
          {brands.map(brd => (
            <option key={brd._id} value={brd.name}>{brd.name}</option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs md:text-sm text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-lime-500"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="stock-asc">Stock: Low to High</option>
          <option value="stock-desc">Stock: High to Low</option>
        </select>
      </SearchBar>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 border border-rose-200 dark:border-rose-900 rounded-xl">
          <p>{error}</p>
        </div>
      )}

      {/* Table grid */}
      <Table 
        headers={["Image", "Name", "SKU", "Category", "Brand", "Price", "Stock", "Status", "Actions"]}
        items={currentItems}
        loading={loading}
        emptyMessage="No products match your search/filter criteria."
        renderRow={(prod) => {
          const discount = prod.discountPrice;
          return (
            <>
              {/* Image */}
              <td className="px-5 py-3.5">
                <img 
                  src={prod.images?.[0] || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100"} 
                  alt={prod.name} 
                  className="w-12 h-12 object-cover rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950" 
                />
              </td>
              {/* Name & Bestseller Badge */}
              <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">
                <div className="flex flex-col">
                  <span className="truncate max-w-[200px]">{prod.name}</span>
                  {prod.isBestseller && (
                    <span className="inline-block w-fit px-1.5 py-0.2 mt-1 rounded text-[9px] font-extrabold tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-450 border border-amber-500/20 uppercase">
                      Bestseller
                    </span>
                  )}
                </div>
              </td>
              {/* SKU */}
              <td className="px-5 py-3.5 text-xs font-mono font-semibold text-slate-455 dark:text-slate-400">{prod.sku}</td>
              {/* Category */}
              <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400">{prod.category}</td>
              {/* Brand */}
              <td className="px-5 py-3.5 text-sm text-slate-700 dark:text-slate-300 font-medium">{prod.brand}</td>
              {/* Price */}
              <td className="px-5 py-3.5">
                <div className="flex flex-col text-sm">
                  {discount ? (
                    <>
                      <span className="font-bold text-slate-850 dark:text-slate-200">${discount}</span>
                      <span className="text-xs text-slate-400 line-through">${prod.price}</span>
                    </>
                  ) : (
                    <span className="font-bold text-slate-850 dark:text-slate-200">${prod.price}</span>
                  )}
                </div>
              </td>
              {/* Stock */}
              <td className="px-5 py-3.5">
                {prod.stock === 0 ? (
                  <Badge content="Cancelled" className="bg-rose-50 text-rose-700 dark:bg-rose-950/20" /> // Using Cancelled as red badge
                ) : prod.stock <= 10 ? (
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-450 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-550/20">
                    Low: {prod.stock}
                  </span>
                ) : (
                  <span className="text-sm font-medium text-slate-655 dark:text-slate-400">{prod.stock} items</span>
                )}
              </td>
              {/* Status */}
              <td className="px-5 py-3.5">
                <Badge content={prod.status} />
              </td>
              {/* Actions */}
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => openDetailsDrawer(prod)}
                    icon={FiEye}
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate(`/products/edit/${prod._id}`)}
                    icon={FiEdit2}
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => openDeleteModal(prod)}
                    className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                    icon={FiTrash2}
                  />
                </div>
              </td>
            </>
          );
        }}
      />

      {/* Pagination component */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />

      {/* Product Details Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Product Details"
        footer={
          <div className="flex items-center gap-2 justify-end">
            <Button 
              variant="outline" 
              onClick={() => setDrawerOpen(false)}
            >
              Close
            </Button>
            <Button 
              variant="primary" 
              onClick={() => {
                setDrawerOpen(false);
                navigate(`/products/edit/${selectedProduct?._id}`);
              }}
              icon={FiEdit2}
            >
              Edit Product
            </Button>
          </div>
        }
      >
        {selectedProduct && (
          <div className="space-y-6">
            {/* Image gallery */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Product Images</p>
              <div className="grid grid-cols-2 gap-3">
                {selectedProduct.images?.map((img, i) => (
                  <img 
                    key={i} 
                    src={img} 
                    alt={`Product view ${i+1}`} 
                    className="w-full h-48 object-cover rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shadow-sm" 
                  />
                ))}
              </div>
            </div>

            {/* General Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Name</p>
                <p className="text-base font-bold text-slate-850 dark:text-white mt-1">{selectedProduct.name}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">SKU Code</p>
                <p className="text-sm font-mono font-semibold text-slate-700 dark:text-slate-350 mt-1">{selectedProduct.sku}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category</p>
                <p className="text-sm text-slate-750 dark:text-slate-300 mt-1">{selectedProduct.category}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Brand</p>
                <p className="text-sm text-slate-750 dark:text-slate-300 mt-1 font-semibold">{selectedProduct.brand}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pricing</p>
                <p className="text-sm mt-1">
                  {selectedProduct.discountPrice ? (
                    <span>
                      <strong className="text-slate-900 dark:text-white font-bold text-base">${selectedProduct.discountPrice}</strong>
                      <span className="text-slate-400 line-through text-xs ml-2">${selectedProduct.price}</span>
                    </span>
                  ) : (
                    <strong className="text-slate-900 dark:text-white font-bold text-base">${selectedProduct.price}</strong>
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inventory / Stock</p>
                <p className="text-sm mt-1">
                  {selectedProduct.stock === 0 ? (
                    <Badge content="Cancelled" />
                  ) : (
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedProduct.stock} items available</span>
                  )}
                </p>
              </div>
            </div>

            {/* Sizes & Colors */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Available Sizes</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.sizes?.map((size, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950">{size}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Available Colors</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.colors?.map((col, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full border border-slate-300/40 bg-current" style={{ color: col.toLowerCase() }} />
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Created At */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Listing Date</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {new Date(selectedProduct.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
              </p>
            </div>
          </div>
        )}
      </Drawer>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Deletion"
        footer={
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => setModalOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDeleteConfirm}
              loading={isDeleting}
              icon={FiTrash2}
            >
              Delete Item
            </Button>
          </div>
        }
      >
        <div className="flex items-start gap-4">
          <div className="p-2 bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-450 rounded-xl shrink-0">
            <FiXCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Permanently delete this product?</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-800 dark:text-white font-bold">{deleteProductItem?.name}</strong>? This action will remove the listing entirely and cannot be undone.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllProducts;
