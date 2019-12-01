module.exports = {
  getHomePage: (req, res) => {
    let query = "SELECT * FROM `Trainer` LIMIT 100"; // Query retrieves 100 trainers from database

    // Search database
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("index.ejs", {
        title: "Welcome to The Country Club | View Players",
        players: result
      });
    });
  }
};
