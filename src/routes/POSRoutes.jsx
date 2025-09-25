import { Route, Navigate } from 'react-router-dom';
import POSLogin from '../pos/POSLogin';
import POSProducts from '../pos/POSProducts';
import POSCheckout from '../pos/POSCheckout';
import POSPrint from '../pos/POSPrint';
import POSOrder from '../pos/POSOrder';
import POSDashboard from '../pos/POSDashboard';
import POSManageProducts from '../pos/POSManageProducts';

export const posRoutes = [
  <Route path="/" element={<Navigate to="/pos/login" />} key="pos-default" />,
  <Route path="/pos/login" element={<POSLogin />} key="pos-login" />,
  <Route path="/pos/products" element={<POSProducts />} key="pos-products" />,
  <Route path="/pos/checkout" element={<POSCheckout />} key="pos-checkout" />,
  <Route path="/pos/print" element={<POSPrint />} key="pos-print" />,
  <Route path="/pos/order" element={<POSOrder />} key="pos-order" />,
  <Route path="/pos/dashboard" element={<POSDashboard />} key="pos-dashboard" />,
  <Route path="/pos/manage-products" element={<POSManageProducts />} key="pos-manage" />
];
