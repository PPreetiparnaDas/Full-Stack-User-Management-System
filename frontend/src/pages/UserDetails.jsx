import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../api/api";
import { Container, Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "../styles/userdetails.css";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
        navigate("/dashboard"); // redirect if error
      }
    };
    loadUser();
  }, [id, navigate]);

  if (!user) return <p className="loading-text">Loading...</p>;

  return (
    <div className="dashboard-bg">
      <div className="overlay"></div>
      <Container className="pt-5 userdetails-container d-flex justify-content-center align-items-center">
        <div className="userdetails-card">
          <h2 className="userdetails-card-header mb-4">User Details</h2>
          <div className="userdetails-card-body">
            <Table striped bordered>
              <tbody>
                <tr>
                  <th className="field-name">Name</th>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <th className="field-name">Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th className="field-name">Phone</th>
                  <td>{user.phone}</td>
                </tr>
                <tr>
                  <th className="field-name">City</th>
                  <td>{user.city}</td>
                </tr>
                <tr>
                  <th className="field-name">State</th>
                  <td>{user.stateName}</td>
                </tr>
                <tr>
                  <th className="field-name">Country</th>
                  <td>{user.countryName}</td>
                </tr>
                <tr>
                  <th className="field-name">Pincode</th>
                  <td>{user.pincode}</td>
                </tr>
              </tbody>
            </Table>
            <Button
              className="back-btn mt-3"
              onClick={() => navigate("/dashboard")}
            >
              Back
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
