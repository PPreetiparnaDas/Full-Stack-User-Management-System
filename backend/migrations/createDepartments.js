const db = require("../config/db");

const createDepartmentsTable = `
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

db.query(createDepartmentsTable, (err, result) => {
  if (err) {
    console.error("Error creating departments table:", err);
  } else {
    console.log("✅ Departments table created successfully!");
  }
  db.end(); // close the connection
});
