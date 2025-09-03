import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import CustomerHeader from "./CustomerHeader";

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const customerId = localStorage.getItem("customer_id");

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_id", customerId)
        .order("id", { ascending: false });
      if (!error) setOrders(data);
    }
    if (customerId) load();
  }, [customerId]);

  if (!customerId) {
    return (
      <>
        <CustomerHeader />
        <div style={styles.centerText}>Please login to view orders.</div>
      </>
    );
  }

  return (
    <>
      <CustomerHeader />
      <div style={styles.container}>
        <h2 style={styles.heading}>📦 Your Orders</h2>

        {orders.length === 0 ? (
          <div style={styles.empty}>You have no orders yet.</div>
        ) : (
          orders.map((o) => (
            <div key={o.id} style={styles.orderCard}>
              <div style={styles.orderRow}>
                <strong>Order #{o.id}</strong>
                <span style={getStatusStyle(o.status)}>
                  {o.status || "Pending"}
                </span>
              </div>
              <div>Total: ₹{o.total}</div>
              <div style={styles.date}>
                {new Date(o.created_at).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#2e7d32",
    fontSize: "24px",
    marginBottom: "30px",
  },
  orderCard: {
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    marginBottom: "15px",
  },
  orderRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  date: {
    marginTop: "6px",
    fontSize: "12px",
    color: "#888",
  },
  empty: {
    textAlign: "center",
    color: "#777",
  },
  centerText: {
    textAlign: "center",
    marginTop: "80px",
    fontSize: "18px",
    color: "#666",
  },
};

function getStatusStyle(status) {
  const base = {
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
  };

  switch ((status || "").toLowerCase()) {
    case "completed":
    case "delivered":
      return {
        ...base,
        backgroundColor: "#e6f4ea",
        color: "#2e7d32",
      };
    case "cancelled":
      return {
        ...base,
        backgroundColor: "#fdecea",
        color: "#c62828",
      };
    case "shipped":
      return {
        ...base,
        backgroundColor: "#e3f2fd",
        color: "#1976d2",
      };
    default:
      return {
        ...base,
        backgroundColor: "#fffde7",
        color: "#f9a825",
      };
  }
}
