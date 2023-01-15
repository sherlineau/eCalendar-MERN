const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path')
const corsOptions = require('./config/corsOptions')
module.exports = DATABASE = "eCalendar_db";

const app = express();

require("dotenv").config();

// configs
require("./config/mongoose.config");
require("./config/jwt.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.set("port", process.env.PORT || 3000);

app.use('/', express.static(path.join(__dirname, 'public')))


// routes
require("./routes/user.routes")(app);
require("./routes/appointments.routes")(app);

// Listen
app.listen(app.get("port"), () => {
  console.log(`Listening at port: ${app.get("port")}`);
});
