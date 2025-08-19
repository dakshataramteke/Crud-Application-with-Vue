const {Client} = require("pg");

const databaseConn = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})
databaseConn.connect();

module.exports = databaseConn;

