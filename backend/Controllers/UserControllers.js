
const databaseConn = require("../config/db");

/* === Registration Form === */

const createUser = (req, res) => {
  console.log(req.body);
  const { firstName, lastName, dateOfBirth, mobileNumber, address } = req.body;
// Ser - controller
  const query = `INSERT INTO registration (firstname, lastname,dob, mobile_num,  address) VALUES ($1, $2, $3, $4, $5)`;
  const values = [firstName, lastName, dateOfBirth, mobileNumber, address];
  databaseConn.query(query, values, (error, results) => {
     if (error) {
      console.error("Error executing query:", error);
      return res.status(500).send("Error inserting data");
    } else {
      console.log(values);
      return res.status(200).send("Form Submitted");
    }
  });
};

/* === Get all the Data from Form === */

const getUsers = (req, res) => {
  const sql = `Select * from registration`;
  databaseConn.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing query", error);
      return res.status(500).send("Error to fetch Data");
    } else {
      console.log("My results of alldata",results.rows);
      return res.status(200).send(results.rows);
    }
  });
};

/* ==== Get Data in Edit === */

const  getEditUser = (req, res) => {
  let { id } = req.params;
  const sql = "SELECT * FROM registration WHERE id = $1";
  databaseConn.query(sql, [id])
    .then((results) => {
      results.rows.forEach(row => {
        const dateOfBirth = new Date(row.dob);
        const day = dateOfBirth.getDate().toString().padStart(2, '0');
        const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0');
        const year = dateOfBirth.getFullYear();
        row.dateOfBirth = `${day}-${month}-${year}`; 
      });
      console.log(results.rows);
      res.status(200).json({ data: results.rows, success: true });
    })
    .catch((error) => {
      console.error("Database query error:", error);
      res.status(500).json({
        error: "Failed to fetch students",
        success: false,
        details: error.message,
      });
    });
};

/* === Update Route === */

const editUser = (req, res) => {
    console.log(req.body);
  const { firstName, lastName, dateOfBirth, mobileNumber, address } = req.body;

  let { id } = req.params;
  console.log("Update list", req.body);
  const sql =
    "UPDATE registration SET firstname=$1, lastname=$2, dob=$3 , mobile_num=$4, address=$5 WHERE id = $6 RETURNING *";
  const values = [firstName, lastName, dateOfBirth, mobileNumber, address ,id];

  databaseConn.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).send("Error inserting data");
    } else {
      console.log("Values are", values);
      console.log(results.rows);
      // console.log(results)
      return res.status(200).send("Form Submitted");
    }
  });
};

/* === Delete the Data === */

const deleteUser = async (req, res) => {
    console.log(req.body)
  const { id } = req.params;
  const sql = "DELETE FROM registration WHERE id = $1";
  databaseConn.query(sql, [id], (error, results) => {
    if (error) {
      console.error("Error executing query", error);
      return res.status(500).send("Error to fetch Data");
    } else {
      return res.status(200).send(results.rows);
    }
  });
};

module.exports = {
    createUser,
    getUsers,
    getEditUser,
    editUser,
    deleteUser
};