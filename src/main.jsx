import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { posRoutes } from './routes/POSRoutes';
import { customerRoutes } from './routes/CustomerRoutes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {posRoutes}
        {customerRoutes}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>

import CustomerProfile from './customer/CustomerProfile';



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/pos/login" />} />
      <Route path="/pos/login" element={<POSLogin />} />
      <Route path="/pos/products" element={<POSProducts />} />
      <Route path="/pos/checkout" element={<POSCheckout />} />
      <Route path="/pos/print" element={<POSPrint />} />
      <Route path="/pos/order" element={<POSOrder />} />
      <Route path="/pos/dashboard" element={<POSDashboard />} />
      <Route path="/pos/manage-products" element={<POSManageProducts />} />
      <Route path="*" element={<div>Page not found</div>} />

        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer" element={<CustomerFront />} />
        {/* <Route path="/customer/shops" element={<ShopSelection />} /> */}
        <Route path="/customer/home" element={<CustomerHome />} />
        <Route path="/customer/products" element={<CustomerProducts />} />
        <Route path="/customer/cart" element={<CustomerCart />} />
        <Route path="/customer/categories" element={<CustomerProdCategory />} />
        <Route path="/customer/checkout" element={<CustomerCheckout />} />
        <Route path="/customer/orders" element={<CustomerOrders />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
      </Routes>
    </BrowserRouter>
 
);
