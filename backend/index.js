const express = require('express')
const app = express();
const cors = require("cors");
const databaseConn = require("./config/db");
app.use(cors());
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.post("/submitform", (req, res) => {
    console.log(req.body);
    const { fname, lname, dob, mobilenumber, address } = req.body;

    const query = `INSERT INTO registration (firstname, lastname,dob, mobile_num,  address) VALUES ($1, $2, $3, $4, $5)`;
    values=[fname, lname, dob, mobilenumber, address]
    databaseConn.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing query:", error);
            return res.status(500).send("Error inserting data");
        }
        else{
            // console.log(results);
            return res.status(200).send("Form Submitted");
        }
    
    });
});

app.get("/alldata",(req,res)=>{
   const sql = `Select * from registration`;
   databaseConn.query(sql,(error, results)=>{
    if(error){
        console.error("Error executing query", error);
        return res.status(500).send("Error to fetch Data");
    }
    else{
        console.log(results);
    return res.status(200).send(results.rows);
    }
   
   })
  
})


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
