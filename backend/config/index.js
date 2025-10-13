// ***************** Imports ***************** //
import dbConfig from "./db.config";
import { Sequelize } from "sequelize";

// ***************** DB Config ***************** //
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ***************** Define Models ***************** //

// ***************** Models Relations ***************** //

// ***************** Exports ***************** //
module.exports = db;
