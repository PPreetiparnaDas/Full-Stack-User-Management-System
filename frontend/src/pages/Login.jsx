import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import "../styles/dashboard.css"; // same CSS as dashboard

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="dashboard-bg">
      <div className="overlay"></div>
      <div
        className="container-box d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="glass-card" style={{ width: "400px" }}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "white",
            }}
          >
            Login
          </h2>
          <form onSubmit={handleSubmit} className="d-flex flex-column">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                marginBottom: "15px",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                marginBottom: "20px",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <button type="submit" className="btn-custom">
              Login
            </button>
          </form>
          <p style={{ marginTop: "15px", textAlign: "center" }}>
            Don't have an account?{" "}
            <span
              style={{ color: "#00fff7", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
