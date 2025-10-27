const db = require("../config/db");

const query = `
CREATE TABLE IF NOT EXISTS countries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country_code VARCHAR(10) NOT NULL
)
`;

db.query(query, (err, result) => {
  if (err) console.error("Error creating countries table:", err);
  else console.log("✅ Countries table created or exists");
});
