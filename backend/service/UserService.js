import databaseConn from "../config/db.js";

/* === Create Request === */ 
const createUserData = async (userData) => {
  const { firstName, lastName, dateOfBirth, mobileNumber, address } = userData;
  const sql = `INSERT INTO registration (firstname, lastname, dob, mobile_num, address) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [firstName, lastName, dateOfBirth, mobileNumber, address];
  
  try {
    const result = await databaseConn.query(sql, values);
    return result.rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error("Error inserting user data");
  }
};

/* === Get all the Data from Form === */
 
   const getUsersData = async ({ query, page, limit, sortBy, order }) => {
     const pageNum = parseInt(page, 10) || 1;
     const limitNum = parseInt(limit, 10) || 10;
     const offset = (pageNum - 1) * limitNum;
     const search = query ? `%${query}%` : "%%";

     const sortByVariants = ["firstname", "dob", "created_at"];
     const orderVariants = ["asc", "desc"];

     // sort -> asc
     sortBy = sortByVariants.includes(sortBy) ? sortBy : "firstname";
     order = orderVariants.includes(order) ? order : "asc";

    const sql = `SELECT * 
             FROM registration 
             WHERE firstname ILIKE $1 OR lastname ILIKE $1
             ORDER BY ${sortBy} ${order} LIMIT $2 OFFSET $3`;

     const ResultCount = `SELECT Count(*)::int as count FROM registration WHERE firstname ILIKE $1 OR lastname ILIKE $1`;

     try {
       const result = await databaseConn.query(sql, [search, limitNum, offset]);

       const formattedRows = result.rows.map((row) => {
         const dateOfBirth = new Date(row.dob);
         const day = dateOfBirth.getDate().toString().padStart(2, "0");
         const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, "0");
         const year = dateOfBirth.getFullYear();

         return {
           ...row,
           dateOfBirth: `${day}-${month}-${year}`, 
         };
       });
       console.log(result.rows)

       const countResult = await databaseConn.query(ResultCount, [search]);
       return {formattedRows, totalUsers: countResult.rows[0].count };
     } catch (error) {
       console.error("Error executing query:", error);
       throw new Error("Error in getting Data");
     }
   };
   

 /* ==== Get Data in Edit === */
 
 const  getEditUser = async(id) => {
   const sql = "SELECT * FROM registration WHERE id = $1";
   try{
    const result =  await databaseConn.query(sql, [id])
     const formattedRows = result.rows.map(row => {
      const dateOfBirth = new Date(row.dob);
      const day = dateOfBirth.getDate().toString().padStart(2, '0');
      const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0');
      const year = dateOfBirth.getFullYear();
      row.dateOfBirth = `${day}-${month}-${year}`; 
    });
       console.log("Get Results all users",result.rows);
       return result.rows;
     }catch(error) {
       console.error("Database query error:", error);
       throw new Error("Error in Getting Data")
 };
}


/* === Update Route === */

const editUser =async (id, userData) => {
    
    const { firstName, lastName, dateOfBirth, mobileNumber, address } = userData;

  const sql =
    "UPDATE registration SET firstname=$1, lastname=$2, dob=$3 , mobile_num=$4, address=$5 WHERE id = $6 RETURNING *";
  const values = [firstName, lastName, dateOfBirth, mobileNumber, address ,id];

  try{
    const result = await databaseConn.query(sql, values);
    return result.rows;
  }catch(error){
    console.error("Error in executing query :", error);
    throw new Error("Error in Editing Data ");
  }
};

 /* === Delete User === */
const deleteUser = async (id) => {
  const sql = "DELETE FROM registration WHERE id = $1";
  try{
    const result = databaseConn.query(sql, [id]);
    console.log(result.rows);
  
  }catch(error){
    console.error("Database query error : ", error);
    throw new Error("Error in Deleting Data")
  }
};

export default {createUserData, getUsersData, getEditUser, editUser, deleteUser}

