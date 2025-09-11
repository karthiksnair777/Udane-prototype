import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CustomerHeader from "./CustomerHeader";
import logo from '../assets/2.png'

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
    navigate("/customer/home");
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
    navigate("/customer/home");
  };

  return (
    <>
      <CustomerHeader />
      <div
        className="d-flex align-items-center justify-content-center min-vh-100"
        style={{
          position: "relative",
          padding: "20px",
          height: "100vh", // Full screen height
          overflow: "hidden", // Hide any overflow
        }}
      >
        {/* Background image container */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "url('/src/assets/loginbg.png') repeat-x", // Ensure the image repeats horizontally
            backgroundSize: "cover", // Ensure the image covers the container
            animation: "moveBackground 30s linear infinite", // Move slowly from left to right
          }}
        ></div>

        {/* Glass effect form container */}
        <div
          className="container"
          style={{
            maxWidth: "400px",
            zIndex: 10,
            marginTop: "150px", // Adjust for spacing
            backdropFilter: "blur(10px)", // Glass effect (blurred background)
            backgroundColor: "rgba(255, 255, 255, 0.2)", // Slightly transparent background
            borderRadius: "15px", // Rounded corners for the form container
            padding: "30px", // Padding for the form content
            textAlign: "center", // Center the logo and paragraph
          }}
        >
          {/* Logo and Paragraph Section */}
         <div className="mb-4 text-center">
  <img 
    src={logo} 
    alt="Logo"
    style={{
      maxWidth: "150px", 
      marginBottom: "20px",
    }}
  />
  <p className="fw-bold fs-5 text-black">
    Udane Varum
  </p>
</div>

          {/* Login Form */}
          <div className="">
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-between gap-2">
                <button type="submit" className="btn btn-success w-50">
                  Login
                </button>
                <button
                  type="button"
                  onClick={handleRegister}
                  className="btn btn-outline-success w-50"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* CSS Animation for seamless movement */}
      <style>
        {`
          @keyframes moveBackground {
            0% {
              background-position: 0 0; /* Start from left */
            }
            100% {
              background-position: -100% 0; /* Move left to right */
            }
          }
        `}
      </style>
    </>
  );
}
