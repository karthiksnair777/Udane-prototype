import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

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

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Your Orders</h2>
      {orders.map((o) => (
        <div
          key={o.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: 10,
            padding: 10,
          }}
        >
          <div>Order #{o.id}</div>
          <div>Total: ₹{o.total}</div>
          <div>Status: {o.status || "Pending"}</div>
        </div>
      ))}
    </div>
  );
}
