const express = require("express");
const router = express.Router();
const sqlConnection = require("../data/mysqlConnection");

function buscarTarjetaPorCodigo(codigo, callback) {
  sqlConnection.query(
    `
    SELECT 
      Tarjeta.id,
      Tarjeta.cod,
      Tarjeta.alias,
      Tarjeta.fechaRegistro AS fechaRegistro,
      Tarjeta.enabled,
      Usuario.nombre AS nombre,
      Usuario.userName as usuario,
      Usuario.apellido AS apellido,
      SUM(COALESCE(TransaccionCard.montoCredito, 0)) AS total_credito,
      SUM(COALESCE(TransaccionCard.montoDebito, 0)) AS total_debito,
      SUM(COALESCE(TransaccionCard.montoCredito, 0) - COALESCE(TransaccionCard.montoDebito, 0)) AS balance
    FROM 
      Tarjeta 
    INNER JOIN 
      Usuario ON Tarjeta.fkUsuario = Usuario.id
    LEFT JOIN 
      TransaccionCard ON Tarjeta.id = TransaccionCard.fkTarjeta
    WHERE 
      Tarjeta.cod = ? AND Tarjeta.enabled = 1
    GROUP BY 
      Tarjeta.id, Tarjeta.cod, Tarjeta.fechaRegistro, Usuario.nombre, Usuario.apellido;
    `,
    [codigo],
    function (error, results, fields) {
      if (error) {
        console.error("Error al buscar tarjeta en la base de datos:", error);
        callback(error, null);
      } else {
        console.log("Búsqueda exitosa de tarjeta:", results);
        callback(null, results);
      }
    }
  );
}

