const mongoose = require("mongoose");

function Connect() {
  mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("We are Connected!");
  });
}

function Disconnect() {
  mongoose.disconnect();
  console.log("disconnected");
}
module.exports = { Connect, Disconnect };
