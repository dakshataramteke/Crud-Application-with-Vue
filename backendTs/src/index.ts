import express from "express";
const app = express();
import cors from "cors"
import UserRoutes from './routes/UserRoutes';
import AdminLogin from './routes/AdminRoutes';
import { authAdmin } from "./middleware/authAdmin";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT ;

/* == Middleware == */

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,  // accept cookies
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api",AdminLogin);
app.use("/api",authAdmin,UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});