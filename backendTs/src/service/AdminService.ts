import databaseConn from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin, LoginAdmin } from "../types/admin";

/* === Create an Account === */

const createAccount = async (adminData: Admin) => {
  const { email, password, role } = adminData;
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
      INSERT INTO admin ( email, password, role)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [email, hashedPassword, role];

    const result = await databaseConn.query(sql, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating account:", error as Error);
    throw error;
  }
};

/* === Login a Account === */

const LoginAccount = async (LoginData: LoginAdmin) => {
  const { email, password } = LoginData;
  const userQuery = `SELECT * FROM admin WHERE email = $1`;
  const result = await databaseConn.query(userQuery, [email]);
  if (result.rows.length === 0) {
    throw new Error("User  Not Found");
  }
  const user = result.rows[0];
  console.log("Database Users Data in Login Account", user)
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Password");
  }
  const token = jwt.sign({ email:result.rows[0]?.email }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
//  console.log("JWT sign token", result.rows[0]?.email)
  return {token, user};
};

export default {
  LoginAccount,
  createAccount,
};
