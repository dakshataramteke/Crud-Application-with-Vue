const {Client} = require("pg");

const databaseConn = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"Dakshata@2025",
    database:"Crud Application"
})
databaseConn.connect();

module.exports = databaseConn;

