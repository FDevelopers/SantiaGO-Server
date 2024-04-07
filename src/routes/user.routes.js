const express = require("express");
const router = express.Router();
const sqlConnection = require("../data/mysqlConnection");

router.get("/list", (req, res) => {
  try {
    sqlConnection.query(
      `SELECT * FROM Usuario`,
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

//Leer Un Usuario
router.get("/", (req, res) => {
  const search = req.query.param ? req.query.param : "";

  try {
    const query = `SELECT * FROM Usuario WHERE UserEnable = ? AND (nombre LIKE ? OR userName LIKE ?)`;
    const values = [1, `${search}%`, `${search}%`];

    sqlConnection.query(query, values, function (error, results, fields) {
      if (error) {
        console.error("Error al consultar la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        //console.log("Consulta exitosa:", results);
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
  const user = req.body;
  if (
    user.nombre.length > 0 &&
    user.apellido.length > 0 &&
    user.userName.length > 0
  ) {
    try {
      const query = `INSERT INTO Usuario VALUES(0, ?, ?, ?, ?, ?,?)`;
      const values = [
        user.nombre,
        user.apellido,
        "1930-12-01",
        user.userName,
        user.userPassword,
        true,
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
  const user = req.body;
  if (
    user.nombre.length > 0 &&
    user.apellido.length > 0 &&
    user.userName.length > 0
  ) {
    try {
      const query = `UPDATE Usuario 
                       SET nombre = ?, apellido = ?, fechaNacimiento = ?, userName = ?, userPassword = ?
                       WHERE id = ?`;
      const values = [
        user.nombre,
        user.apellido,
        "1930-12-01",
        user.userName,
        user.userPassword,
        user.id,
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
  const userId = req.query.id;
  try {
    if (userId) {
      const query = `UPDATE Usuario 
                       SET UserEnable = false
                       WHERE id = ?`;
      const values = [userId]; // userId debe ser proporcionado

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
        console.log(usuario)
        res.status(200).json({ message: "Inicio de sesión exitoso", usuario });
      } else {
        res.status(401).json({ message: "Credenciales inválidas" });
      }
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  });
});

module.exports = router;
