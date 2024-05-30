const express = require("express");
const cors = require("cors");
const routes = require("./server/routes");
const { Connect } = require("./server/utils/db/dbconnect");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const corsOptions = {
    origin: "http://localhost:3000"
}

app.use(express.json());
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));
Connect(); //Db connect

app.use("/", routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
