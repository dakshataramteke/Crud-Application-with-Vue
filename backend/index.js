const express = require("express");
const app = express();
const cors = require("cors");
const UserRoutes = require("./routes/UserRoutes");
const PORT = process.env.PORT;

/* == Middleware == */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",UserRoutes)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
