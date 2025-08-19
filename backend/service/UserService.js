const databaseConn = require("../config/db");

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

const getUsersData = async(getData) => {
  const sql = `Select * from registration`;
 try{
    const result =await  databaseConn.query(sql);
     const formattedRows = result.rows.map(row => {
      const dateOfBirth = new Date(row.dob);
      const day = dateOfBirth.getDate().toString().padStart(2, '0');
      const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0');
      const year = dateOfBirth.getFullYear();
      row.dateOfBirth = `${day}-${month}-${year}`; 
    }
  );
    
       console.log("Get User Data",result.rows);
      return result.rows;
  }catch(error){
    console.error("Error executing query :", error);
    throw new Error("Error in getting Data");
  };
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
       console.log(result.rows);
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

 /* Delete User */
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

module.exports = {
  createUserData,
  getUsersData,
  getEditUser, 
  editUser, 
  deleteUser
};

