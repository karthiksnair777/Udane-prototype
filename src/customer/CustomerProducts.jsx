import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CustomerHeader from "./CustomerHeader";

export default function CustomerProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({}); // Track qty per product

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
    // Reset quantity for product to 1 after adding
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
                style={{
                  width: "60px",
                  padding: "6px",
                  marginBottom: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
              />

              <button style={styles.addButton} onClick={() => addToCart(p)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 30 }}>
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
    padding: "30px 20px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#2e7d32",
    fontSize: "28px",
    marginBottom: "20px",
  },
  searchInput: {
    display: "block",
    margin: "0 auto 30px auto",
    padding: "10px 16px",
    width: "90%",
    maxWidth: "400px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    padding: "0 10px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "16px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
    border: "1px solid #eee",
    transition: "transform 0.2s",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
    marginBottom: "12px",
  },
  productName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "6px",
  },
  price: {
    fontSize: "15px",
    color: "#4caf50",
    marginBottom: "12px",
  },
  addButton: {
    backgroundColor: "#43a047",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
  },
  viewCartButton: {
    backgroundColor: "#2e7d32",
    color: "white",
    padding: "14px 24px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  centerMessage: {
    textAlign: "center",
    marginTop: "80px",
    fontSize: "18px",
    color: "#666",
  },
};
