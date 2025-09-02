import { useLocation, useNavigate } from "react-router-dom";
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
    <div
      style={{
        maxWidth: "500px",
        margin: "60px auto",
        padding: "30px",
        borderRadius: "12px",
        backgroundColor: "#fefcbf", // light yellow
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <h2 style={{ color: "#2f855a", marginBottom: "20px" }}>🧾 Checkout</h2>

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
          backgroundColor: "#38a169",
          color: "white",
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
  );
}
