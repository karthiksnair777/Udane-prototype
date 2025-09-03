import { Link } from "react-router-dom";

export default function CustomerHeader() {
  const isLoggedIn = !!localStorage.getItem("customer_id");
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
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.7em",
            color: "#2f855a",
          }}
        >
          Udane
        </div>
        <nav>
          <Link
            to="/customer/login"
            style={{
              marginRight: 20,
              color: "#2f855a",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/customer/products"
                style={{
                  marginRight: 20,
                  color: "#2f855a",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Products
              </Link>
              <Link
                to="/customer/cart"
                style={{
                  marginRight: 20,
                  color: "#2f855a",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Cart
              </Link>
              <Link
                to="/customer/orders"
                style={{
                  color: "#2f855a",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Checkout
              </Link>
            </>
          ) : (
            <>
              <span style={{ color: "#aaa", marginRight: 20 }}>Products</span>
              <span style={{ color: "#aaa", marginRight: 20 }}>Cart</span>
              <span style={{ color: "#aaa" }}>Checkout</span>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
