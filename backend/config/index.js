// ***************** Imports ***************** //
const dbConfig = require("./db.config");
const Sequelize = require("sequelize");

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
// User Master Model
db.um_user_master = require("../api/userManagement/model/user.model")(
  sequelize,
  Sequelize
);
// Login History Master Model
db.um_login_history = require("../api/userManagement/model/login.model")(
  sequelize,
  Sequelize
);

// ***************** Models Relations ***************** //

// ***************** Exports ***************** //
module.exports = db;
