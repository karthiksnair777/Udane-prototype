import { Route } from 'react-router-dom';
import CustomerLogin from '../customer/CustomerLogin';
import CustomerFront from '../customer/CustomerFront';
import CustomerHome from '../customer/CustomerHome';
import CustomerProducts from '../customer/CustomerProducts';
import CustomerCart from '../customer/CustomerCart';
import CustomerProdCategory from '../customer/CustomerProdCategory';
import CustomerCheckout from '../customer/CustomerCheckout';
import CustomerOrders from '../customer/CustomerOrders';
import CustomerProfile from '../customer/CustomerProfile';

export const customerRoutes = [
  <Route path="/customer/login" element={<CustomerLogin />} key="customer-login" />,
  <Route path="/customer" element={<CustomerFront />} key="customer-front" />,
  <Route path="/customer/home" element={<CustomerHome />} key="customer-home" />,
  <Route path="/customer/products" element={<CustomerProducts />} key="customer-products" />,
  <Route path="/customer/cart" element={<CustomerCart />} key="customer-cart" />,
  <Route path="/customer/categories" element={<CustomerProdCategory />} key="customer-categories" />,
  <Route path="/customer/checkout" element={<CustomerCheckout />} key="customer-checkout" />,
  <Route path="/customer/orders" element={<CustomerOrders />} key="customer-orders" />,
  <Route path="/customer/profile" element={<CustomerProfile />} key="customer-profile" />
];
