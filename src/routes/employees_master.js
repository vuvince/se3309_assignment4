const fs = require("fs");

module.exports = {
  employeeHome: (req, res) => {
    res.render("employees.ejs", {
      title: "Employees",
      message: ""
    });
  },

  addEmployeePage: (req, res) => {
    res.render("addEmployee.ejs", {
      title: "Welcome to CountryClub | Add Employee",
      message: ""
    });
  },

  addEmployee: (req, res) => {
    let employeeID = req.body.employeeID;
    let ePassword = req.body.ePassword;
    let fName = req.body.fName;
    let lName = req.body.lName;
    let phoneNum = req.body.phoneNum;

    let query =
      "INSERT INTO `Employee` (employeeID, fName, lName, ePassword, phoneNum) VALUES ('" +
      employeeID +
      "', '" +
      fName +
      "', '" +
      lName +
      "', '" +
      ePassword +
      "', '" +
      phoneNum +
      "');";
    db.query(query, function(err, result) {
      // All info to be inserted
      if (err) throw err;
      res.redirect("/employees");
    });
  }
};
