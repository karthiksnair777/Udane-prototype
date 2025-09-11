import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CustomerHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("customer_id");

  const [searchTerm, setSearchTerm] = useState("");

  // Hide header on login route
  if (location.pathname === "/customer/login") return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/customer/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header
      style={{
        background: "#ffffff",
        padding: "16px 0",
        marginBottom: "30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          padding: "0 20px",
          gap: "20px",
        }}
      >
        {/* Left: Brand Logo */}
        <Link
          to="/customer/home"
          style={{
            fontWeight: "bold",
            fontSize: "1.7em",
            color: "#2f855a",
            textDecoration: "none",
            marginRight: 20,
            whiteSpace: "nowrap",
          }}
        >
          Udane
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ flexGrow: 1 }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "250px",
            }}
          />
        </form>

        {/* Navigation + Profile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Navigation Links */}
          <nav style={{ display: "flex", gap: "16px" }}>
            <Link to="/customer/home" style={navLinkStyle}>
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/customer/products" style={navLinkStyle}>
                  Products
                </Link>
                <Link to="/customer/cart" style={navLinkStyle}>
                  Cart
                </Link>
                <Link to="/customer/orders" style={navLinkStyle}>
                  Orders
                </Link>
                <Link to="/customer/checkout" style={navLinkStyle}>
                  Checkout
                </Link>
              </>
            ) : (
              <>
                <span style={disabledLinkStyle}>Products</span>
                <span style={disabledLinkStyle}>Cart</span>
                <span style={disabledLinkStyle}>Checkout</span>
              </>
            )}
          </nav>

          {/* Profile Icon */}
          {isLoggedIn && (
            <Link to="/customer/profile" style={{ textDecoration: "none" }}>
              <span
                title="Profile"
                style={{
                  fontSize: "22px",
                  color: "#2f855a",
                  cursor: "pointer",
                }}
              >
                👤
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

// Reusable styles
const navLinkStyle = {
  color: "#2a2828ff",
  textDecoration: "none",
  fontWeight: 500,
};

const disabledLinkStyle = {
  color: "#aaa",
  fontWeight: 500,
};
