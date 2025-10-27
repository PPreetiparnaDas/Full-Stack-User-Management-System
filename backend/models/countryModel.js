const db = require("../config/db");

// Add a new country
exports.createCountry = (countryData, callback) => {
  const { name, countryCode } = countryData;
  db.query(
    "INSERT INTO countries (name, country_code) VALUES (?, ?)",
    [name, countryCode],
    callback
  );
};

// Get all countries
exports.getAllCountries = (callback) => {
  db.query("SELECT * FROM countries", callback);
};
