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

    const loadOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, shop:shop_id(name)")
        .order("created_at", { ascending: false });

      if (!error && data) {
        const filtered = data.filter((o) => o.shop?.name === shopName);
        setOrders(filtered);
      }
    };

    loadOrders();

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
                      `🛎️ New customer order received! Order #${newOrder.id}`
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
    <div
      style={{
        maxWidth: 720,
        margin: "40px auto",
        padding: 24,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          marginBottom: 20,
          color: "#2f855a",
          fontWeight: "700",
          fontSize: "2rem",
          letterSpacing: "0.05em",
        }}
      >
        Incoming Orders (Realtime)
      </h2>

      {notification && (
        <div
          role="alert"
          style={{
            background: "#38a169",
            color: "white",
            padding: "14px 20px",
            borderRadius: 8,
            marginBottom: 20,
            fontWeight: "600",
            boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
            fontSize: "1.1rem",
            userSelect: "none",
          }}
        >
          {notification}
        </div>
      )}

      {orders.length === 0 && (
        <p style={{ color: "#718096", fontSize: "1.1rem" }}>
          No orders found.
        </p>
      )}

      {orders.map((o) => (
        <div
          key={o.id}
          style={{
            border: "1px solid #cbd5e0",
            borderRadius: 12,
            padding: 18,
            marginBottom: 16,
            backgroundColor: "#f9fafb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              fontWeight: "700",
              fontSize: "1.15rem",
              color: "#2d3748",
            }}
          >
            <span>Order #{o.id}</span>
            <span style={{ color: "#38a169" }}>₹{o.total}</span>
          </div>

          <div
            style={{
              fontSize: "0.95rem",
              color: "#4a5568",
              marginBottom: 8,
            }}
          >
            From Customer: <strong>{o.from_customer ? "Yes" : "No"}</strong>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
              fontSize: "1rem",
            }}
          >
            <label htmlFor={`status-${o.id}`} style={{ fontWeight: "600" }}>
              Status:
            </label>
            <select
              id={`status-${o.id}`}
              value={o.status || "Pending"}
              disabled={updatingOrderId === o.id}
              onChange={(e) => handleStatusChange(o.id, e.target.value)}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid #cbd5e0",
                cursor: updatingOrderId === o.id ? "not-allowed" : "pointer",
                fontWeight: "600",
                color: "#2d3748",
              }}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="In Transit">In Transit</option>
              <option value="Done">Done</option> {/* Added Done option */}
              <option value="Cancelled">Cancelled</option>
            </select>

            {updatingOrderId === o.id && (
              <span style={{ color: "#718096", fontStyle: "italic" }}>
                Updating...
              </span>
            )}
          </div>

          <div
            style={{
              fontSize: "0.85rem",
              color: "#a0aec0",
            }}
          >
            Placed At: {new Date(o.created_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
