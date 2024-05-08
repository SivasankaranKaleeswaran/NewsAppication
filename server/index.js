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
    host:"127.0.0.1",
    user:"root",
    password:"root123",
    database:"newsdb",
    port:"3306"
})

console.log(process.env.PORT);

db.getConnection( (err, connection)=> {
    if (err) throw (err)
    console.log ("DB connected successful: " + connection.threadId)
 })

 app.use(express.json())
 //middleware to read req.body.<params>
 //CREATE USER
 app.post("/register", async (req,res) => {
 const user = req.body.email;
 const fname = req.body.fname;
 const lname = req.body.lname;
 const hashedPassword = await bcrypt.hash(req.body.password,10);
 db.getConnection( async (err, connection) => {
  if (err) throw (err)
  const sqlSearch = "SELECT * FROM user WHERE user = ?"
  const search_query = mysql.format(sqlSearch,[user])
  const sqlInsert = "INSERT INTO user VALUES (0,?,?,?,?)"
  const insert_query = mysql.format(sqlInsert,[user, hashedPassword, fname, lname])
  // ? will be replaced by values
  // ?? will be replaced by string
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
 }) //end of connection.query()
 }) //end of db.getConnection()
 }) //end of app.post()

 {/*app.post("/login", (req, res)=> {
    const user = req.body.name
    const password = req.body.password
    db.getConnection ( async (err, connection)=> {
     if (err) throw (err)
     const sqlSearch = "Select * from user where user = ?"
     const search_query = mysql.format(sqlSearch,[user])
     await connection.query (search_query, async (err, result) => {
      connection.release()
      
      if (err) throw (err)
      if (result.length == 0) {
       console.log("--------> User does not exist")
       res.sendStatus(404)
      } 
      else {
         const hashedPassword = result[0].password
        if (await bcrypt.compare(password, hashedPassword)) {
        console.log("---------> Login Successful")
        res.send(result[0])
        } 
        else {
        console.log("---------> Password Incorrect")
        res.send("Password incorrect!")
        }
      }
     }) 
    }) 
    })
*/}
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
    const sessionId = req.body.sessionId; // Assume sessionId is sent in the request body
    if (sessions[sessionId]) {
        delete sessions[sessionId]; // Invalidate the session
        console.log("---------> User Logged Out");
        res.send("Logged out successfully");
    } else {
        console.log("---------> No active session found");
        res.sendStatus(404); // Not found
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
         // ? will be replaced by values
         // ?? will be replaced by string
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
    const userId = req.params.userid; // Correctly access userid parameter from the route
    db.getConnection((err, connection) => {
        if (err) {
            console.error("Failed to get database connection:", err);
            return res.status(500).send("Failed to connect to database");
        }

        const sqlSearch = "SELECT * FROM likes WHERE user = ?";
        const searchQuery = mysql.format(sqlSearch, [userId]); // Format the query correctly using the userId

        connection.query(searchQuery, (err, result) => {
            connection.release(); // Ensure connection is released in every case

            if (err) {
                console.error("Error executing query:", err);
                return res.status(500).send("Error in database operation");
            }

            if (result.length === 0) {
                console.log("Zero likes");
                return res.sendStatus(204); // Use 204 No Content when there is no data to send
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


