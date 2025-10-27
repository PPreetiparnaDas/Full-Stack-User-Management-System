import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import axios from "axios"; // for fetching countries/states
import "../styles/dashboard.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state_id: "",
    country_id: "",
    pincode: "",
    password: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  // Fetch countries
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/countries/listCountriesAPI")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch states whenever country_id changes
  useEffect(() => {
    if (formData.country_id) {
      axios
        .get(
          `http://localhost:5000/api/states/listStatesByCountry/${formData.country_id}`
        )
        .then((res) => setStates(res.data))
        .catch((err) => console.error(err));
    } else {
      setStates([]);
      setFormData((prev) => ({ ...prev, state_id: "" }));
    }
  }, [formData.country_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="dashboard-bg">
      <div className="overlay"></div>
      <div
        className="container-box d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="glass-card" style={{ width: "450px" }}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "white",
            }}
          >
            Register
          </h2>
          <form onSubmit={handleSubmit} className="d-flex flex-column">
            {["name", "email", "phone", "city", "pincode", "password"].map(
              (field) => (
                <input
                  key={field}
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  placeholder={field.replace("_", " ").toUpperCase()}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  style={{
                    marginBottom: "12px",
                    padding: "12px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />
              )
            )}

            {/* Country Dropdown */}
            <select
              name="country_id"
              value={formData.country_id}
              onChange={handleChange}
              required
              style={{
                marginBottom: "12px",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>

            {/* State Dropdown */}
            <select
              name="state_id"
              value={formData.state_id}
              onChange={handleChange}
              required
              style={{
                marginBottom: "12px",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
              disabled={!formData.country_id}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>

            <button type="submit" className="btn-custom">
              Register
            </button>
          </form>
          <p style={{ marginTop: "15px", textAlign: "center" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#00fff7", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
