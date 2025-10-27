const db = require("../config/db");

const countries = [
  { name: "India", country_code: "IN" },
  { name: "USA", country_code: "US" },
  { name: "UK", country_code: "GB" },
];

countries.forEach((c) => {
  db.query(
    "INSERT INTO countries (name, country_code) VALUES (?, ?)",
    [c.name, c.country_code],
    (err, result) => {
      if (err) console.error("Error inserting country:", err.message);
      else console.log("Inserted country ID:", result.insertId);
    }
  );
});
