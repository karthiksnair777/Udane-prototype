import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CustomerHeader from "./CustomerHeader";

export default function CustomerCheckout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = state?.cart || [];
  const customerId = localStorage.getItem("customer_id");
  const shopId = cart.length > 0 ? cart[0].shop_id : null;
  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  // Toast state
  const [toast, setToast] = React.useState({ message: "", type: "" });

  // Show toast message
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const handlePayment = async () => {
    if (!shopId || !customerId) {
      showToast("❌ Missing shop or customer ID.", "error");
      return;
    }

    const { data: order, error } = await supabase
      .from("orders")
      .insert([
        {
          shop_id: shopId,
          customer_id: customerId,
          total: total,
          from_customer: true,
        },
      ])
      .select()
      .single();

    if (error) {
      showToast(`❌ Failed to create order: ${error.message}`, "error");
      return;
    }

    const orderItems = cart.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      qty: item.qty,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      showToast(`❌ Failed to insert order items: ${itemsError.message}`, "error");
      return;
    }

    showToast("✅ Payment successful! Order placed.", "success");
    setTimeout(() => navigate("/customer/orders"), 1500);
  };

  return (
    <>
      <CustomerHeader />
      <div style={styles.container}>
        <h2 style={styles.heading}>💳 Checkout</h2>

        {cart.length === 0 ? (
          <p style={styles.empty}>No items to checkout.</p>
        ) : (
          <>
            <div style={styles.cartList}>
              {cart.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <span style={styles.itemName}>{item.name}</span>
                  <span style={styles.itemQty}>
                    × {item.qty} = ₹{item.qty * item.price}
                  </span>
                </div>
              ))}
            </div>

            <div style={styles.qrSection}>
              <p style={styles.qrLabel}>Scan to pay:</p>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=merchant@upi&pn=LocalShop&am=${total}&cu=INR&size=200x200`}
                alt="QR Code"
                style={styles.qrImage}
              />
            </div>

            <div style={styles.total}>
              <strong>Total:</strong> ₹{total}
            </div>

            <button style={styles.payBtn} onClick={handlePayment}>
              💸 I've Paid — Place Order
            </button>
          </>
        )}
      </div>

      {/* Toast Notification */}
      {toast.message && (
        <div
          style={{
            ...styles.toast,
            backgroundColor: toast.type === "error" ? "#EF4444" : "#4ADE80",
          }}
        >
          {toast.message}
        </div>
      )}
    </>
  );
}

const styles = {
  container: {
    maxWidth: "480px",
    margin: "60px auto",
    padding: "36px 24px",
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.05)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "26px",
    color: "#111",
    marginBottom: "30px",
    fontWeight: "600",
  },
  cartList: {
    marginBottom: "24px",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #f0f0f0",
    fontSize: "15px",
  },
  itemName: {
    fontWeight: "500",
    color: "#333",
  },
  itemQty: {
    color: "#444",
  },
  total: {
    fontSize: "17px",
    margin: "20px 0",
    textAlign: "right",
    color: "#2e7d32",
  },
  payBtn: {
    backgroundColor: "#34D399",
    color: "#fff",
    padding: "14px",
    width: "100%",
    fontSize: "15px",
    fontWeight: "600",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
  empty: {
    textAlign: "center",
    color: "#999",
    fontSize: "16px",
  },
  qrSection: {
    textAlign: "center",
    margin: "30px 0 20px",
  },
  qrLabel: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "12px",
  },
  qrImage: {
    width: "200px",
    height: "200px",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  },
  toast: {
    position: "fixed",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "12px 24px",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "500",
    fontSize: "14px",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
};
