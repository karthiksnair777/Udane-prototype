    import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CustomerProducts() {
  const navigate = useNavigate();
  const shopId = localStorage.getItem("selected_shop");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("shop_id", shopId);
      if (!error) setProducts(data);
    }
    if (shopId) load();
  }, [shopId]);

  const addToCart = (p) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === p.id);
      if (existing) {
        return prev.map((item) =>
          item.id === p.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const goToCart = () => {
    navigate("/customer/cart", { state: { cart } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>
      {products.map((p) => (
        <div
          key={p.id}
          onClick={() => addToCart(p)}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            margin: "5px",
            cursor: "pointer",
          }}
        >
          {p.name} — ₹{p.price}
        </div>
      ))}
      <button onClick={goToCart} disabled={cart.length === 0} style={{ marginTop: 20 }}>
        View Cart ({cart.length})
      </button>
    </div>
  );
}
