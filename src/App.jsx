import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter as Router, useNavigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import POSCheckoutSuccess from './pos/POSCheckoutSuccess';
import POSDashboard from "./pos/POSDashboard";
import POSManageProducts from "./pos/POSManageProducts";
import POSOrders from "./pos/POSOrders";
import POSLogin from "./pos/POSLogin";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const shopId = localStorage.getItem('shop_id');

  useEffect(() => {
    if (!shopId) {
      navigate('/pos/login');
    }
  }, [shopId, navigate]);

  return shopId ? children : null;
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Routes>
        <Route path="/pos/login" element={<POSLogin />} />
        <Route path="/pos/checkout-success" element={<POSCheckoutSuccess />} />
        <Route path="/pos/dashboard" element={
          <ProtectedRoute>
            <POSDashboard />
          </ProtectedRoute>
        } />
        <Route path="/pos/products" element={
          <ProtectedRoute>
            <POSProducts />
          </ProtectedRoute>
        } />
        <Route path="/pos/manage-products" element={
          <ProtectedRoute>
            <POSManageProducts />
          </ProtectedRoute>
        } />
        <Route path="/pos/order" element={
          <ProtectedRoute>
            <POSOrders />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
