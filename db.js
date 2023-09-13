const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "students",
  username: "postgres",
  password: "12345",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});


module.exports = sequelize;
