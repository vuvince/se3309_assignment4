module.exports = {
  getHomePage: (req, res) => {
    res.render("index.ejs", {
      title: "Welcome to CountryClub",
      employees: res,
      message: ""
    });
  },
  getLoginPage: (req, res) => {
    res.render("login.ejs", {
      title: "Welcome to CountryClub | Login",
      employees: res,
      message: ""
    });
  },
  loginAuth: (req, res) => {
    let employeeID = req.body.employeeID;
    let ePassword = req.body.ePassword;
    let query =
      "SELECT * FROM Employee WHERE employeeID = " +
      employeeID +
      " AND ePassword = '" +
      ePassword +
      "';";

    db.query(query, (err, result) => {
      if (err) {
        res.render("login.ejs", {
          message: "Wrong ID / Password",
          title: "Welcome to CountryClub | Login",
          employees: res
        });
      } else {
        console.log(result);
        res.render("login.ejs", {
          message: "Succesfully Logged In",
          title: "Welcome to CountryClub",
          employees: result
        });
      }
    });
  }
};
