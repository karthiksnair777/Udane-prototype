import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // For simplicity, store customers in `customers` table (not Supabase auth)
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
    navigate("/customer/shops");
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
    navigate("/customer/shops");
  };

  return (
    <div style={{ maxWidth: 300, margin: "50px auto" }}>
      <h2>Customer Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: "10px" }}
        />
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegister} style={{ marginLeft: 10 }}>
          Register
        </button>
      </form>
    </div>
  );
}
