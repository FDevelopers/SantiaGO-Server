const express = require("express");
const router = express.Router();
const sqlConnection = require("../data/mysqlConnection");

//Leer Un Usuario
router.get("/", (req, res) => {
  const search = req.query.param ? req.query.param : "";
  try {
    const query = `SELECT * FROM Chofer WHERE enable = ? AND (nombre LIKE ? OR userName LIKE ?)`;
    const values = [1, `${search}%`, `${search}%`];

    sqlConnection.query(query, values, function (error, results, fields) {
      if (error) {
        console.error("Error al consultar la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        // Format the fechaNacimiento field in each result
        results.forEach((result) => {
          result.fechaNacimiento = result.fechaNacimiento
            ? formatDate(result.fechaNacimiento)
            : "";
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
  const driver = req.body;
  if (
    driver.nombre.length > 0 &&
    driver.apellido.length > 0 &&
    driver.userName.length > 0
  ) {
    try {
      const query = `INSERT INTO Chofer  VALUES (0,?, ?, ?, ?, ?, ?,?);`;
      const values = [
        driver.nombre,
        driver.apellido,
        driver.fechaNacimiento,
        driver.userName,
        driver.userPassword,
        1,
        driver.telefono,
      ];

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
    res
      .status(400)
      .json({ error: "Usuario sin datos completos para registrar" });
  }
});

//Actualizar Usuario
router.put("/", (req, res) => {
  const driver = req.body;
  if (
    driver.nombre.length > 0 &&
    driver.apellido.length > 0 &&
    driver.userName.length > 0
  ) {
    try {
      const query = `UPDATE Chofer 
                       SET nombre = ?, apellido = ?, fechaNacimiento = ?, userName = ?, userPassword = ?, telefono = ?
                       WHERE id = ?`;
      const values = [
        driver.nombre,
        driver.apellido,
        driver.fechaNacimiento,
        driver.userName,
        driver.userPassword,
        driver.telefono,
        driver.id,
      ];

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
    res
      .status(400)
      .json({ error: "Usuario sin datos completos para actualizar" });
  }
});

//Delete Usuario
router.delete("/", (req, res) => {
  const driverId = req.query.id;
  try {
    if (driverId) {
      const query = `UPDATE Chofer 
                       SET enable = false
                       WHERE id = ?`;
      const values = [driverId]; // userId debe ser proporcionado

      sqlConnection.query(query, values, function (error, results, fields) {
        if (error) {
          console.error(
            "Error al deshabilitar usuario en la base de datos:",
            error
          );
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          if (results.affectedRows > 0) {
            console.log("Usuario deshabilitado exitosamente:", results);
            res.status(200).json({ status: "Usuario deshabilitado" });
          } else {
            console.log("El usuario con el ID proporcionado no existe");
            res
              .status(404)
              .json({ error: "El usuario con el ID proporcionado no existe" });
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

router.post("/login", (req, res) => {
  const { userName, userPassword } = req.body;
  const sql = "SELECT * FROM Usuario WHERE userName = ?";
  sqlConnection.query(sql, [userName], (error, results, fields) => {
    if (error) {
      console.error("Error en la consulta SQL:", error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
    if (results.length > 0) {
      const usuario = results[0];
      // Comparar la contraseña sin encriptar con la proporcionada por el usuario
      if (usuario.userPassword === userPassword && usuario.UserEnable) {
        // Eliminar la contraseña del objeto usuario antes de enviarlo
        delete usuario.userPassword;
        console.log(usuario);
        res.status(200).json({ message: "Inicio de sesión exitoso", usuario });
      } else {
        res.status(401).json({ message: "Credenciales inválidas" });
      }
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  });
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

module.exports = router;
