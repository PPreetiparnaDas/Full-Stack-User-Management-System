const countryModel = require("../models/countryModel");

// Add Country
exports.addCountryAPI = (req, res) => {
  countryModel.createCountry(req.body, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: "Country added", id: result.insertId });
  });
};

// List All Countries
exports.listAllCountriesAPI = (req, res) => {
  countryModel.getAllCountries((err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json(results);
  });
};
