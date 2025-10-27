const stateModel = require("../models/stateModel");

// Add State
exports.addStateAPI = (req, res) => {
  stateModel.createState(req.body, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: "State added", id: result.insertId });
  });
};

// List All States
exports.listAllStatesAPI = (req, res) => {
  stateModel.getAllStates((err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json(results);
  });
};
