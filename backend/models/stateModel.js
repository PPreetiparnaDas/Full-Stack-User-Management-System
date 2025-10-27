const db = require("../config/db");

// Add a new state
exports.createState = (stateData, callback) => {
  const { name, countryId } = stateData;
  db.query(
    "INSERT INTO states (name, country_id) VALUES (?, ?)",
    [name, countryId],
    callback
  );
};

// Get all states
exports.getAllStates = (callback) => {
  db.query(
    "SELECT s.id, s.name, c.name AS countryName FROM states s JOIN countries c ON s.country_id=c.id",
    callback
  );
};
