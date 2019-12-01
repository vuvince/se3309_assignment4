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
    let transactionID = "RAND()*(1000000-9999999)+10000000";
    let employeeID = req.body.employeeID;
    let customerEmail = req.body.customerEmail;
    let totalPrice = req.body.totalPrice;
    console.log(employeeID);
    console.log(customerEmail);
    console.log(totalPrice);
    if (!(employeeID > 0) || !(totalPrice > 0)) {
      res.render("transactionAdd.ejs", {
        transactions: res,
        message: "Please enter numerical values for ID & Price",
        title: ""
      });
      return;
    }

    let usernameQuery =
      "SELECT * FROM Customer WHERE customerEmail = '" + customerEmail + "'"; //comment missing

    db.query(usernameQuery, (err, result) => {
      //comment missing
      if (result.length == 0) {
        res.render("transactionAdd.ejs", {
          transactions: res,
          message: "Invalid Email",
          title: ""
        });
        return;
      }
    });

    let userID =
      "SELECT * FROM Employee WHERE employeeID = '" + employeeID + "'"; //comment missing

    db.query(userID, (err, result) => {
      //comment missing
      if (result.length == 0) {
        res.render("transactionAdd.ejs", {
          transactions: res,
          message: "Invalid Employee ID",
          title: ""
        });
        return;
      }
    });

    //QUERY [TODO]
    let postQuery =
      "INSERT INTO Transactions SET transactionID = " +
      transactionID +
      ", tTime = CURRENT_TIME(), tDate = CURRENT_DATE(), totalPrice = " +
      totalPrice +
      ", employeeID = (SELECT employeeID FROM Employee WHERE employeeID = " +
      employeeID +
      "), customerEmail = (SELECT customerEmail FROM Customer WHERE customerEmail = '" +
      customerEmail +
      "');";

    db.query(postQuery, (err, result) => {
      //ERROR CAUSING ISSUES
      if (err) {
        return;
        res.redirect("/logout");
      } else {
        res.render("transactionAdd.ejs", {
          transactions: res,
          message: "Success!",
          title: ""
        });
      }
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

  //POSTVIEW: TRANS HISTORY, POST REQUEST
  viewCustTrans: (req, res) => {
    // Show all of a trainers booked sessions
    let customerEmail = req.body.customerEmail;
    let query =
      "SELECT * FROM Transactions WHERE customerEmail = '" +
      customerEmail +
      "'";

    db.query(query, (err, result) => {
      // query database

      console.log("Customer Transaction History" + result);
      if (err) {
        res.redirect("/transactions/customerTransRecord");
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

  //LOAD THE TTotal Page
  //YEUUHH IT WORKS
  viewTransTotalPage: (req, res) => {
    // Show all of the training sessions that have been booked in the database
    let query =
      "SELECT customerEmail, SUM(totalPrice) AS totalSpent FROM Transactions GROUP BY customerEmail"; //comment missing
    db.query(query, (err, result) => {
      // Query the database
      if (err) {
        res.redirect("/");
        message = "Error Getting Total Spent";
        return res.status(500).send(err);
      }
      res.render("transactionTotal.ejs", {
        title: "Total Spent per Customer",
        transactions: result,
        message: ""
      });
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
  },

  //LOAD THE ADD TRANSACTION PAGE
  amountOnDatePage: (req, res) => {
    res.render("transactionsOnDate.ejs", {
      title: "Welcome to CountryClub | Transactions on Date",
      message: "",
      transactions: res
    });
  },

  //POSTVIEW: EmpOMER TRANS HISTORY, POST REQUEST
  amountOnDate: (req, res) => {
    // Show all of a trainers booked sessions
    let tDate = req.body.tDate;
    let query =
      "SELECT SUM(totalPrice) AS totalPrice FROM Transactions WHERE tDate = '" +
      tDate +
      "'";

    db.query(query, (err, result) => {
      // query database

      console.log("Transaction History On this Date" + result);
      if (err) {
        res.redirect("/transactions/transactionsOnDate");
      }
      res.render("transactionsOnDate.ejs", {
        title: "Total Ammount On Date",
        transactions: result,
        message: ""
      });
    });
  }
};
