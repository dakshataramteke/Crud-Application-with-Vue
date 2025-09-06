import databaseConn from "../config/db.ts";

/* === Create Request === */ 
const createUserData = async (userData:any) => {
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
 interface GetUsersParams {
  query?: string;
  page?: number | string ;
  limit?: number | string;
  sortBy?: string;
  order?: string;
}

   const getUsersData = async ({ query, page, limit, sortBy, order }: GetUsersParams) => {
     const pageNum = parseInt(page  as string, 10) || 1;
     const limitNum = parseInt(limit  as string, 10) || 10;
     const offset = (pageNum - 1) * limitNum;
     const search = query ? `%${query}%` : "%%";

     const sortByVariants = ["firstname", "dob", "created_at"];
     const orderVariants = ["asc", "desc"];

     // sort -> asc
     sortBy = sortByVariants.includes(sortBy  as string) ? sortBy : "firstname";
     order = orderVariants.includes(order  as string) ? order : "asc";

    const sql = `SELECT * 
             FROM registration 
             WHERE firstname ILIKE $1 OR lastname ILIKE $1
             ORDER BY ${sortBy} ${order} LIMIT $2 OFFSET $3`;

     const ResultCount = `SELECT Count(*)::int as count FROM registration WHERE firstname ILIKE $1 OR lastname ILIKE $1`;

     try {
       const result = await databaseConn.query(sql, [search, limitNum, offset]);
const formattedRows = result.rows.map(row => {
  let formattedDob;
  if (row.dob) {
    const dateOfBirth = new Date(row.dob);
if (!isNaN(dateOfBirth.getTime())) {      const day = dateOfBirth.getDate().toString().padStart(2, '0');
      const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0');
      const year = dateOfBirth.getFullYear();
      formattedDob = `${day}-${month}-${year}`;
    }
  }
  return {
    ...row,
    dateOfBirth: formattedDob
  };
});
       const countResult = await databaseConn.query(ResultCount, [search]);
       console.log(formattedRows)
       return {formattedRows, totalUsers: countResult.rows[0].count };
     } catch (error) {
       console.error("Error executing query:", error);
       throw new Error("Error in getting Data");
     }
   };
   

 /* ==== Get Data in Edit === */
 
 const  getEditUser = async(id:number) => {
   const sql = "SELECT * FROM registration WHERE id = $1";
   try{
    const result =  await databaseConn.query(sql, [id]);
   const formattedRows = result.rows.map(row => {
    let formattedDob;
  if (row.dob) {
    const dateOfBirth = new Date(row.dob);
if (!isNaN(dateOfBirth.getTime())) {      const day = dateOfBirth.getDate().toString().padStart(2, '0');
      const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0');
      const year = dateOfBirth.getFullYear();
      formattedDob = `${day}-${month}-${year}`;
    }
  }
  return {
    ...row,
    dateOfBirth: formattedDob
  };
});
       console.log("Get Results all users",formattedRows);
      return formattedRows
     }catch(error) {
       console.error("Database query error:", error);
       throw new Error("Error in Getting Data")
 };
}


/* === Update Route === */

const editUser =async (id:number, userData:any) => {
    
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
const deleteUser = async (id:number) => {
  const sql = "DELETE FROM registration WHERE id = $1";
  try{
    const result = await databaseConn.query(sql, [id]);
    console.log(result.rows);
  
  }catch(error){
    console.error("Database query error : ", error);
    throw new Error("Error in Deleting Data")
  }
};

export default {createUserData, getUsersData, getEditUser, editUser, deleteUser}

