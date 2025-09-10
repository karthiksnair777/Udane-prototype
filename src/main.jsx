import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// POS imports
import POSLogin from './pos/POSLogin';
import POSProducts from './pos/POSProducts';
import POSCheckout from './pos/POSCheckout';
import POSPrint from './pos/POSPrint';
import POSOrder from './pos/POSOrder';
import POSDashboard from './pos/POSDashboard';
import POSManageProducts from './pos/POSManageProducts';

// Customer imports
import CustomerLogin from './customer/CustomerLogin';
// import ShopSelection from './customer/ShopSelection';
import CustomerProducts from './customer/CustomerProducts';
import CustomerCart from './customer/CustomerCart';
import CustomerOrders from './customer/CustomerOrders';



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
      {/* <Route path="/customer/shops" element={<ShopSelection />} /> */}
      <Route path="/customer/products" element={<CustomerProducts />} />
      <Route path="/customer/cart" element={<CustomerCart />} />
      <Route path="/customer/orders" element={<CustomerOrders />} />
    </Routes>
  </BrowserRouter>
);
