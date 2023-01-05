const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
module.exports = DATABASE = "eCalendar_db";

// configs
require("./config/mongoose.config");
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('port', process.env.PORT || 3000);

// routes
require('./routes/test.routes')(app)
require('./routes/user.routes')(app);
require('./routes/Appointment.routes')(app)

// Listen
app.listen(app.get('port'), ()=> {console.log(`Listening at port: ${app.get('port')}`);});
