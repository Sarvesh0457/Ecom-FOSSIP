// Customer Service - Mock implementation
import { mockCustomers } from "../data/mockCustomers";

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllCustomers = async (filters = {}) => {
  await delay(300);
  let result = [...mockCustomers];

  if (filters.search) {
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.email.toLowerCase().includes(filters.search.toLowerCase()),
    );
  }

  if (filters.status) {
    result = result.filter((c) => c.status === filters.status);
  }

  return result;
};

export const getCustomerById = async (customerId) => {
  await delay(200);
  return mockCustomers.find((c) => c._id === customerId) || null;
};

export const updateCustomerStatus = async (customerId, status) => {
  await delay(300);
  const customer = mockCustomers.find((c) => c._id === customerId);
  if (customer) {
    customer.status = status;
    return customer;
  }
  throw new Error("Customer not found");
};

export const deleteCustomer = async (customerId) => {
  await delay(300);
  const index = mockCustomers.findIndex((c) => c._id === customerId);
  if (index > -1) {
    const deleted = mockCustomers.splice(index, 1);
    return deleted[0];
  }
  throw new Error("Customer not found");
};

export const getCustomerOrders = async (customerId) => {
  await delay(300);
  const customer = mockCustomers.find((c) => c._id === customerId);
  if (customer) {
    return {
      customerId,
      totalOrders: customer.totalOrders,
      totalSpent: customer.totalSpent,
      lastOrderDate: customer.lastOrderDate,
    };
  }
  throw new Error("Customer not found");
};

export const searchCustomers = async (query) => {
  await delay(300);
  return mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase()) ||
      c.phone.includes(query),
  );
};
