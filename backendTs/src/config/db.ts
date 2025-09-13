import { Client, types } from "pg";

// for Date pg for convert the date to Js
types.setTypeParser(1082, (val) => val);

const databaseConn = new Client({
    user: process.env.DB_USER ,
    host: process.env.DB_HOST ,
    database: process.env.DB_NAME ,
    password: process.env.DB_PASSWORD ,
port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432
})
databaseConn.connect();

export default databaseConn;


