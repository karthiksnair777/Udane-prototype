import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function POSPrint() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];
  const orderId = location.state?.orderId;

  useEffect(() => {
    window.print();
    navigate("/pos/products");
  }, [navigate]);

  return (
    <div
      style={{
        maxWidth: "320px",
        margin: "40px auto",
        fontFamily: "'Courier New', monospace",
        backgroundColor: "#fefcbf",
        padding: "20px",
        borderRadius: "8px",
        border: "1px dashed #a0aec0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#2f855a",
        }}
      >
        🧾 Receipt
      </h3>

      <div style={{ marginBottom: "10px" }}>
        <strong>Order ID:</strong> {orderId}
      </div>

      <hr style={{ borderColor: "#cbd5e0" }} />

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "6px",
          }}
        >
          <span>{item.name} × {item.qty}</span>
          <span>₹{item.qty * item.price}</span>
        </div>
      ))}

      <hr style={{ borderColor: "#cbd5e0", marginTop: "12px" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        <span>Total:</span>
        <span>
          ₹{cart.reduce((sum, item) => sum + item.qty * item.price, 0)}
        </span>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <small style={{ color: "#4a5568" }}>
          ✅ Thank you for shopping!
        </small>
      </div>
    </div>
  );
}
