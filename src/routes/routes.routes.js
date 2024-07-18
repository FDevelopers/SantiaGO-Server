const express = require("express");
const router = express.Router();
const sqlConnection = require("../data/mysqlConnection");

//Leer Un Usuario
router.get("/", (req, res) => {
  try {
    const query = `SELECT * FROM Ruta WHERE enable = 1`;
    sqlConnection.query(query, function (error, results, fields) {
      if (error) {
        console.error("Error al consultar la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        results.forEach((element) => {
          element.polygon = JSON.parse(element.polygon);
        });
        res.status(200).json({ results });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Registrar Usuario
router.post("/", (req, res) => {
  const rutas = req.body;
  console.log(rutas);

  if (rutas.description.length > 0) {
    try {
      const query = `INSERT INTO Ruta VALUES(0, ?, ?, ?, ?)`;
      const values = [rutas.description, JSON.stringify(rutas.coordinates), rutas.color, true];

      sqlConnection.query(query, values, function (error, results, fields) {
        if (error) {
          console.error("Error al insertar en la base de datos:", error);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          console.log("Inserción exitosa:", results);
          res.status(200).json({ status: "Usuario registrado" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(400).json({ error: "Usuario sin datos completos para registrar" });
  }
});

//Actualizar Usuario
router.put("/", (req, res) => {
  const ruta = req.body;
  if (ruta.description.length > 0) {
    try {
      const query = `UPDATE Ruta 
                         SET descripcion = ?, polygon = ?, colorRutas = ?, enable = ?
                         WHERE id = ?`;
      const values = [ruta.description, JSON.stringify(ruta.coordinates), ruta.color, 1, ruta.id];

      sqlConnection.query(query, values, function (error, results, fields) {
        if (error) {
          console.error("Error al actualizar en la base de datos:", error);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          console.log("Actualización exitosa:", results);
          res.status(200).json({ status: "Usuario actualizado" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(400).json({ error: "Usuario sin datos completos para actualizar" });
  }
});

//Delete Usuario
router.delete("/", (req, res) => {
  const rutaId = req.query.id;
  try {
    if (rutaId) {
      const query = `UPDATE Ruta
                         SET enable = false
                         WHERE id = ?`;
      const values = [rutaId]; // userId debe ser proporcionado

      sqlConnection.query(query, values, function (error, results, fields) {
        if (error) {
          console.error("Error al deshabilitar usuario en la base de datos:", error);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          if (results.affectedRows > 0) {
            console.log("Usuario deshabilitado exitosamente:", results);
            res.status(200).json({ status: "Usuario deshabilitado" });
          } else {
            console.log("El usuario con el ID proporcionado no existe");
            res.status(404).json({ error: "El usuario con el ID proporcionado no existe" });
          }
        }
      });
    } else {
      res.status(400).json({
        error: "No se proporcionó el ID del usuario para deshabilitar",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
