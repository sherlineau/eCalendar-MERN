const express = require("express");
const cookieParser = require("cookie-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");


const app = express();

require("dotenv").config();

// configs
require("./config/mongoose.config");
require("./config/jwt.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("port", process.env.PORT || 3000);

app.use('/', express.static(path.join(__dirname, 'public')))

// routes
require("./routes/user.routes")(app);
require("./routes/appointments.routes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "..", "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', "build", "index.html"));
  });
} else {
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
    })
  );
}

// Listen
app.listen(app.get("port"), () => {
  console.log(`Listening at port: ${app.get("port")}`);
});
