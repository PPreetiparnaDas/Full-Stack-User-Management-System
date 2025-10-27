const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_jwt_secret"; // change this to a strong secret

// REGISTER
exports.register = async (req, res) => {
  const { name, email, phone, city, state_id, country_id, pincode, password } =
    req.body;

  try {
    // Check if user already exists
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length > 0)
          return res.status(400).json({ message: "Email already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        db.query(
          "INSERT INTO users (name,email,phone,city,state_id,country_id,pincode,password) VALUES (?,?,?,?,?,?,?,?)",
          [
            name,
            email,
            phone,
            city,
            state_id,
            country_id,
            pincode,
            hashedPassword,
          ],
          (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            res.status(201).json({ message: "User registered successfully" });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length === 0)
        return res.status(400).json({ message: "Invalid credentials" });

      const user = results[0];
      console.log("DB password:", user.password);

      const match = await bcrypt.compare(password, user.password);
      console.log("Password match:", match);
      if (!match)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "24h",
      });

      res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    }
  );
};
