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

router.post("/login", (req, res) => {
  const userName = req.body.userName;
  const userPassword = req.body.userPassword;

  try {
    sqlConnection.query(
      `SELECT * FROM santiago_db.Usuario 
      WHERE santiago_db.Usuario.userName = '${userName}' AND santiago_db.Usuario.userPassword = '${userPassword}'
      LIMIT 1;`,
      function (error, results, fields) {
        if (error) {
          console.log(error);
        }

        console.log(results);

        if (results.length === 0) {
          res.status(200).json({
            statusCode: 403,
            data: {
              state: "Error",
              Description: "Invalid UserName or Password"
            },
          });
        } else {
          res.status(200).json({
            statusCode: 200,
            data: {
              id: results.id,
              fullName: `${results[0].nombre} ${results[0].apellido}`,
              birthDate: results[0].fechaNacimiento,
              userName: results[0].userName,
              cards: [
                { cod: "1001", balance: 200 },
                { cod: "1002", balance: 50 },
              ],
              passed: true,
            },
          });
        }
      }
    );
  } catch (error) {
    res.send("Error", error);
  }
});

module.exports = router;
