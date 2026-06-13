import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './ProtectedRoute';

// Pages lazy/direct imports
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { AllProducts } from '../pages/Products/AllProducts';
import { AddProduct } from '../pages/Products/AddProduct';
import { Categories } from '../pages/Products/Categories';
import { Brands } from '../pages/Products/Brands';
import { Inventory } from '../pages/Inventory/Inventory';
import { Orders } from '../pages/Orders/Orders';
import { Customers } from '../pages/Customers/Customers';
import { Reviews } from '../pages/Reviews/Reviews';
import { Coupons } from '../pages/Marketing/Coupons';
import { Banners } from '../pages/Marketing/Banners';
import { Reports } from '../pages/Reports/Reports';
import { Notifications } from '../pages/Notifications/Notifications';
import { StoreSettings } from '../pages/Settings/StoreSettings';
import { Profile } from '../pages/Settings/Profile';
import { Login } from '../pages/Auth/Login';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Layout Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<AddProduct isEdit={true} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/banners" element={<Banners />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<StoreSettings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Fallback Redirection */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
