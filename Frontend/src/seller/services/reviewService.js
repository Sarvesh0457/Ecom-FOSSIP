import axiosInstance from '../api/axiosInstance';
import { mockReviews } from '../data/mockReviews';

const USE_MOCK = true;

let localReviews = [...mockReviews];

export const getReviews = async (params) => {
  if (USE_MOCK) {
    let result = [...localReviews];
    if (params) {
      if (params.search) {
        const query = params.search.toLowerCase();
        result = result.filter(r => 
          r.productName.toLowerCase().includes(query) || 
          r.customerName.toLowerCase().includes(query) ||
          r.comment.toLowerCase().includes(query)
        );
      }
      if (params.status) {
        result = result.filter(r => r.status === params.status);
      }
      if (params.rating) {
        result = result.filter(r => r.rating === parseInt(params.rating, 10));
      }
    }
    return result;
  }
  const response = await axiosInstance.get('/reviews', { params });
  return response.data;
};

export const updateReviewStatus = async (id, status) => {
  if (USE_MOCK) {
    const index = localReviews.findIndex(r => r._id === id);
    if (index !== -1) {
      localReviews[index] = { ...localReviews[index], status };
      return localReviews[index];
    }
    throw new Error("Review not found");
  }
  const response = await axiosInstance.put(`/reviews/${id}/status`, { status });
  return response.data;
};

export const deleteReview = async (id) => {
  if (USE_MOCK) {
    localReviews = localReviews.filter(r => r._id !== id);
    return { success: true };
  }
  const response = await axiosInstance.delete(`/reviews/${id}`);
  return response.data;
};
