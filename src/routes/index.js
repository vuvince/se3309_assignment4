module.exports = {
  getHomePage: (req, res) => {
    let query = "SELECT * FROM `Employee` ORDER BY id ASC"; //comment missing

    //comment missing
    db.query(query, (err, result) => {
      if (err) {
        // res.redirect("/");
      }
      res.render("index.ejs", {
        title: "Welcome to Socka | View Employees",
        employees: result
      });
    });
  }
};
