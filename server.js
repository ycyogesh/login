const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const check = require("express-validator");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const saltRounds = 10;
app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

var connection = mysql.createConnection({
    host: "localhost",
    user: "nodejs",
    password: "Node@123",
    database: "dkcrud",
  });

  connection.connect(function (err){
    if(err){
        console.log(error   )
    }
  })