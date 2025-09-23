import databaseConn from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../types/admin";

/* === Create an Account === */

const createAccount = async (adminData: Admin) => {
  const { email, password } = adminData;
  const checkExisting = `SELECT * FROM admin WHERE email = $1`;
  try {
    const existingResult = await databaseConn.query(checkExisting, [email]);

    if (existingResult.rows.length > 0) {
      // Email already exists
      throw new Error("Email already exists");
    }
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO admin ( email, password)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [email, hashedPassword];

    const result = await databaseConn.query(sql, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating account:", error as Error);
    throw error;
  }
};

/* === Login a Account === */

const LoginAccount = async (LoginData: Admin) => {
  const { email, password } = LoginData;
  const userQuery = `SELECT * FROM admin WHERE email = $1`;
  const result = await databaseConn.query(userQuery, [email]);
  if (result.rows.length === 0) {
    throw new Error("User  Not Found");
  }
  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Password");
  }
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  return token;
};

export default {
  LoginAccount,
  createAccount,
};
