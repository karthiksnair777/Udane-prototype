import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function POSOrder() {
  const [orders, setOrders] = useState([]);
  const shopId = localStorage.getItem("pos_shop_id");

  useEffect(() => {
    if (!shopId) return;

    // Initial load
    const loadOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("shop_id", shopId)
        .order("created_at", { ascending: false });

      if (!error) setOrders(data);
    };

    loadOrders();

    // ✅ Realtime subscription to new orders
    const channel = supabase
      .channel("realtime-orders")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
          filter: `shop_id=eq.${shopId}`,
        },
        (payload) => {
          const newOrder = payload.new;

          // Only accept orders placed by customers (optional)
          if (newOrder.from_customer) {
            setOrders((prev) => [newOrder, ...prev]);
          }
        }
      )
      .subscribe();

    // Clean up on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [shopId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Incoming Orders (Realtime)</h2>
      {orders.map((o) => (
        <div key={o.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <div><strong>Order #{o.id}</strong></div>
          <div>Total: ₹{o.total}</div>
          <div>From Customer: {o.from_customer ? "Yes" : "No"}</div>
          <div>Status: {o.status || "Pending"}</div>
          <div>Placed At: {new Date(o.created_at).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
