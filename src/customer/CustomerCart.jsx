import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CustomerHeader from "./CustomerHeader";

export default function CustomerCart() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  const handleCheckout = async () => {
    const customerId = localStorage.getItem("customer_id");
    const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
    const shopId = cart.length > 0 ? cart[0].shop_id : null;

    if (!shopId || !customerId) {
      alert("Missing shop or customer ID.");
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
      alert(`Failed to create order: ${error.message}`);
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
      alert(`Failed to insert order items: ${itemsError.message}`);
      return;
    }

    alert("✅ Order placed successfully!");
    navigate("/customer/orders");
  };

  if (!localStorage.getItem("customer_id")) {
    return (
      <>
        <CustomerHeader />
        <div style={styles.centerText}>Please login to view cart.</div>
      </>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <>
      <CustomerHeader />
      <div style={styles.container}>
        <h2 style={styles.heading}>🛒 Your Cart</h2>
        {cart.length === 0 ? (
          <p style={styles.empty}>Your cart is empty.</p>
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
            <hr />
            <div style={styles.total}>
              <strong>Total:</strong> ₹{total}
            </div>
            <button style={styles.checkoutBtn} onClick={handleCheckout}>
              ✅ Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "60px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    color: "#2e7d32",
    marginBottom: "25px",
  },
  cartList: {
    marginBottom: "20px",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #f0f0f0",
  },
  itemName: {
    fontWeight: "500",
    color: "#333",
  },
  itemQty: {
    color: "#444",
  },
  total: {
    fontSize: "18px",
    margin: "15px 0",
    textAlign: "right",
    color: "#2e7d32",
  },
  checkoutBtn: {
    backgroundColor: "#2e7d32",
    color: "#fff",
    padding: "12px 18px",
    width: "100%",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    color: "#999",
    fontSize: "16px",
  },
  centerText: {
    textAlign: "center",
    marginTop: "80px",
    fontSize: "18px",
    color: "#666",
  },
};
