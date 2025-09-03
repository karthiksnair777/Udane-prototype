import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function POSLogin() {
  const [username, setUsername] = useState("");
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
      .eq("username", username)
      .eq("password", password)
      .single();

    if (error || !data) {
      setError("Invalid username or password.");
      setLoading(false);
      return;
    }

    localStorage.setItem("shop_id", data.id);
    setLoading(false);
    navigate("/pos/products");
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.glassBox}>
        <h2 style={styles.heading}>POS Login</h2>

        {error && <div style={styles.error}>{error}</div>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button
          type="submit"
          style={{
            ...styles.loginButton,
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #10a344ff, #10a344ff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  glassBox: {
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    padding: "40px 30px",
    width: "100%",
    maxWidth: "360px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#2f855a",
    fontWeight: "600",
    fontSize: "24px",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  loginButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#38a169",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  error: {
    color: "#c53030",
    fontSize: "14px",
    marginBottom: "10px",
    textAlign: "center",
    fontWeight: "500",
  },
};
