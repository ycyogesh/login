const express = require("express");
//const bcrypt = require("bcrypt");
const cors = require("cors");
const mysql = require("mysql");
// const bodyParser = require("body-parser");
// const check = require("express-validator");
// const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const saltRounds = 10;
app = express();
app.use(cors());
// app.use(express.json());
// dotenv.config();

//create connection in mysql
var connection = mysql.createConnection({
    host: "localhost",
    user: "nodejs",
    password: "Node@123",
    database: "dkcrud",
  });

  connection.connect(function (err){
    if(err){
        console.log("connection errror"+err)
        return;
    }
    console.log("connected as:"+connection.threadId);
  })

  //create a server
  app.listen('5501',function (err){
    if(err){
      console.log('connection error'+err);
    }
    console.log('app is running');
    
  });

  
//sign up
 app.post('/signup',(req,res)=>{
    let data = req.body;

    let sql =" select email from user where email=?";
connection.query(sql,[data.email],(err,result)=> {
  if(err) {
    console.log("error".err.stack)
    return;
  }
else if(result.length>0){
  
    if(result.length==0){
      console.log("Please verify your mail");
     sendMail(data.mail,result[0].token) 
    }
    else{
      console.log("something went wrong");
      res.send("Something went wrong");
    }
}else{
  const salt = bcrypt.genSalt(10);  
  const hash = bcrypt.hashSync(data.pass,hash);
  const token=jwt.sign({
    email:data.email + parseInt(Math.random() * 10)},"dk@14");
    console.log("token is :",token);
    let sql1 ="insert into user(email,password,token)values=?,?,?";
    connection.query(sql1,[data.email,token.hash],
      async(err,result) =>{
        if(err) {
          console.log("error",error.stack);
        }
        let res = await sendMail(data.mail,token);
          if(res){
            console.log("Registired sucessfully");
            res.json(true);
          } else{
            console.log("something went wrong");
          }
        }
    ); 
   };
  });
});  


//token verify
app.get("/token",(req,res)=>{
let token = req.query.token;
console.log(req.query);
let sql ="select * from user where token =?";
connection.query(sql,[token],(err,result) =>{
  console.log("result---------->",token[0].id);
  if(err){
    console.log("error",error.stack);
  }else if(result.length>0){
    console.log("token matched sucessfully");
    let sql1 ="update user set token = null,is_verified = 1 where id =?";
    connection.query(sql1,[result[0].id],(err,result) =>{
if(err){
  console.log("something went wrong",err.stack);
}
res.send(true);
    });
  }else{
    console.log(false);
  }
});
  });


//signup email sending
function sendMail(mail,token) {
  return new Promise((reslove,reject) =>{
    console.log("Processing",token);
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "cb5c493b21abc2",
        pass: "08d3338bf73002"
      }
    });

    var mailOptions = {
      from: "dharani@dk.com",
      to: mail,
      subject: "Verify Your Account",
      text: "Click to verify your account",
      html:
        '<html><body><p>To verify your account</p><a href="http://localhost:5501/token.html?token=' +
        token +
        '">Click Here</a></body></html>',
      dsn: {
        id: "ID",
        return: "headers",
        notify: "success",
        notify: ["failure", "delay"],
        recipient: "",
      },
    };
    })
//   })
 }