import express from "express";
const app = express();
import cors from "cors"
import UserRoutes from './routes/UserRoutes.js'
const PORT = process.env.PORT;

/* == Middleware == */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",UserRoutes)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
