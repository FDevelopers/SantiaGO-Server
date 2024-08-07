const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3001;
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use("/api/vehicle", require("./routes/vehicle.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/driver", require("./routes/driver.routes"));
app.use("/api/routes", require("./routes/routes.routes"));
app.use("/api/cards", require("./routes/cards.routes"));
app.use("/api/routes", require("./routes/routes.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/maps", require("./routes/maps.routes"));

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