router.get("/", (req, res) => {
  const userId = req.query.userId ? req.query.userId : 0;
  try {
    const query = `SELECT 
    Tarjeta.id,
    Tarjeta.cod,
    Tarjeta.alias,
    Tarjeta.fechaRegistro,
    SUM(COALESCE(TransaccionCard.montoCredito, 0)) AS total_credito,
    SUM(COALESCE(TransaccionCard.montoDebito, 0)) AS total_debito,
    SUM(COALESCE(TransaccionCard.montoCredito, 0) - COALESCE(TransaccionCard.montoDebito, 0)) AS diferencia
FROM 
    Tarjeta
LEFT JOIN 
    TransaccionCard ON Tarjeta.id = TransaccionCard.fkTarjeta
WHERE
    Tarjeta.fkUsuario = ? and Tarjeta.enabled = 1
GROUP BY 
    Tarjeta.id, Tarjeta.cod;`;
    const values = [userId];

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

router.post("/", (req, res) => {
  console.log(req.body);

  try {
    const tarjeta = {
      cod: req.body.cod,
      alias: req.body.alias,
      fkUsuario: req.body.fkUsuario,
      fechaRegistro: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    // Verificar si el código ya está registrado
    sqlConnection.query(
      "SELECT COUNT(*) AS count FROM santiago_db_v2.Tarjeta WHERE cod = ?",
      tarjeta.cod,
      (error, results, fields) => {
        if (error) {
          console.error("Error al consultar la base de datos:", error);
          res.status(500).json({ error: "Error interno del servidor" });
          return;
        }

        const count = results[0].count;
        console.log(count);
        if (count > 0) {
          // El código ya está registrado
          res.status(400).json({ error: "El código ya está registrado" });
          return;
        }

        // Si el código no está registrado, proceder con la inserción
        sqlConnection.query(
          "INSERT INTO Tarjeta SET ?",
          tarjeta,
          (error, results, fields) => {
            if (error) {
              console.error("Error al insertar en la base de datos:", error);
              res.status(500).json({ error: "Error interno del servidor" });
            } else {
              console.log("Inserción exitosa:", results);
              res
                .status(200)
                .json({ status: "Tarjeta insertada correctamente" });
            }
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/", (req, res) => {
  const idTarjeta = req.query.id;
  try {
    sqlConnection.query(
      "UPDATE Tarjeta SET enabled = false WHERE id = ?",
      idTarjeta,
      (error, results, fields) => {
        if (error) {
          console.error("Error al desactivar la tarjeta:", error);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          if (results.affectedRows === 0) {
            // No se encontró la tarjeta con el ID proporcionado
            res.status(404).json({ error: "No se encontró la tarjeta" });
          } else {
            // La tarjeta fue desactivada correctamente
            res
              .status(200)
              .json({ status: "Tarjeta desactivada correctamente" });
          }
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/card", (req, res) => {
  const codigoTarjeta = req.query.cod;

  buscarTarjetaPorCodigo(codigoTarjeta, (error, resultados) => {
    if (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      if (resultados.length === 0) {
        // No se encontró ninguna tarjeta con el código proporcionado
        res.status(404).json({ error: "Tarjeta no encontrada" });
      } else {
        // Se encontró una tarjeta, devolver los resultados
        res.status(200).json({ results: resultados });
      }
    }
  });
});

router.post("/transaction", (req, res) => {
  console.log(req.body);
  const fechaActual = new Date().toISOString().slice(0, 19).replace("T", " "); // Obtiene la fecha y hora actual en formato ISO 8601
  const transaccion = {
    fkTarjeta: req.body.fkTarjeta, // ID de la tarjeta asociada
    fkTipoTransaccion: req.body.fkTipoTransaccion, // ID del tipo de transacción
    montoCredito: req.body.montoCredito,
    montoDebito: 0.0,
    fechaRegistro: fechaActual,
  };
  try {
    sqlConnection.query(
      `INSERT INTO TransaccionCard (fkTarjeta, fkTipoTransaccion, montoCredito, montoDebito, fechaRegistro) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        transaccion.fkTarjeta,
        transaccion.fkTipoTransaccion,
        transaccion.montoCredito,
        transaccion.montoDebito,
        transaccion.fechaRegistro,
      ],
      function (error, results, fields) {
        if (error) {
          console.error("Error al insertar en la base de datos:", error);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          console.log("Inserción exitosa:", results);
          res
            .status(200)
            .json({ status: "Transacción insertada correctamente" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/transaction", (req, res) => {
  const fkTarjeta = req.query.fkTarjeta;
  try {
    sqlConnection.query(
      `SELECT TransaccionCard.*, TipoTransaccion.descripcion AS tipoTransaccion
       FROM TransaccionCard
       INNER JOIN TipoTransaccion ON TransaccionCard.fkTipoTransaccion = TipoTransaccion.id
       WHERE TransaccionCard.fkTarjeta = ?`,
      [fkTarjeta], // Reemplaza fkTarjeta con el ID de la tarjeta que deseas filtrar
      function (error, results, fields) {
        if (error) {
          console.error("Error al consultar la base de datos:", error);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          console.log("Consulta exitosa:", results);
          res.status(200).json({ transactions: results });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/pay", (req, res) => {
  const codigoTarjeta = req.body.tarjeta;
  buscarTarjetaPorCodigo(codigoTarjeta, (error, resultados) => {
    if (error) {
      res.status(500).json({ status: "Error interno del servidor" });
    } else {
      if (resultados.length === 0) {
        // No se encontró ninguna tarjeta con el código proporcionado
        res.status(404).json({ status: "Tarjeta no encontrada" });
      } else {
        const tarjeta = resultados[0]; // Tomamos la primera tarjeta encontrada

        // Verificar si la tarjeta está habilitada
        if (tarjeta.enabled === 1) {
          // Verificar si el balance es mayor o igual a 50
          if (tarjeta.balance >= 50) {
            // Preparar la transacción aquí usando los datos de la tarjeta
            const transaccion = {
              fkTarjeta: tarjeta.id,
              fkTipoTransaccion: 2,
              montoCredito: 0.0,
              montoDebito: 50.0,
              fechaRegistro: new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " "),
            };

            // Insertar la transacción en la base de datos
            sqlConnection.query(
              `INSERT INTO TransaccionCard (fkTarjeta, fkTipoTransaccion, montoCredito, montoDebito, fechaRegistro) 
               VALUES (?, ?, ?, ?, ?)`,
              [
                transaccion.fkTarjeta,
                transaccion.fkTipoTransaccion,
                transaccion.montoCredito,
                transaccion.montoDebito,
                transaccion.fechaRegistro,
              ],
              function (error, results, fields) {
                if (error) {
                  console.error(
                    "Error al insertar transacción en la base de datos:",
                    error
                  );
                  res.status(500).json({ status: "Error interno del servidor" });
                } else {
                  console.log("Transacción insertada exitosamente:", results);
                  res
                    .status(200)
                    .json({ status: "Transacción realizada correctamente" });
                }
              }
            );
          } else {
            // El balance no es suficiente para realizar la transacción
            res.status(402).json({ status: "Balance insuficiente" });
          }
        } else {
          // La tarjeta no está habilitada
          res.status(403).json({ status: "Tarjeta deshabilitada" });
        }
      }
    }
  });
});

module.exports = router;
