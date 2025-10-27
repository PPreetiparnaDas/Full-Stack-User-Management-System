const db = require("../config/db");

const query = `
CREATE TABLE IF NOT EXISTS states (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country_id INT,
  FOREIGN KEY (country_id) REFERENCES countries(id)
)
`;

db.query(query, (err, result) => {
  if (err) console.error("Error creating states table:", err);
  else console.log("✅ States table created or exists");
});
