import axiosInstance from '../api/axiosInstance';
import { mockOrders } from '../data/mockOrders';

const USE_MOCK = true;

let localOrders = [...mockOrders];

export const getOrders = async (params) => {
  if (USE_MOCK) {
    let result = [...localOrders];
    if (params) {
      if (params.search) {
        const query = params.search.toLowerCase();
        result = result.filter(o => 
          o.orderNumber.toLowerCase().includes(query) || 
          o.customer.name.toLowerCase().includes(query) ||
          o.customer.email.toLowerCase().includes(query)
        );
      }
      if (params.status) {
        result = result.filter(o => o.status === params.status);
      }
    }
    return result;
  }
  const response = await axiosInstance.get('/orders', { params });
  return response.data;
};

export const getOrderById = async (id) => {
  if (USE_MOCK) return localOrders.find(o => o._id === id);
  const response = await axiosInstance.get(`/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  if (USE_MOCK) {
    const index = localOrders.findIndex(o => o._id === id);
    if (index !== -1) {
      localOrders[index] = { ...localOrders[index], status };
      return localOrders[index];
    }
    throw new Error("Order not found");
  }
  const response = await axiosInstance.put(`/orders/${id}/status`, { status });
  return response.data;
};

export const getOrdersByCustomerEmail = async (email) => {
  if (USE_MOCK) return localOrders.filter(o => o.customer.email.toLowerCase() === email.toLowerCase());
  const response = await axiosInstance.get('/orders', { params: { email } });
  return response.data;
};

export const createOrder = async (data) => {
  if (USE_MOCK) {
    const newOrder = {
      ...data,
      _id: "ord_" + Date.now().toString(),
      orderNumber: "ORD-2026-" + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      status: "Placed"
    };
    localOrders.unshift(newOrder);
    return newOrder;
  }
  const response = await axiosInstance.post('/orders', data);
  return response.data;
};
