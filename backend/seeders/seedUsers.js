const db = require("../config/db");
const bcrypt = require("bcrypt");

const users = [
  {
    name: "Preeti",
    email: "preeti@example.com",
    password: "123456",
    state_id: 1,
    country_id: 1,
  },
  {
    name: "John",
    email: "john@example.com",
    password: "123456",
    state_id: 2,
    country_id: 2,
  },
];

users.forEach(async (u) => {
  const hashedPassword = await bcrypt.hash(u.password, 10);
  db.query(
    "INSERT INTO users (name,email,password,state_id,country_id) VALUES (?,?,?,?,?)",
    [u.name, u.email, hashedPassword, u.state_id, u.country_id],
    (err, result) => {
      if (err) console.error("Error inserting user:", err.message);
      else console.log("Inserted user ID:", result.insertId);
    }
  );
});
