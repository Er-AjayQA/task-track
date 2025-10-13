// ***************** Imports ***************** //
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// ***************** Configs ***************** //
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ***************** Listen To Server ***************** //
app.listen(PORT, (error) => {
  error
    ? console.log(`Getting error in connecting to server: ${error}`)
    : console.log(`Server running on port : ${PORT}`);
});
