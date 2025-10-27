const db = require("../config/db");

const states = [
  { name: "Odisha", country_id: 1 },
  { name: "California", country_id: 2 },
  { name: "London", country_id: 3 },
];

states.forEach((s) => {
  db.query(
    "INSERT INTO states (name, country_id) VALUES (?, ?)",
    [s.name, s.country_id],
    (err, result) => {
      if (err) console.error("Error inserting state:", err.message);
      else console.log("Inserted state ID:", result.insertId);
    }
  );
});
