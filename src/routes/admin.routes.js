const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sqlConnection = require("../data/mysqlConnection");

// Secret key para firmar los tokens
const secretKey = "santiago_secret_key";

router.post("/login", (req, res) => {
  const { userName, userPassword } = req.body;
  const sql = "SELECT * FROM Operador WHERE userName = ?";

  sqlConnection.query(sql, [userName], (error, results, fields) => {
    if (error) {
      console.error("Error en la consulta SQL:", error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
    if (results.length > 0) {
      const usuario = results[0];
      // Comparar la contraseña en texto plano con la contraseña almacenada
      if (usuario.userPassword === userPassword) {
        if (!usuario.UserEnable) {
          return res.status(401).json({ message: "Usuario deshabilitado" });
        }
        // Crear un token JWT
        const token = jwt.sign(
          { userId: usuario.userId, userName: usuario.userName },
          secretKey
        );
        // Devolver el token al cliente
        res.status(200).json({ message: "Inicio de sesión exitoso", token });
      } else {
        res.status(401).json({ message: "Credenciales inválidas" });
      }
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  });
});

module.exports = router;
