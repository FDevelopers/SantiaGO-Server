const express = require("express");
const router = express.Router();
const sqlConnection = require("../data/mysqlConnection");

// Obtener vehículos
router.get("/", (req, res) => {
  const search = req.query.param ? req.query.param : "";

  try {
    const query = `SELECT * FROM Vehiculo WHERE VehicleEnable = ? AND (marca LIKE ? OR placa LIKE ?)`;
    const values = [1, `${search}%`, `${search}%`];

    sqlConnection.query(query, values, function (error, results, fields) {
      if (error) {
        console.error("Error al consultar la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.status(200).json({ results });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Registrar Vehículo
router.post("/", (req, res) => {
  const vehicle = req.body;
  console.log(vehicle);
  if (
    vehicle.marca.length > 0 &&
    vehicle.modelo.length > 0 &&
    vehicle.anio.length > 0 &&
    vehicle.placa.length > 0 &&
    vehicle.color.length > 0 &&
    vehicle.fkChofer &&
    vehicle.fkRuta
  ) {
    try {
      const query = `INSERT INTO Vehiculo (ficha, placa, fkChofer, fkRuta, marca, modelo, color, anio) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        vehicle.ficha,
        vehicle.placa,
        vehicle.fkChofer,
        vehicle.fkRuta,
        vehicle.marca,
        vehicle.modelo,
        vehicle.color,
        vehicle.anio,
      ];

      sqlConnection.query(query, values, function (error, results, fields) {
        if (error) {
          console.error("Error al insertar en la base de datos:", error);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          res.status(200).json({ status: "Vehículo registrado" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res
      .status(400)
      .json({ error: "Vehículo sin datos completos para registrar" });
  }
});

// Actualizar Vehículo
router.put("/", (req, res) => {
  const vehicle = req.body;
  console.log(vehicle);
  try {
    const query = `UPDATE Vehiculo 
                       SET ficha = ?, placa = ?, fkChofer = ?, fkRuta = ?, marca = ?, modelo = ?, color = ?, anio = ?
                       WHERE id = ?`;
    const values = [
      vehicle.ficha,
      vehicle.placa,
      vehicle.fkChofer,
      vehicle.fkRuta,
      vehicle.marca,
      vehicle.modelo,
      vehicle.color,
      vehicle.anio,
      vehicle.id,
    ];

    sqlConnection.query(query, values, function (error, results, fields) {
      if (error) {
        console.error("Error al actualizar en la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        console.log(vehicle);

        res.status(200).json({ status: "Vehículo actualizado" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar Vehículo
router.delete("/", (req, res) => {
  const vehicleId = req.query.id;
  try {
    if (vehicleId) {
      const query = `DELETE FROM Vehiculo WHERE id = ?`;
      const values = [vehicleId];

      sqlConnection.query(query, values, function (error, results, fields) {
        if (error) {
          console.error(
            "Error al eliminar vehículo en la base de datos:",
            error
          );
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          if (results.affectedRows > 0) {
            res.status(200).json({ status: "Vehículo eliminado" });
          } else {
            res
              .status(404)
              .json({ error: "El vehículo con el ID proporcionado no existe" });
          }
        }
      });
    } else {
      res.status(400).json({
        error: "No se proporcionó el ID del vehículo para eliminar",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
