//comment this section
const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const app = express();

const port = 5000;
const { getHomePage } = require("./routes/index");
const {
  addPlayerPage,
  addPlayer,
  deletePlayer,
  editPlayer,
  editPlayerPage
} = require("./routes/player");
const db = mysql.createConnection({
  host: "localhost", //comment missing
  user: "root", //comment missing
  password: "password", //comment missing
  database: "socka"
}); //comment missing

// connect to database
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});
global.db = db;

// Configure the middleware

app.set("port", process.env.port || port); //comment missing
app.set("views", __dirname + "/views"); //comment missing
app.set("view engine", "ejs"); //comment missing
app.use(bodyParser.urlencoded({ extended: false })); //comment missing
app.use(bodyParser.json()); //comment missing
app.use(express.static(path.join(__dirname, "public"))); //comment missing
app.use(fileUpload()); //comment missing

//comment this section
app.get("/", getHomePage); //comment missing
app.get("/add", addPlayerPage); //comment missing
app.get("/edit/:id", editPlayerPage); //comment missing
app.get("/delete/:id", deletePlayer); //comment missing
app.post("/add", addPlayer); //comment missing
app.post("/edit/:id", editPlayer); //comment missing

// set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
