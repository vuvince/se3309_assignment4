const fs = require("fs");

module.exports = {
  transactionHome: (req, res) => {
    res.render("transactions.ejs", {
      title: "Transactions",
      message: "",
      transactions: res
    });
  },

  //LOAD THE ADD TRANSACTION PAGE
  addTransactionPage: (req, res) => {
    res.render("transactionAdd.ejs", {
      title: "Welcome to CountryClub | Process Transaction",
      message: "",
      transactions: res
    });
  },

  addTransaction: (req, res) => {
    let transactionID =
      "SET transactionID = SELECT RAND()*(100000-999999)+100000";
    let employeedID = req.body.employeeID;
    let tTime = req.body.last_name;
    let tDate = req.body.phoneNumber;
    let customerEmail = req.body.customerEmail;
    let total = req.body.totalPrice;
    //QUERY [TODO]
    var sqlInsert =
      "INSERT INTO PersonalTraining (StudentID, TrainerID, TimeslotID, dateBooked) VALUES ((SELECT StudentID FROM Student WHERE firstName = '" +
      firstName +
      "' AND lastName = '" +
      lastName +
      "' AND phoneNumber = '" +
      phoneNumber +
      "' AND email = '" +
      email +
      "'),'" +
      trainer_id +
      "','" +
      timeslotID +
      "','" +
      date +
      "');";

    db.query(sqlInsert, function(err, result) {
      // All info to be inserted

      if (err) throw err;
      console.log("Record Inserted");
      res.redirect("/transactionHistory");
    });
  },

  //LOAD THE ADD TRANSACTION PAGE
  viewCustTransPage: (req, res) => {
    res.render("transactionCustRecord.ejs", {
      title: "Welcome to CountryClub | Process Transaction",
      message: "",
      transactions: res
    });
  },

  //GET VIEW: CUSTOMER TRANS HISTORY, POST REQUEST
  viewCustTrans: (req, res) => {
    // Show all of a trainers booked sessions
    let customerEmail = req.body.customerEmail;
    let query =
      "SELECT * FROM Timeslot JOIN Trainer ON Trainer.TrainerID = Timeslot.TrainerID WHERE Trainer.TrainerID = '" +
      customerEmail +
      "'AND isAvailable = true";

    db.query(query, (err, result) => {
      // query database

      console.log("Customer Transaction History" + result);
      if (err) {
        return res.status(500).send(err);
      }
      res.render("transactionCustRecord.ejs", {
        title: "Customer Transaction History",
        transactions: result,
        message: ""
      });
    });
  },

  //LOAD THE ADD TRANSACTION PAGE
  viewEmpTransPage: (req, res) => {
    res.render("transactionEmpRecord.ejs", {
      title: "Welcome to CountryClub | Process Transaction",
      message: "",
      transactions: res
    });
  },

  //POSTVIEW: EmpOMER TRANS HISTORY, POST REQUEST
  viewEmpTrans: (req, res) => {
    // Show all of a trainers booked sessions
    let employeeID = req.body.employeeID;
    let query = "SELECT * FROM Transactions WHERE employeeID = " + employeeID;

    db.query(query, (err, result) => {
      // query database

      console.log("Employee Transaction History" + result);
      if (err) {
        res.redirect("/transactions/employeeTransRecord");
      }
      res.render("transactionEmpRecord.ejs", {
        title: "Employee Transaction History",
        transactions: result,
        message: ""
      });
    });
  },

  //YEUUHH IT WORKS
  viewTransHistoryPage: (req, res) => {
    // Show all of the training sessions that have been booked in the database
    let query =
      "SELECT t.transactionID, t.employeeID, t.tTime, t.tDate, t.totalPrice,  t.customerEmail, i.itemID, p.productNo FROM Transactions t, Item i, Product p WHERE i.transactionID = t.transactionID AND i.productNo = p.productNo"; //comment missing
    db.query(query, (err, result) => {
      // Query the database
      console.log(result);
      if (err) {
        return res.status(500).send(err);
      }
      res.render("transactionHistory.ejs", {
        title: "Transaction History",
        transactions: result,
        message: ""
      });
    });
  },

  addPlayer: (req, res) => {
    //comment missing
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }

    let message = "";
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let position = req.body.position;
    let number = req.body.number;
    let username = req.body.username;
    let uploadedFile = req.files.image;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split("/")[1];
    image_name = username + "." + fileExtension;

    let usernameQuery =
      "SELECT * FROM `players` WHERE user_name = '" + username + "'"; //comment missing

    db.query(usernameQuery, (err, result) => {
      //comment missing
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length > 0) {
        //comment missing
        message = "Username already exists";
        res.render("add-player.ejs", {
          message,
          title: "Welcome to Socka | Add a new player"
        });
      } else {
        //comment missing
        if (
          uploadedFile.mimetype === "image/png" ||
          uploadedFile.mimetype === "image/jpeg" ||
          uploadedFile.mimetype === "image/gif"
        ) {
          //comment missing
          uploadedFile.mv(`public/assets/img/${image_name}`, err => {
            if (err) {
              return res.status(500).send(err);
            }
            //comment missing
            let query =
              "INSERT INTO `players` (first_name, last_name, position, number, image, user_name) VALUES ('" +
              first_name +
              "', '" +
              last_name +
              "', '" +
              position +
              "', '" +
              number +
              "', '" +
              image_name +
              "', '" +
              username +
              "')";
            db.query(query, (err, result) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.redirect("/");
            });
          });
        } else {
          //comment missing
          message =
            "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
          res.render("add-player.ejs", {
            message,
            title: "Welcome to Socka | Add a new player"
          });
        }
      }
    });
  },
  editPlayerPage: (req, res) => {
    let playerId = req.params.id;
    let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' "; //comment missing
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("edit-player.ejs", {
        title: "Edit  Player",
        player: result[0],
        message: ""
      });
    });
  },
  editPlayer: (req, res) => {
    let playerId = req.params.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let position = req.body.position;
    let number = req.body.number;
    //comment missing
    let query =
      "UPDATE `players` SET `first_name` = '" +
      first_name +
      "', `last_name` = '" +
      last_name +
      "', `position` = '" +
      position +
      "', `number` = '" +
      number +
      "' WHERE `players`.`id` = '" +
      playerId +
      "'";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect("/");
    });
  },
  deletePlayer: (req, res) => {
    let playerId = req.params.id;
    let getImageQuery =
      'SELECT image from `players` WHERE id = "' + playerId + '"'; //comment missing
    let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"'; //comment missing

    db.query(getImageQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      let image = result[0].image;

      fs.unlink(`public/assets/img/${image}`, err => {
        if (err) {
          return res.status(500).send(err);
        }
        db.query(deleteUserQuery, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.redirect("/");
        });
      });
    });
  }
};
