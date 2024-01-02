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
  console.log(req.body);
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

router.get("/list", (req, res) => {
  try {
    sqlConnection.query(
      `SELECT 
      santiago_db.Vehiculo.id,
      santiago_db.Vehiculo.ficha,
      santiago_db.Vehiculo.placa,
      santiago_db.Ruta.descripcion AS ruta,
      CONCAT(santiago_db.Chofer.nombre, ' ', santiago_db.Chofer.apellido) AS chofer,
      santiago_db.Vehiculo.lastLat,
      santiago_db.Vehiculo.lastLgn,
      santiago_db.Vehiculo.asientosDisponibles
      FROM santiago_db.Vehiculo
      INNER JOIN santiago_db.Ruta ON santiago_db.Vehiculo.fkRuta = santiago_db.Ruta.id
      INNER JOIN santiago_db.Chofer ON santiago_db.Vehiculo.fkChofer = santiago_db.Chofer.id;`,
      function (error, results, fields) {
        if (error) {
          console.log(error);
        }

        const vh = [];

        results.map((item) => {
          vh.push({
            ficha: item.ficha,
            placa: item.placa,
            ruta: item.ruta,
            chofer: item.chofer,
            asientos_disponibles: item.asientosDisponibles,
            position: {
              latitude: item.lastLat,
              longitude: item.lastLgn,
            },
          });
        });

        res.status(200).json(vh);
      }
    );
  } catch (error) {
    res.send("Error", error);
  }
});


module.exports = router;
