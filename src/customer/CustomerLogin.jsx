import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CustomerHeader from "./CustomerHeader";

export default function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("customers")
      .select("id")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("customer_id", data.id);
    navigate("/customer/products");
  };

  const handleRegister = async () => {
    const { data, error } = await supabase
      .from("customers")
      .insert([{ email, password }])
      .select()
      .single();

    if (error) {
      alert("Registration failed");
      return;
    }

    localStorage.setItem("customer_id", data.id);
    navigate("/customer/products");
  };

  return (
    <>
      <CustomerHeader />
      <div style={styles.container}>
        <div style={styles.glassBox}>
          <h2 style={styles.heading}>Customer Login</h2>
          <form onSubmit={handleLogin}>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              type="email"
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
            <div style={styles.buttonRow}>
              <button type="submit" style={styles.loginButton}>
                Login
              </button>
              <button
                type="button"
                onClick={handleRegister}
                style={styles.registerButton}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #41b452ff, #1f9739ff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  glassBox: {
    backdropFilter: "blur(15px)",
    background: "rgba(255, 255, 255, 1)",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    padding: "40px 30px",
    maxWidth: "360px",
    width: "100%",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#2e7d32", // Dark green
    fontFamily: "'Segoe UI', sans-serif",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginTop: "10px",
  },
  loginButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#388e3c", // Green
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  registerButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#fff",
    color: "#388e3c",
    border: "2px solid #388e3c",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
