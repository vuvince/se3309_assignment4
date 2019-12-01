module.exports = {
  getHomePage: (req, res) => {

    // let query = "SELECT * FROM `Employee` ORDER BY id ASC"; //comment missing

    //comment missing
    // db.query(query, (err, result) => {
    //   if (err) {
    //     // res.redirect("/");
    //     console.log(err);
    //   }
    res.render("index.ejs", {
      title: "Welcome to Socka | View Employees",
      employees: res,
      message: ""
    });
    // });
  }
};
