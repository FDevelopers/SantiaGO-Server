const express = require("express");
const router = express.Router();
const sqlConnection = require("../data/mysqlConnection");

router.get("/", (req, res) => {
  console.log(req.body);
  res.send("Recibido");
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.send("Recibido Post");
});

router.get("/d", (req, res) => {
  sqlConnection.connect();
  sqlConnection.query("QUERY", function (error, results, fields) {
    if (error) throw error;
    res.json({
      results,
    });
  });
  sqlConnection.end();
});

router.post("/2", (req, res) => {
  sqlConnection.connect();
  sqlConnection.query("QUERY", function (error, results, fields) {
    if (error) throw error;
    res.json({
      results,
    });
  });
  sqlConnection.end();
});

module.exports = router;
