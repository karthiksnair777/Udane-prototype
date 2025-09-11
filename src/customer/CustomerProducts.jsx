import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CustomerHeader from "./CustomerHeader";

export default function CustomerProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from("products").select("*");
      if (!error) setProducts(data);
    }
    load();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const qty = quantities[product.id] || 1;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
  };

  const goToCart = () => {
    navigate("/customer/cart", { state: { cart } });
  };

  if (!localStorage.getItem("customer_id")) {
    return (
      <>
        <CustomerHeader />
        <div style={styles.centerMessage}>Please login to view products.</div>
      </>
    );
  }

  return (
    <>
      <CustomerHeader />
      <div style={styles.container}>
        <h2 style={styles.heading}>🛍️ Explore Our Products</h2>

        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />

        <div style={styles.grid}>
          {filteredProducts.map((p) => (
            <div key={p.id} style={styles.card}>
              <img
                src={p.image_url || "https://via.placeholder.com/100"}
                alt={p.name}
                style={styles.image}
              />
              <p style={styles.productName}>{p.name}</p>
              <p style={styles.price}>₹{p.price}</p>

              <input
                type="number"
                min={1}
                value={quantities[p.id] || 1}
                onChange={(e) =>
                  setQuantities((prev) => ({
                    ...prev,
                    [p.id]: Math.max(1, Number(e.target.value)),
                  }))
                }
                style={styles.qtyInput}
              />

              <button style={styles.addButton} onClick={() => addToCart(p)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button
            onClick={goToCart}
            disabled={cart.length === 0}
            style={{
              ...styles.viewCartButton,
              opacity: cart.length === 0 ? 0.5 : 1,
              cursor: cart.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            🛒 View Cart ({cart.length})
          </button>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#111",
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "24px",
  },
  searchInput: {
    display: "block",
    margin: "0 auto 40px auto",
    padding: "14px 18px",
    width: "90%",
    maxWidth: "400px",
    fontSize: "15px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    outline: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "24px",
    padding: "0 10px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "24px 18px",
    textAlign: "center",
    border: "1px solid #f0f0f0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.2s ease",
  },
  image: {
    width: "90px",
    height: "90px",
    objectFit: "contain",
    marginBottom: "14px",
    borderRadius: "12px",
    backgroundColor: "#f8f8f8",
  },
  productName: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#222",
    marginBottom: "4px",
  },
  price: {
    fontSize: "14px",
    color: "#43a047",
    marginBottom: "16px",
  },
  qtyInput: {
    width: "60px",
    padding: "8px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#A1F59F",
    color: "#000",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  viewCartButton: {
    backgroundColor: "#A1F59F",
    color: "#000",
    padding: "14px 24px",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
  },
  centerMessage: {
    textAlign: "center",
    marginTop: "80px",
    fontSize: "18px",
    color: "#888",
  },
};
    