//comment this section
const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const app = express();

const port = 5000;
const { getHomePage, getLoginPage, loginAuth } = require("./routes/index");
const {
  addPlayerPage,
  addPlayer,
  deletePlayer,
  editPlayer,
  editPlayerPage
} = require("./routes/player");

// Transactions
const {
  transactionHome,
  addTransactionPage,
  viewCustTrans, // POST
  viewCustTransPage, //GET
  viewTransHistoryPage
} = require("./routes/transactions_master");

//Products
const { productHome, allProducts } = require("./routes/products_master");

//MY SQL CONNECTION
const db = mysql.createConnection({
  host: "localhost", //comment missing
  user: "root", //comment missing
  password: "password", //comment missing
  // database: "CountryClub"
  database: "CountryClub"
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
app.get("/", getHomePage);
app.get("/transactions", transactionHome);
app.get("/transactions/processTransaction", addTransactionPage);
app.get("/transactions/customerTransRecord", viewCustTransPage);
app.post("/transactions/customerTransRecord", viewCustTrans);
app.get("/transactions/transactionHistory", viewTransHistoryPage);
app.get("/products", productHome);
app.get("/products/allProducts", allProducts);
app.get("/login", getLoginPage); //login page
app.post("/login", loginAuth); //login page

// app.get("/add", addPlayerPage); //comment missing
// app.get("/edit/:id", editPlayerPage); //comment missing
// app.get("/delete/:id", deletePlayer); //comment missing
// app.post("/add", addPlayer); //comment missing
// app.post("/edit/:id", editPlayer); //comment missing

// set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
