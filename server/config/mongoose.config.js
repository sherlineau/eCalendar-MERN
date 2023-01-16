const mongoose = require("mongoose");
const DATABASE_URI = process.env.DATABASE_URI;

mongoose
  .connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Established a connection to the database"))
  .catch((err) =>
    console.log("Something went wrong when connecting to the database ", err)
  );