const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addStateAPI,
  listAllStatesAPI,
} = require("../controllers/stateController");

router.post("/createStateAPI", authMiddleware, addStateAPI);
router.get("/listStatesAPI", listAllStatesAPI);

router.get("/listStatesByCountry/:countryId", (req, res) => {
  const { countryId } = req.params;
  const db = require("../config/db");
  db.query(
    "SELECT * FROM states WHERE country_id = ?",
    [countryId],
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    }
  );
});

module.exports = router;
