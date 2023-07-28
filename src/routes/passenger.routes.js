const express = require("express");
const router = express.Router();
const sqlConnection = require("../data/mysqlConnection");

router.get("/", (req, res) => {
  /* try {
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
  }*/
});

router.post("/", (req, res) => {
  res.json(
    {
    id: 1,
    cod: req.body.cod_usuario,
    name: "Fernando",
    last_name: "Disla", 
    balance: 100,
    passed: true  ,
  }
  
  );

  /*try {
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
  //console.log(req.body);*/
});

module.exports = router;
