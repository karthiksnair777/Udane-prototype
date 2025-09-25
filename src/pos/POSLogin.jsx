import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function POSLogin() {
  const [shopId, setShopId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase
      .from("shops")
      .select("id")
      .eq("username", shopId)
      .eq("password", password)
      .single();

    if (error || !data) {
      setError("Invalid Shop ID or password.");
      setLoading(false);
      return;
    }

    localStorage.setItem("shop_id", data.id);
    setLoading(false);
    navigate("/pos/products");
  };

  return (
    <div style={styles.container}>
      {/* Left Side - Login Form */}
      <div style={styles.leftPanel}>
        <div style={styles.loginBox}>
          <h2 style={styles.loginTitle}>Login to POS</h2>
          <input
            type="text"
            placeholder="Shop ID"
            value={shopId}
            onChange={(e) => setShopId(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button
            onClick={handleLogin}
            style={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <div style={styles.error}>{error}</div>}
        </div>
      </div>

      {/* Right Side - Welcome Content */}
      <div style={styles.rightPanel}>
        <div style={styles.welcomeContent}>
          <h1 style={styles.welcomeTitle}>Welcome to Udane POS</h1>
          <p style={styles.welcomeText}>
            Your complete vendor helper for managing inventory, sales, and orders.
          </p>
          <div style={styles.features}>
            <div style={styles.featureItem}>✓ Easy Inventory Management</div>
            <div style={styles.featureItem}>✓ Real-time Sales Tracking</div>
            <div style={styles.featureItem}>✓ Order Management</div>
            <div style={styles.featureItem}>✓ Customer Database</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f7fafc",
  },
  leftPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  rightPanel: {
    flex: 1,
    backgroundColor: "#2f855a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    color: "white",
  },
  loginBox: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  loginTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2f855a",
    marginBottom: "24px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
    fontSize: "16px",
  },
  loginButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2f855a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "#e53e3e",
    marginTop: "12px",
    textAlign: "center",
  },
  welcomeContent: {
    maxWidth: "400px",
  },
  welcomeTitle: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  welcomeText: {
    fontSize: "18px",
    marginBottom: "32px",
    opacity: 0.9,
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  featureItem: {
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
};
