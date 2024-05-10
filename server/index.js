import express from "express";
import mysql from "mysql"
import cors from 'cors';
import bcrypt from "bcrypt"

import dotenv from 'dotenv';

dotenv.config();

const app=express();

app.use(cors());
const db = mysql.createPool({
    connectionLimit:100,
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.PORT
})

console.log(process.env.PORT);

db.getConnection( (err, connection)=> {
    if (err) throw (err)
    console.log ("DB connected successful: " + connection.threadId)
 })

 app.use(express.json())
 app.post("/register", async (req,res) => {
 const user = req.body.email;
 const fname = req.body.firstname;
 const lname = req.body.lastname;
 const hashedPassword = await bcrypt.hash(req.body.password,10);
 db.getConnection( async (err, connection) => {
  if (err) throw (err)
  const sqlSearch = "SELECT * FROM user WHERE user = ?"
  const search_query = mysql.format(sqlSearch,[user])
  const sqlInsert = "INSERT INTO user VALUES (0,?,?,?,?)"
  const insert_query = mysql.format(sqlInsert,[user, hashedPassword, fname, lname])
  await connection.query (search_query, async (err, result) => {
   if (err) throw (err)
   console.log("------> Search Results")
   console.log(result.length)
   if (result.length != 0) {
    connection.release()
    console.log("------> User already exists")
    res.status(204).send("User already exists")
   } 
   else {
    await connection.query (insert_query, (err, result)=> {
    connection.release()
    if (err) throw (err)
    console.log ("--------> Created new User")
    console.log(result.insertId)
    res.status(200).send("user Created Successfully")
   })
  }
 }) 
 }) 
 }) 

app.post("/login", async (req, res) => {
    const user = req.body.email;
    const password = req.body.password;
    db.getConnection(async (err, connection) => {
        if (err) throw err;
        const sqlSearch = "SELECT * FROM user WHERE user = ?";
        const search_query = mysql.format(sqlSearch, [user]);
        await connection.query(search_query, async (err, result) => {
            connection.release();
            if (err) throw err;
            if (result.length == 0) {
                console.log("--------> User does not exist");
                res.status(404).send("User does not exist");
            } else {
                const firstname = result[0].firstname;
                const lastname = result[0].lastname;
                const email = result[0].email; 
                const hashedPassword = result[0].password;
                const fullname= firstname+" "+lastname;
                if (await bcrypt.compare(password, hashedPassword)) {
                    console.log("---------> Login Successful", {result: result});
                    res.send({ message: "Login successful", email: email, user: result[0].userId, name:fullname  });
                } else {
                    console.log("---------> Password Incorrect");
                    res.sendStatus(401); // Unauthorized
                }
            }
        });
    });
});

app.post("/logout", (req, res) => {
    const sessionId = req.body.sessionId; 
    if (sessions[sessionId]) {
        delete sessions[sessionId]; 
        console.log("---------> User Logged Out");
        res.send("Logged out successfully");
    } else {
        console.log("---------> No active session found");
        res.sendStatus(404);
    }
});

app.post("/like", async (req,res) => {

        const src = req.body.src;
        const url = req.body.url;
        const user = req.body.userid;
        const title = req.body.title;
        const desc = req.body.description;
        db.getConnection( async (err, connection) => {
         if (err) throw (err)
         const sqlInsert = "INSERT INTO likes VALUES (0,?,?,?,?,?)"
         const insert_query = mysql.format(sqlInsert,[url,user,src,title,desc])
         console.log(insert_query);
        await connection.query (insert_query, (err, result)=> {
           connection.release()
           if (err) throw (err)
           console.log ("--------> Created new User")
           console.log(result.insertId)
           res.sendStatus(201)
          })
         }
)})

app.get("/like/:userid", (req, res) => {
    const userId = req.params.userid; 
    db.getConnection((err, connection) => {
        if (err) {
            console.error("Failed to get database connection:", err);
            return res.status(500).send("Failed to connect to database");
        }

        const sqlSearch = "SELECT * FROM likes WHERE user = ?";
        const searchQuery = mysql.format(sqlSearch, [userId]); 

        connection.query(searchQuery, (err, result) => {
            connection.release(); 

            if (err) {
                console.error("Error executing query:", err);
                return res.status(500).send("Error in database operation");
            }

            if (result.length === 0) {
                console.log("Zero likes");
                return res.sendStatus(204); 
            }
            console.log(result);
            res.status(200).send(result);
            
        });
    });
});

 const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


