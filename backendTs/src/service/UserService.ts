import databaseConn from "../config/db";
import type { GetUsersParams, Users } from "../types/types";

/* === Create Request === */

const createUserData = async (userData: Users) => {
  const { firstName, lastName, dateOfBirth, mobileNumber, address } = userData;
  const sql = `INSERT INTO registration (first_name, last_name, date_of_birth, mobile_number, address) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [firstName, lastName, dateOfBirth, mobileNumber, address];

  try {
    const result = await databaseConn.query(sql, values);
    return result.rows;
  } catch (error) {
    console.error("Error executing query:", error as Error);
    throw new Error("Error inserting user data");
  }
};

/* === Get all the Data from Form === */

const getUsersData = async ({
  query,
  page,
  limit,
  sortBy,
  order,
}: GetUsersParams) => {
  const pageNum = parseInt(page as string, 10) || 1;
  const limitNum = parseInt(limit as string, 10) || 10;
  const offset = (pageNum - 1) * limitNum;
  const search = query ? `%${query}%` : "%%";

  const sortByVariants = ["first_name", "date_of_birth", "created_at"];
  const orderVariants = ["asc", "desc"];

  // sort -> asc
  sortBy = sortByVariants.includes(sortBy as string) ? sortBy : "first_name";
  order = orderVariants.includes(order as string) ? order : "asc";

  const sql = `SELECT * FROM registration 
             WHERE first_name ILIKE $1 OR last_name ILIKE $1
             ORDER BY ${sortBy} ${order} LIMIT $2 OFFSET $3`;

  const ResultCount = `SELECT Count(*)::int as count FROM registration WHERE first_name ILIKE $1 OR last_name ILIKE $1`;

  try {
    const result = await databaseConn.query(sql, [search, limitNum, offset]);
    // console.log("The Asc result", result.rows);
    const countResult = await databaseConn.query(ResultCount, [search]);
    return { result:result.rows, totalUsers: countResult.rows[0].count };
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error("Error in getting Data");
  }
};

/* ==== Get Data in Edit === */

const getEditUser = async (id: number) => {
  const sql = "SELECT * FROM registration WHERE id = $1";
  try {
    const result = await databaseConn.query(sql, [id]);
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error as Error);
    throw new Error("Error in Getting Data");
  }
};

/* === Update Route === */

const editUser = async (id: number, userData: Users) => {
  const { firstName, lastName, dateOfBirth, mobileNumber, address } = userData;

  const sql =
    "UPDATE registration SET first_name=$1, last_name=$2, date_of_birth=$3 , mobile_number=$4, address=$5 WHERE id = $6 RETURNING *";
  const values = [firstName, lastName, dateOfBirth, mobileNumber, address, id];

  try {
    const result = await databaseConn.query(sql, values);
    return result.rows;
  } catch (error) {
    console.error("Error in executing query :", error as Error);
    throw new Error("Error in Editing Data ");
  }
};

/* === Delete User === */

const deleteUser = async (id: number) => {
  const sql = "DELETE FROM registration WHERE id = $1";
  try {
    const result = await databaseConn.query(sql, [id]);
    console.log(result.rows);
  } catch (error) {
    console.error("Database query error : ", error as Error);
    throw new Error("Error in Deleting Data");
  }
};

export default {
  createUserData,
  getUsersData,
  getEditUser,
  editUser,
  deleteUser,
};
