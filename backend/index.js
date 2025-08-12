const express = require("express");
const app = express();
const cors = require("cors");
const databaseConn = require("./config/db");
// const UserControllers = require("./Controllers/UserControllers ")
const UserRoutes = require("./routes/UserRoutes");
const port = 3000;

/* == Middleware == */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users",UserRoutes)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
