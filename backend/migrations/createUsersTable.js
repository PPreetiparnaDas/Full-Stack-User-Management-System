const db = require("../config/db");

const query = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  city VARCHAR(100),
  state_id INT,
  country_id INT,
  pincode VARCHAR(10),
  password VARCHAR(255),
  FOREIGN KEY (state_id) REFERENCES states(id),
  FOREIGN KEY (country_id) REFERENCES countries(id)
)
`;

db.query(query, (err, result) => {
  if (err) console.error("Error creating users table:", err);
  else console.log("✅ Users table created or exists");
});
