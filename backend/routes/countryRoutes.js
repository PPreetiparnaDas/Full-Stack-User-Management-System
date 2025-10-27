const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // import middleware
const {
  addCountryAPI,
  listAllCountriesAPI,
} = require("../controllers/countryController");

// Protect country creation
router.post("/createCountryAPI", authMiddleware, addCountryAPI);

// Allow anyone to list countries
router.get("/listCountriesAPI", listAllCountriesAPI);

module.exports = router;
