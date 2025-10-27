import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaGlobe,
  FaMapMarkerAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ModalForm from "../components/ModalForm";
import UserTable from "../components/UserTable";

import { fetchUsers, deleteUser } from "../api/api";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();

  // ✅ Load users from API
  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data || []); // Avoid undefined
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ================= ACTION HANDLERS =================

  const handleAdd = (type) => {
    setModalType(type);
    setEditData(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setModalType("user");
    setEditData(user);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
      loadUsers(); // Refresh table
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handleView = (id) => {
    // Navigate to user details page
    navigate(`/user/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ================= HELPER BUTTON =================
  const renderButton = (icon, label, onClick, variant) => (
    <button
      className={`btn btn-outline-${variant} btn-custom`}
      onClick={onClick}
    >
      {icon} {label}
    </button>
  );

  return (
    <div className="dashboard-bg">
      <div className="overlay"></div>

      <Container className="container-box pt-5 position-relative">
        {/* Logout */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 10,
          }}
        >
          {renderButton(
            <FaSignOutAlt className="me-1" />,
            "Logout",
            handleLogout,
            "danger"
          )}
        </div>

        <h2 className="mb-4 text-white">👤 User Management System</h2>

        {/* Action Buttons */}
        <Row className="mb-4 justify-content-center">
          <Col xs="auto">
            {renderButton(
              <FaGlobe className="me-1" />,
              "Add Country",
              () => handleAdd("country"),
              "primary"
            )}
          </Col>
          <Col xs="auto">
            {renderButton(
              <FaMapMarkerAlt className="me-1" />,
              "Add State",
              () => handleAdd("state"),
              "success"
            )}
          </Col>
          <Col xs="auto">
            {renderButton(
              <FaUserPlus className="me-1" />,
              "Add User",
              () => handleAdd("user"),
              "warning"
            )}
          </Col>
        </Row>

        {/* User Table */}
        <Row>
          <Col>
            <div className="glass-card">
              <UserTable
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            </div>
          </Col>
        </Row>

        {/* Modal Form */}
        {showModal && (
          <ModalForm
            show={showModal}
            handleClose={() => setShowModal(false)}
            type={modalType}
            editData={editData}
            refresh={loadUsers} // Refresh after add/edit
          />
        )}
      </Container>
    </div>
  );
}
