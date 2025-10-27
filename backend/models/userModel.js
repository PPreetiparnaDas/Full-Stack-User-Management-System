const db = require("../config/db");

// Add new user
exports.createUser = (userData, callback) => {
  const { name, email, phone, city, stateId, countryId, pincode } = userData;
  db.query(
    "INSERT INTO users (name,email,phone,city,state_id,country_id,pincode) VALUES (?,?,?,?,?,?,?)",
    [name, email, phone, city, stateId, countryId, pincode],
    callback
  );
};

// Get all users
exports.getAllUsers = (callback) => {
  db.query(
    `SELECT u.*, s.name AS stateName, c.name AS countryName
     FROM users u
     JOIN states s ON u.state_id=s.id
     JOIN countries c ON u.country_id=c.id`,
    callback
  );
};

// Get user by ID
exports.getUserById = (id, callback) => {
  db.query(
    `SELECT u.*, s.name AS stateName, c.name AS countryName
     FROM users u
     JOIN states s ON u.state_id=s.id
     JOIN countries c ON u.country_id=c.id
     WHERE u.id=?`,
    [id],
    callback
  );
};

// Update user
exports.updateUser = (id, userData, callback) => {
  const { name, email, phone, city, stateId, countryId, pincode } = userData;
  db.query(
    `UPDATE users
     SET name=?, email=?, phone=?, city=?, state_id=?, country_id=?, pincode=?
     WHERE id=?`,
    [name, email, phone, city, stateId, countryId, pincode, id],
    callback
  );
};

// Delete user
exports.deleteUser = (id, callback) => {
  db.query("DELETE FROM users WHERE id=?", [id], callback);
};
