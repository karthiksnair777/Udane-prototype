import { useLocation, useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function POSCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  const handleConfirm = async () => {
    const shopId = localStorage.getItem("shop_id");
    const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([{ shop_id: shopId, total }])
      .select()
      .single();

    if (orderError || !order) {
      alert("Failed to save order");
      return;
    }

    const orderItems = cart.map((c) => ({
      order_id: order.id,
      product_id: c.id,
      qty: c.qty,
      price: c.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      alert("Failed to save order items");
      return;
    }

    navigate("/pos/print", { state: { cart, orderId: order.id } });
  };

  return (
    <>
      {/* POS Header/Menu */}
      <header
        style={{
          background: "#ffffffff",
          padding: "16px 0",
          marginBottom: "20px",
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
              fontSize: "1.5em",
              color: "#2f855a",
            }}
          >
            Udane POS
          </div>
          <nav>
            <Link
              to="/pos/products"
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
              to="/pos/order"
              style={{
                color: "#2f855a",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Orders
            </Link>
          </nav>
        </div>
      </header>

      <div
        style={{
          maxWidth: "500px",
          margin: "60px auto",
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "#38a169", // light yellow
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        <h2 style={{ color: "#ffffffff", marginBottom: "20px" }}>🧾 Checkout</h2>

        <div style={{ marginBottom: "20px" }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{item.qty * item.price}</span>
            </div>
          ))}
        </div>

        <hr />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          <span>Total</span>
          <span>
            ₹{cart.reduce((sum, item) => sum + item.qty * item.price, 0)}
          </span>
        </div>

        <button
          onClick={handleConfirm}
          style={{
            marginTop: "30px",
            width: "100%",
            padding: "14px",
            backgroundColor: "#ffffffff",
            color: "black",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ✅ Confirm & Print
        </button>
      </div>
    </>
  );
}
