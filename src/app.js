//comment this section
const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const app = express();

const port = 5000;
const { getHomePage, getLoginPage, loginAuth } = require("./routes/index");

// Employees
const {
  employeeHome,
  addEmployeePage,
  addEmployee
} = require("./routes/employees_master");

// Customers
const {
  customerHome,
  addCustomerPage,
  editCustomerPage,
  addCustomer,
  editCustomer,
  deleteCustomerPage,
  deleteCustomer,
  searchCustomersPage,
  searchCustomers
} = require("./routes/customers_master");

// Transactions
const {
  transactionHome,
  addTransactionPage,
  addTransaction,
  viewTransHistoryPage,
  viewEmpTransPage,
  viewEmpTrans,
  viewCustTransPage,
  viewCustTrans,
  viewTransTotalPage,
  amountOnDate,
  amountOnDatePage
} = require("./routes/transactions_master");

//Products
const {
  productHome,
  allProducts,
  totalSold,
  totalSoldPage,
  viewClubs,
  viewCurlingBrooms,
  viewGoggles,
  viewRacquets,
  viewCountRentable,
  viewSpecificGoggles,
  productUpdatePage,
  productUpdate
} = require("./routes/products_master");

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
app.post("/transactions/processTransaction", addTransaction);
app.get("/transactions/customerTransRecord", viewCustTransPage);
app.post("/transactions/customerTransRecord", viewCustTrans);
app.get("/transactions/transactionHistory", viewTransHistoryPage);
app.get("/transactions/employeeTransRecord", viewEmpTransPage);
app.post("/transactions/employeeTransRecord", viewEmpTrans);
app.get("/transactions/customerTransRecord", viewCustTransPage);
app.post("/transactions/customerTransRecord", viewCustTrans);
app.get("/transactions/customerGrandTotal", viewTransTotalPage);
app.get("/transactions/transactionsOnDate", amountOnDatePage);
app.post("/transactions/transactionsOnDate", amountOnDate);

// customer routes
app.get("/customers", customerHome);
app.get("/addCustomer", addCustomerPage);
app.get("/editCustomer", editCustomerPage);
app.post("/addCustomer", addCustomer);
app.post("/editCustomer", editCustomer);
app.get("/deleteCustomers", deleteCustomerPage);
app.post("/deleteCustomers", deleteCustomer);
app.get("/searchCustomers", searchCustomersPage);
app.post("/searchCustomers", searchCustomers);
app.get("/products", productHome);
app.get("/products/allProducts", allProducts);
app.get("/login", getLoginPage); //login page
app.post("/login", loginAuth); //login page

//Product routes
app.get("/products/viewClubs", viewClubs);
app.get("/products/all", allProducts);
app.get("/products/viewCurlingBrooms", viewCurlingBrooms);
app.get("/products/viewGoggles", viewGoggles);
app.get("/products/viewRacquets", viewRacquets);
app.get("/products/viewCountRentable", viewCountRentable);
app.get("/products/viewSpecificGoggles", viewSpecificGoggles);
app.get("/products/totalSold", totalSoldPage);
app.post("/products/totalSold", totalSold);
app.get("/products/update", productUpdatePage);
app.post("/products/update", productUpdate);

// Employee routes
app.get("/employees", employeeHome);
app.get("/addEmployee", addEmployeePage);
app.post("/addEmployee", addEmployee);

// set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
