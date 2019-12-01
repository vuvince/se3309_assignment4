const fs = require("fs");

void function getAgeGroup() {
  this.value.toString();
  var o = h;
};

module.exports = {
  productHome: (req, res) => {
    res.render("products.ejs", {
      title: "Products",
      message: "",
      transactions: res
    });
  },

  allProducts: (req, res) => {
    // Show all of the different products
    let query =
      "SELECT p.productNo, p.rentable, p.purchasable, p.price, p.brand, p.sName FROM Product p";

    db.query(query, (err, result) => {
      // Query the database
      if (err) {
        res.redirect("/");
      }
      console.log(result);
      res.render("allProducts.ejs", {
        title: "View All Products",
        products: result,
        message: ""
      });
    });
  },

  viewClubs: (req, res) => {
    let query = "SELECT p.productNo, p.cLength, p.cType FROM Product p";

    db.query(query, (err, result) => {
      // Query the database
      if (err) {
        res.redirect("/");
      }
      res.render("clubs.ejs", {
        title: "View All Clubs",
        clubs: result
      });
    });
  },

  viewRacquets: (req, res) => {
    // Show all of the different products
    let query =
      "SELECT p.productNo, r.rLength, r.ageGroup, r.rWeight FROM Racquet r, Product p WHERE p.productNo = r.productNo";

    db.query(query, (err, result) => {
      // Query the database
      if (err) {
        res.redirect("/");
      }
      res.render("racquets.ejs", {
        title: "View All Racquets",
        racquets: result
      });
    });
  },

  viewGoggles: (req, res) => {
    // Show all of the different products
    let query =
      "SELECT p.productNo, g.size, g.style, g.colour FROM Goggles g, Product p WHERE p.productNo = g.productNo";

    db.query(query, (err, result) => {
      // Query the database
      if (err) {
        res.redirect("/");
      }
      res.render("goggles.ejs", {
        title: "View All Goggles",
        goggles: result
      });
    });
  },

  viewCurlingBrooms: (req, res) => {
    // Show all of the different products
    let query =
      "SELECT p.productNo, cb.shaftMaterial, cb.bristleHardness, cb.shaftLength FROM CurlingBroom cb, Product p WHERE p.productNo = cb.productNo";

    db.query(query, (err, result) => {
      // Query the database
      if (err) {
        res.redirect("/");
      }
      res.render("curlingBrooms.ejs", {
        title: "View All Curling Brooms",
        curlingBrooms: result
      });
    });
  },

  viewSpecificGoggles: (req, res) => {
    // See a list of equipment in a catalog with the ages of them
    let age = req.body.ageGroup;
    let query =
      "SELECT * FROM Product p WHERE EXISTS (SELECT * FROM Racquets r WHERE p.productNo = r.productNo AND r.ageGroup = '" +
      age +
      "')";

    db.query(query, (err, result) => {
      // Query the database
      if (err) {
        res.redirect("/");
      }
      res.render("viewSpecificGoggles.ejs", {
        title: "View Goggles",
        players: result
      });
    });
  },

  viewCountRentable: (req, res) => {
    // See a list of equipment in a catalog with the ages of them
    let rentable = req.body.rentable;
    let query =
      "SELECT productNo, sName, rentable, purchasable FROM Product WHERE rentable = true";

    db.query(query, (err, result) => {
      // Query the database
      if (err) {
        res.render("index.ejs", {
          title: "View amount of available rentals",
          message: "Error finding rentable products"
        });
      }
      res.render("rentableCount.ejs", {
        title: "View amount of available rentals",
        products: result
      });
    });
  },

  deleteOldItem: (req, res) => {
    // Delete the items that are older that a specified amount of days
    let catalog_id = req.params.id;
    let daysOld = req.body.daysOld;
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    console.log(daysOld);

    var sqlDelete =
      "DELETE FROM Equipment WHERE DATEDIFF('" +
      date +
      "', datePurchased) > '" +
      daysOld +
      "' AND CatalogID ='" +
      catalog_id +
      "'";

    db.query(sqlDelete, function(err, result) {
      // Query the database
      if (err) throw err;
      console.log("Records deleted");
      res.redirect("/viewEquipment/" + catalog_id);
    });
  },
  updateProduct: (req, res) => {
    // Update the price of all catalogs in a sport by a specified amount
    let sport = req.body.sport; // Get sport
    let price = req.body.price; // Get price to be changed

    console.log(sport);

    console.log(price);

    var sqlUpdate =
      "UPDATE Product = Product.productNo SET rentable = WHEN Product.sName = '" +
      sport +
      "' THEN rentable = FALSE AND purchasable = TRUE END WHERE productNo > 1";

    db.query(sqlUpdate, function(err, result) {
      // Query the database
      if (err) throw err;
      console.log("Prices Updated!");
      res.redirect("/updatePrice");
    });
  },

  addBooking: (req, res) => {
    // Add a new training session to the database
    let message = "";
    let timeslotID = req.body.timeslotID;

    let trainer_id = req.body.trainer_id;
    // let trainerName = req.body.trainerName;
    let firstName = req.body.first_name;
    let lastName = req.body.last_name;
    let phoneNumber = req.body.phoneNumber;
    let email = req.body.email;
    let date = convert(req.body.date);
    let dateFor = convert(req.body.dateFor);
    let bookedTime = req.body.bookedTime;

    console.log(
      "add booking called" +
        "\nbooked time: " +
        bookedTime +
        "\ndate for: " +
        dateFor +
        "\ntrainer ID: " +
        trainer_id +
        "\nfirst name: " +
        firstName +
        "\nlast name: " +
        lastName +
        "\nphone number: " +
        phoneNumber +
        "\nemail: " +
        email +
        "\ndate: " +
        date
    );
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
      console.log("1 record inserted");
      res.redirect("/book/" + trainer_id);
    });
  },
  trainerSpecialtyPage: (req, res) => {
    // Show all of a specific trainer's specialties and rank them
    let playerId = req.params.id;
    let query =
      "SELECT * FROM `Trainer` JOIN TrainerSpecialty ON TrainerSpecialty.TrainerID = Trainer.TrainerID JOIN Specialty ON TrainerSpecialty.SpecialtyID = Specialty.SpecialtyID WHERE Trainer.TrainerID = '" +
      playerId +
      "' ORDER BY SkillLevel DESC";
    db.query(query, (err, result) => {
      // Query the database
      console.log(result);
      if (err) {
        return res.status(500).send(err);
      }
      res.render("view-specialty.ejs", {
        title: "View Specialty",
        players: result,
        message: ""
      });
    });
  },
  showBookedSessions: (req, res) => {
    // Show all of the training sessions that have been booked in the database
    let playerId = req.params.id;
    let query =
      "SELECT Timeslot.timeslotID as ID, trainingDate, startTime, endTime, Trainer.firstName as firstName, Trainer.lastName as lastName FROM PersonalTraining JOIN Timeslot ON PersonalTraining.TimeslotID = Timeslot.TimeslotID AND PersonalTraining.TrainerID = Timeslot.TrainerID JOIN Student ON PersonalTraining.StudentID = Student.StudentID JOIN Trainer ON PersonalTraining.TrainerID = Trainer.TrainerID WHERE Student.StudentID = '" +
      playerId +
      "'"; //comment missing
    db.query(query, (err, result) => {
      // Query the database
      console.log(result);
      if (err) {
        return res.status(500).send(err);
      }
      res.render("training-sessions.ejs", {
        title: "View Specialty",
        players: result,
        message: ""
      });
    });
  },

  bookSessionPage: (req, res) => {
    // Show all of a trainers booked sessions
    let trainerID = req.params.id;
    let query =
      "SELECT * FROM Timeslot JOIN Trainer ON Trainer.TrainerID = Timeslot.TrainerID WHERE Trainer.TrainerID = '" +
      trainerID +
      "'AND isAvailable = true";

    db.query(query, (err, result) => {
      // query database

      console.log("book session" + result);
      if (err) {
        return res.status(500).send(err);
      }
      res.render("book-session.ejs", {
        title: "Book Session",
        players: result,
        message: ""
      });
    });
  },

  totalSoldPage: (req, res) => {
    res.render("totalProducts.ejs", {
      title: "Total Products",
      products: res,
      message: ""
    });
  },

  totalSold: (req, res) => {
    let ePassword = req.body.ePassword; // FIX
    let fName = req.body.fName;
    let employeeID = req.body.employeeID;

    //FIRST STEP IS TO VALIDATE ID AND PASSWORD COMBO
    let userquery =
      "SELECT * FROM Employee WHERE employeeID = " +
      employeeID +
      " AND fName = '" +
      fName +
      "' AND ePassword = '" +
      ePassword +
      "';";

    db.query(userquery, (err, result) => {
      if (err) {
        res.render("totalProducts.ejs", {
          message: "Name / ID / Password do not match",
          title: "",
          products: res
        });
        return;
      }
      console.log(result);
    });

    let query =
      "SELECT COUNT(transactionID) as amountSold, SUM(totalPrice) as dollarSold FROM Transactions t, Employee e WHERE e.fName ='" +
      fName +
      "' AND e.employeeID='" +
      employeeID +
      "' AND e.ePassword='" +
      ePassword +
      "'";

    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/products/totalSold");
      } else {
        // find a way to display the update when done
        res.render("totalProducts.ejs", {
          title: "Total Products sold for Employee",
          products: result,
          message: ""
        });
      }
    });
  },
  productUpdatePage: (req, res) => {
    res.render("productUpdate.ejs", {
      title: "Update Products",
      products: res,
      message: ""
    });
  },

  productUpdate: (req, res) => {
    let toggle = req.body.purchasable; // FIX
    let sName = req.body.sName;
    let purchasable = false;

    console.log(toggle);
    console.log(sName);

    if (toggle == "on") {
      purchasable = true;
      console.log(purchasable);
    }

    let query =
      "UPDATE Product SET purchasable = TRUE WHERE Product.sName = '" +
      sName +
      "'";

    //if the toggle is on
    if (purchasable) {
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.redirect("/products/update");
        } else {
          // find a way to display the update when done
          res.render("productUpdate.ejs", {
            title: "Total Products sold for Employee",
            products: result,
            message: "Set all " + sName + " products to Purchasable"
          });
        }
      });
    }
  }
};
