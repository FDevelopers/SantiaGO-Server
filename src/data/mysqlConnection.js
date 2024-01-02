const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "maptest.ddns.net",
  user: "fdeveloper",
  password: "Root1234@",
  database: "santiago_db",
});

/*const connection = mysql.createConnection({
  host: "nerosoftdominicana.ddns.net",
  user: "fernandodisla",
  password: "RentCar2023@",
  database: "santiagogo",
});
*/

module.exports = connection;
