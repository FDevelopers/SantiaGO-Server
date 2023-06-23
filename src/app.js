const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

const port = 3001;
const app = express();


//Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//Routes
app.use("/api/terminal", require("./routes/terminal.routes"));


app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
