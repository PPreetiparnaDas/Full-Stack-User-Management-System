import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  fetchCountries,
  fetchStatesByCountry,
  createUser,
  updateUser,
  createCountry,
  createState,
} from "../api/api";
import { toast } from "react-toastify";

export default function ModalForm({
  show,
  handleClose,
  type,
  editData,
  refresh,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [stateId, setStateId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");

  // Load countries for dropdown
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    };
    loadCountries();
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (!countryId) return;
    const loadStates = async () => {
      try {
        const data = await fetchStatesByCountry(countryId);
        setStates(data);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    };
    loadStates();
  }, [countryId]);

  // Pre-fill form if editing
  useEffect(() => {
    if (editData && type === "user") {
      setName(editData.name || "");
      setEmail(editData.email || "");
      setPhone(editData.phone || "");
      setCity(editData.city || "");
      setCountryId(editData.country_id || "");
      setStateId(editData.state_id || "");
      setPincode(editData.pincode || "");
    }
  }, [editData, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (type === "user") {
        const payload = {
          name,
          email,
          phone,
          city,
          state_id: stateId,
          country_id: countryId,
          pincode,
          password: password || undefined, // only set password if adding new user
        };

        if (editData) {
          await updateUser(editData.id, payload);
          toast.success("User updated successfully");
        } else {
          await createUser(payload);
          toast.success("User added successfully");
        }
      }

      if (type === "country") {
        if (!countryName) return toast.error("Country name required");
        await createCountry({ name: countryName });
        toast.success("Country added successfully");
      }

      if (type === "state") {
        if (!stateName || !countryId)
          return toast.error("State and country required");
        await createState({ name: stateName, country_id: countryId });
        toast.success("State added successfully");
      }

      refresh(); // Refresh dashboard table
      handleClose(); // Close modal
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {editData ? "Edit" : "Add"}{" "}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type === "user" && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Country</Form.Label>
              <Form.Select
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
                required
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>State</Form.Label>
              <Form.Select
                value={stateId}
                onChange={(e) => setStateId(e.target.value)}
                required
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </Form.Group>
            {!editData && (
              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
            )}
            <Button type="submit" className="mt-2">
              {editData ? "Update" : "Add"} User
            </Button>
          </Form>
        )}

        {type === "country" && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Country Name</Form.Label>
              <Form.Control
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit">Add Country</Button>
          </Form>
        )}

        {type === "state" && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Country</Form.Label>
              <Form.Select
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
                required
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>State Name</Form.Label>
              <Form.Control
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit">Add State</Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}
