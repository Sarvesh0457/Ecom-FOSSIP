import React, { useState, useEffect } from 'react';
import { useReviews } from '../../hooks/useReviews';
import { updateReviewStatus, deleteReview } from '../../services/reviewService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/shared/Table';
import { SearchBar } from '../../components/shared/SearchBar';
import { Pagination } from '../../components/shared/Pagination';
import { Modal } from '../../components/ui/Modal';
import { FiCheck, FiX, FiTrash2, FiStar, FiAlertCircle } from 'react-icons/fi';

export const Reviews = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [rating, setRating] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Actions loading/modals
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Filters object
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setFilters({ search, status, rating });
    setCurrentPage(1);
  }, [search, status, rating]);

  // Hook
  const { reviews, loading, error, setReviews } = useReviews(filters);

  // Pagination
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleModerate = async (id, newStatus) => {
    setActionLoading(true);
    try {
      const updated = await updateReviewStatus(id, newStatus);
      // Update state
      setReviews(prev => prev.map(r => r._id === id ? { ...r, status: updated.status } : r));
    } catch (err) {
      alert("Error moderating review: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteOpen = (rev) => {
    setDeleteItem(rev);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    setActionLoading(true);
    try {
      await deleteReview(deleteItem._id);
      setReviews(prev => prev.filter(r => r._id !== deleteItem._id));
      setDeleteOpen(false);
      setDeleteItem(null);
    } catch (err) {
      alert("Error deleting review: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Render star ratings
  const renderStars = (count) => {
    return (
      <div className="flex items-center gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, idx) => (
          <FiStar 
            key={idx} 
            className={`w-3.5 h-3.5 ${idx < count ? 'fill-amber-400' : 'text-slate-200 dark:text-slate-800'}`} 
          />
        ))}
      </div>
    );
  };

  // Summary counts
  const pendingCount = reviews.filter(r => r.status === 'Pending').length;
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Product Reviews</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Moderate customer ratings, approve feedback, and monitor quality scores.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/35 text-amber-500 shrink-0">
            <FiStar className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Store Rating</p>
            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">{loading ? "..." : avgRating} / 5.0 stars</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-lime-50 dark:bg-lime-950/35 text-lime-600 dark:text-lime-500 shrink-0">
            <FiAlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Moderations</p>
            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">{loading ? "..." : pendingCount} reviews</h4>
          </div>
        </Card>
      </div>

      {/* Filters & Search */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Filter by customer name, product name or comment contents..."
      >
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs md:text-sm text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-lime-500"
        >
          <option value="">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs md:text-sm text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-lime-500"
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </SearchBar>

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-650 dark:text-rose-455 border border-rose-200 dark:border-rose-900 rounded-xl">
          <p>{error}</p>
        </div>
      )}

      {/* Moderation Table */}
      <Table
        headers={["Product info", "Customer", "Rating", "Comment", "Status", "Actions"]}
        items={currentItems}
        loading={loading}
        emptyMessage="No reviews found matching your search filters."
        renderRow={(rev) => (
          <>
            <td className="px-5 py-3.5 text-sm font-bold text-slate-900 dark:text-white truncate max-w-[150px]">{rev.productName}</td>
            <td className="px-5 py-3.5">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-850 dark:text-slate-200">{rev.customerName}</span>
                <span className="text-[10px] text-slate-450 mt-0.5">{new Date(rev.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
              </div>
            </td>
            <td className="px-5 py-3.5">
              {renderStars(rev.rating)}
            </td>
            <td className="px-5 py-3.5 text-xs text-slate-600 dark:text-slate-400 max-w-sm whitespace-normal break-words leading-relaxed">
              "{rev.comment}"
            </td>
            <td className="px-5 py-3.5">
              <Badge content={rev.status} />
            </td>
            <td className="px-5 py-3.5">
              <div className="flex items-center gap-1">
                {rev.status !== 'Approved' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                    disabled={actionLoading}
                    onClick={() => handleModerate(rev._id, 'Approved')}
                    icon={FiCheck}
                  >
                    Approve
                  </Button>
                )}
                {rev.status !== 'Rejected' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/20"
                    disabled={actionLoading}
                    onClick={() => handleModerate(rev._id, 'Rejected')}
                    icon={FiX}
                  >
                    Reject
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-rose-500 hover:text-rose-650 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                  disabled={actionLoading}
                  onClick={() => handleDeleteOpen(rev)}
                  icon={FiTrash2}
                />
              </div>
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Review"
        footer={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setDeleteOpen(false)} disabled={actionLoading}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete} loading={actionLoading} icon={FiTrash2}>Delete Review</Button>
          </div>
        }
      >
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Are you sure you want to delete this review from the database? This action is permanent and cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default Reviews;
