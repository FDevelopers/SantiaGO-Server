const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "maptest.ddns.net",
  user: "client",
  password: "root1234",
  database: "santiago_db_v2",
});

/*const connection = mysql.createConnection({
  host: "nerosoftdominicana.ddns.net",
  user: "fernandodisla",
  password: "RentCar2023@",
  database: "santiagogo",
});
*/

module.exports = connection;
