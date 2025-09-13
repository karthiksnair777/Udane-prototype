import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


// POS imports
import POSLogin from './pos/POSLogin';
import POSProducts from './pos/POSProducts';
import POSCheckout from './pos/POSCheckout';
import POSPrint from './pos/POSPrint';
import POSOrder from './pos/POSOrder';

// Customer imports
import CustomerLogin from './customer/CustomerLogin';
import CustomerFront from './customer/CustomerFront';
// import ShopSelection from './customer/ShopSelection';
import CustomerHome from './customer/CustomerHome';
import CustomerProdCategory from './customer/CustomerProdCategory';
import CustomerProducts from './customer/CustomerProducts';
import CustomerCart from './customer/CustomerCart';
import CustomerCheckout from './customer/CustomerCheckout';
import CustomerOrders from './customer/CustomerOrders';
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
