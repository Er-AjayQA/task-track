// ***************** Imports ***************** //
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./config/index.js");

// ***************** Import Routes ***************** //

// ***************** Configs ***************** //
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ***************** DB Sync ***************** //
// db.sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("DB Sync Successfully............");
//   })
//   .catch((err) => {
//     console.log("DB Sync Failed.............");
//     console.error(err);
//   });

// ***************** Listen To Server ***************** //
app.listen(PORT, (error) => {
  error
    ? console.log(`Getting error in connecting to server: ${error}`)
    : console.log(`Server running on port : ${PORT}`);
});
