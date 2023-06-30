const express = require("express");
const router = express.Router();
const sqlConnection = require("../data/mysqlConnection");

router.get("/", (req, res) => {
  try {
    sqlConnection.query(
      `SELECT * FROM vehiculo where idvehiculo = ${1}`,
      function (error, results, fields) {
        res.json({
          results,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.send("Error", error);
  }
});

router.post("/", (req, res) => {
  try {
    sqlConnection.query(
      `UPDATE vehiculo SET latitud = '${req.body.lat}', longitud = '${
        req.body.lgn
      }' where idvehiculo = '${1}'`,
      function (error, results, fields) {
        res.send("Acutualizado Correctamente");
      }
    );
  } catch (error) {
    console.log(error);
    res.send("Error", error);
  }
  //console.log(req.body);
});

router.get("/d", (req, res) => {
  sqlConnection.connect();
  sqlConnection.query(
    `SELECT * FROM terminal where idvehiculo = ${1}`,
    function (error, results, fields) {
      if (error) throw error;
      res.json({
        results,
      });
    }
  );
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
