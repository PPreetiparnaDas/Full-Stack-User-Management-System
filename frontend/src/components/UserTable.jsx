import React from "react";
import { Table } from "react-bootstrap";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import "../styles/dashboard.css";

export default function UserTable({ users = [], onEdit, onDelete, onView }) {
  const renderCell = (text) => (
    <span className="truncate-text" title={text}>
      {text || "-"}
    </span>
  );

  if (!Array.isArray(users) || users.length === 0) {
    return (
      <div className="text-center text-light p-3">
        <strong>No users found.</strong>
      </div>
    );
  }

  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City</th>
          <th>State</th>
          <th>Country</th>
          <th>Pincode</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{renderCell(u.name)}</td>
            <td>{renderCell(u.email)}</td>
            <td>{renderCell(u.phone)}</td>
            <td>{renderCell(u.city)}</td>
            <td>{renderCell(u.stateName)}</td>
            <td>{renderCell(u.countryName)}</td>
            <td>{renderCell(u.pincode)}</td>
            <td className="text-center">
              <FaEye
                style={{
                  cursor: "pointer",
                  color: "#0d6efd",
                  marginRight: "10px",
                }}
                onClick={() => onView(u.id)}
                title="View"
              />
              <FaEdit
                style={{
                  cursor: "pointer",
                  color: "#ffc107",
                  marginRight: "10px",
                }}
                onClick={() => onEdit(u)}
                title="Edit"
              />
              <FaTrash
                style={{ cursor: "pointer", color: "#dc3545" }}
                onClick={() => onDelete(u.id)}
                title="Delete"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
