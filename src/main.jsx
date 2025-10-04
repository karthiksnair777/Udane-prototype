import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// POS Imports
import { posRoutes } from './routes/POSRoutes';
import POSLogin from './pos/POSLogin';
import POSProducts from './pos/POSProducts';
import POSCheckout from './pos/POSCheckout';
import POSPrint from './pos/POSPrint';
import POSOrder from './pos/POSOrder';
import POSDashboard from './pos/POSDashboard';
import POSManageProducts from './pos/POSManageProducts';

// Customer Imports
import { customerRoutes } from './routes/CustomerRoutes';
import CustomerLogin from './customer/CustomerLogin';
import CustomerFront from './customer/CustomerFront';
import CustomerHome from './customer/CustomerHome';
import CustomerProducts from './customer/CustomerProducts';
import CustomerProdCategory from './customer/CustomerProdCategory';
import CustomerCart from './customer/CustomerCart';
import CustomerCheckout from './customer/CustomerCheckout';
import CustomerOrders from './customer/CustomerOrders';
import CustomerProfile from './customer/CustomerProfile';
import CustomerPopularProducts from './customer/CustomerPopularProducts';
import CustomerProductDetail from './customer/CustomerProductDetail';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* POS Routes */}
        {posRoutes}
        <Route path="/pos/login" element={<POSLogin />} />
        <Route path="/pos/products" element={<POSProducts />} />
        <Route path="/pos/checkout" element={<POSCheckout />} />
        <Route path="/pos/print" element={<POSPrint />} />
        <Route path="/pos/order" element={<POSOrder />} />
        <Route path="/pos/dashboard" element={<POSDashboard />} />
        <Route path="/pos/manage-products" element={<POSManageProducts />} />

        {/* Customer Routes */}
        {customerRoutes}
        <Route path="/" element={<Navigate to="/pos/login" />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer" element={<CustomerFront />} />
        <Route path="/customer/home" element={<CustomerHome />} />
        <Route path="/customer/products" element={<CustomerProducts />} />
        <Route path="/customer/cart" element={<CustomerCart />} />
        <Route path="/customer/categories" element={<CustomerProdCategory />} />
        <Route path="/customer/checkout" element={<CustomerCheckout />} />
        <Route path="/customer/orders" element={<CustomerOrders />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
        <Route path="/customer/popular-products" element={<CustomerPopularProducts />} />
        <Route path="/customer/product-detail/:id" element={<CustomerProductDetail />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
