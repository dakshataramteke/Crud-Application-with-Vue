import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { decryptToken } from "../utils/crypto";
const JWT_SECRET = process.env.JWT_SECRET;
import databaseConn from "../config/db";
import { AuthRequest, JWTPayload } from "../types/admin";

export const authAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const encryptToken: string = req.cookies.token;
      //  console.log(" Cookies of Auth Admin is ",encryptToken)
    if (!encryptToken) {
      res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }
    const decrypt = decryptToken(encryptToken);
    // console.log("Decrypt Code ", decrypt);
    const decode = jwt.verify(decrypt, JWT_SECRET as string);
    if (typeof decode !== "object" || decode === null) {
      res.status(401).json({
        success: false,
        message: "Authorization failed",
      });
    }
    // const { email } = decode;
    const payload = decode as JWTPayload;
    const email = payload.email;
    console.log("Decode Object is ", payload);

    // req.token = decode;
    const result = await databaseConn.query("SELECT * FROM admin where email = $1",[email]);
// console.log("The Auth Admin Result ", result.rows);
    req.user = result.rows[0]
    // console.log("Request after Decode request User", result.rows[0]);
    next();
  } catch (error) {
    console.log("The Auth error is ", error);
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
