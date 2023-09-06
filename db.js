const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "students",
    password: process.env.password,
    port: 5432,
  });

  module.exports=pool