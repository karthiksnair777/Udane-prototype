import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";

export default function POSOrder() {
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState(null);
  const [shopName, setShopName] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const shopId = localStorage.getItem("shop_id");
  const notifiedOrderIds = useRef(new Set());

  useEffect(() => {
    if (!shopId) return;

    // Get shop name for current shopId
    async function fetchShopName() {
      const { data, error } = await supabase
        .from("shops")
        .select("name")
        .eq("id", shopId)
        .single();
      if (!error && data) setShopName(data.name);
    }
    fetchShopName();
  }, [shopId]);

  useEffect(() => {
    if (!shopId || !shopName) return;

    // Initial load: get all orders for this shop name
    const loadOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, shop:shop_id(name)")
        .order("created_at", { ascending: false });

      if (!error && data) {
        // Filter orders where shop.name matches current shopName
        const filtered = data.filter((o) => o.shop?.name === shopName);
        setOrders(filtered);
      }
    };

    loadOrders();

    // Realtime subscription to new orders
    const channel = supabase
      .channel("realtime-orders")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
        },
        (payload) => {
          const newOrder = payload.new;
          // Fetch shop name for new order
          if (newOrder.shop_id) {
            supabase
              .from("shops")
              .select("name")
              .eq("id", newOrder.shop_id)
              .single()
              .then(({ data, error }) => {
                if (
                  !error &&
                  data &&
                  data.name === shopName &&
                  newOrder.from_customer
                ) {
                  setOrders((prev) => [newOrder, ...prev]);
                  if (!notifiedOrderIds.current.has(newOrder.id)) {
                    setNotification(
                      `New customer order received! Order #${newOrder.id}`
                    );
                    notifiedOrderIds.current.add(newOrder.id);
                    setTimeout(() => setNotification(null), 4000);
                  }
                }
              });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [shopId, shopName]);

  // Function to update order status
  async function handleStatusChange(orderId, newStatus) {
    setUpdatingOrderId(orderId);
    const { data, error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId)
      .select()
      .single();

    if (!error && data) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    }
    setUpdatingOrderId(null);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Incoming Orders (Realtime)</h2>
      {notification && (
        <div
          style={{
            background: "#38a169",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            marginBottom: "15px",
            fontWeight: "bold",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          {notification}
        </div>
      )}
      {orders.map((o) => (
        <div
          key={o.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <div>
            <strong>Order #{o.id}</strong>
          </div>
          <div>Total: ₹{o.total}</div>
          <div>From Customer: {o.from_customer ? "Yes" : "No"}</div>
          <div>
            Status:{" "}
            <select
              value={o.status || "Pending"}
              disabled={updatingOrderId === o.id}
              onChange={(e) => handleStatusChange(o.id, e.target.value)}
              style={{ marginLeft: 8 }}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="In Transit">In Transit</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            {updatingOrderId === o.id && (
              <span style={{ marginLeft: 8, color: "#888" }}>Updating...</span>
            )}
          </div>
          <div>Placed At: {new Date(o.created_at).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
