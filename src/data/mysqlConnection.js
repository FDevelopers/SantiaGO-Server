const mysql = require("mysql");

/*const connection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});*/

const connection = mysql.createConnection({
  host: "nerosoftdominicana.ddns.net",
  user: "fernandodisla",
  password: "RentCar2023@",
  database: "santiagogo",
});


module.exports =  connection;
