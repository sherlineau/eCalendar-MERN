const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const DATABASE_URI = process.env.DATABASE_URI;

mongoose
  .connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Established a connection to the database"))
  .catch((err) =>
    console.log(`Something went wrong when connecting to the database: ${DATABASE_URI}`, err)
  );