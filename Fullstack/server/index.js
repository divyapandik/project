
const express = require("express")

const app = express();

const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors")

const db = mysql.createPool({
    host : "localhost",
    user:"root",
    password:"Divya@06",
    database:"student_database"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get("/api/get",(req,res)=>{
    const sqlGet= "SELECT * FROM student_table";
    db.query(sqlGet,(error,result)=>{
        res.send(result)
    })
})

app.post("/api/post",(req,res)=>{
    const {firstname,lastname,location,email,date_of_birth,education} = req.body;
    const sqlInsert="INSERT INTO student_table (firstname,lastname,location,email,date_of_birth,education) VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert,[firstname,lastname,location,email,date_of_birth,education],(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})

app.delete("/api/remove/:id",(req,res)=>{
    const {id} = req.params;
    const sqlRemove="DELETE FROM student_table WHERE id = ?";
    db.query(sqlRemove,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})

app.get("/api/get/:id",(req,res)=>{
    const {id} = req.params;
    const sqlGet= "SELECT * FROM student_table WHERE id = ?";
    db.query(sqlGet,id,(error,result)=>{
      if(error){
        console.log(error);
      }
        res.send(result)
    })
})

app.put("/api/update/:id",(req,res)=>{
    const {id} = req.params;
    const {firstname,lastname,location,email,date_of_birth,education} = req.body;
    const sqlUpdate= "UPDATE student_table SET firstname = ?,lastname = ?,location = ?,email = ?,date_of_birth = ?,education = ? WHERE id =?";
    db.query(sqlUpdate,[firstname,lastname,location,email,date_of_birth,education,id],(error,result)=>{
      if(error){
        console.log(error);
      }
        res.send(result)
    })
}) 



app.get("/",(req,res)=>{
    // const sqlInsert = "INSERT INTO student_table (id,firstname,lastname,location,email,date_of_birth,education) VALUES ('4','Siva','balan','madurai','sivabalan65@gmail.com','1998.05.05','B.Tech')";
    // db.query(sqlInsert,(err,result)=>{
    //     console.log("error",err);
    //     console.log("result",result);
    //     res.send("hello express")

    // })
})

app.listen(5000,()=>{
    console.log("server is running on port");
})