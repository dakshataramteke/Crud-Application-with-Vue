const express = require("express");
const app = express();
const cors = require("cors");
const databaseConn = require("./config/db");
const port = 3000;

/* == Middleware == */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* === Registration Form === */

app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { fname, lname, dob, mobilenumber, address } = req.body;

  const query = `INSERT INTO registration (firstname, lastname,dob, mobile_num,  address) VALUES ($1, $2, $3, $4, $5)`;
  values = [fname, lname, dob, mobilenumber, address];
  databaseConn.query(query, values, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).send("Error inserting data");
    } else {
      console.log(values);
      return res.status(200).send("Form Submitted");
    }
  });
});

/* === Get all the Data from Form === */

app.get("/api/users/alldata", (req, res) => {
  const sql = `Select * from registration`;
  databaseConn.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing query", error);
      return res.status(500).send("Error to fetch Data");
    } else {
      // console.log("My results",results.rows);
      return res.status(200).send(results.rows);
    }
  });
});

/* ==== Get Data in Edit === */

app.get("/api/users/:id/edit", (req, res) => {
    console.log(req.body);
  let { id } = req.params;
  console.log(id);
  const sql = "SELECT * FROM registration WHERE id = $1";
  databaseConn
    .query(sql, [id])
    .then((results) => {
      console.log("Edit ", results.rows);
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
});

/* === Update Route === */

app.put("/api/users/:id/edit", (req, res) => {
    console.log(req.body);
  const { firstname, lastname, dob, mobile_num, address } = req.body;

  let { id } = req.params;
  console.log("Update list", req.body);
  const sql =
    "UPDATE registration SET firstname=$1, lastname=$2, dob=$3 , mobile_num=$4, address=$5 WHERE id = $6 RETURNING *";
  values = [firstname, lastname, dob, mobile_num, address ,id];

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
});

/* === Delete the Data === */

app.delete("/api/:id", async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
