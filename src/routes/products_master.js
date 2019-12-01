const fs = require('fs');


module.exports = {

    productHome: (req, res) => {
        res.render("products.ejs", {
          title: "Products",
          message: "",
          transactions: res
        });
      },

    allProducts: (req, res) => { // Show all of the different products 
        let query = "SELECT p.productNo, p.rentable, p.purchasable, p.price, p.brand, p.sName FROM Product p"; 
        
        db.query(query, (err, result) => { // Query the database
          if (err) {
            res.redirect('/');
          }
          res.render('allProducts.ejs', {
            title: 'View All Products',
            players: result
          });
        });
    },
    
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

    viewClubs: (req, res) => {
        let query = "SELECT p.productNo, p.cLength, p.cType FROM Product p"; 
        
        db.query(query, (err, result) => { // Query the database
          if (err) {
            res.redirect('/');
          }
          res.render('clubs.ejs', {
            title: 'View All Clubs',
            clubs: result
          });
        });
      },

    viewRacquets: (req, res) => { // Show all of the different products 
        let query = "SELECT p.productNo, r.rLength, r.ageGroup, r.rWeight FROM Racquet r, Product p WHERE p.productNo = r.productNo"; 
        
        db.query(query, (err, result) => { // Query the database
          if (err) {
            res.redirect('/');
          }
          res.render('racquets.ejs', {
            title: 'View All Racquets',
            racquets: result
          });
        });
    },

    viewGoggles: (req, res) => { // Show all of the different products 
        let query = "SELECT p.productNo, g.size, g.style, g.colour FROM Goggles g, Product p WHERE p.productNo = g.productNo"; 
        
        db.query(query, (err, result) => { // Query the database
          if (err) {
            res.redirect('/');
          }
          res.render('goggles.ejs', {
            title: 'View All Goggles',
            goggles: result
          });
        });
    },

    viewCurlingBrooms: (req, res) => { // Show all of the different products 
        let query = "SELECT p.productNo, cb.shaftMaterial, cb.bristleHardness, cb.shaftLength FROM CurlingBroom cb, Product p WHERE p.productNo = cb.productNo"; 
        
        db.query(query, (err, result) => { // Query the database
          if (err) {
            res.redirect('/');
          }
          res.render('curlingBrooms.ejs', {
            title: 'View All Curling Brooms',
            curlingBrooms: result
          });
        });
    },


    showUpdatePricePage: (req, res) => { // 
        let query = "SELECT * FROM Catalog RIGHT JOIN Sport ON Sport.sportID = Catalog.sportID"; // Returning catalog items for particular sport

        db.query(query, (err, result) => { // Query the database
          if (err) {
            res.redirect('/');
          }
          res.render('update-price.ejs', {
            title: 'Welcome to The Rec Centre | View Players',
            players: result
          });
        });
    },

    showTrainerPage: (req, res) => { // Show a list of 100 trainers
        let query = "SELECT * FROM `Trainer` LIMIT 100";
    
        db.query(query, (err, result) => { // Query the database
          if (err) {
            res.redirect('/');
          }
          res.render('trainers.ejs', {
            title: 'Welcome to The Rec Centre | View Players',
            players: result
          });
        });
      },

      viewSpecificEquipment: (req, res) => { // See a list of equipment in a catalog with the ages of them
        let catalog_id = req.params.id;
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); // Use today's date as reference
        let query = "SELECT * , DATEDIFF('"+date+"', datePurchased) AS daysOld FROM Equipment JOIN Catalog ON Catalog.CatalogID = Equipment.CatalogID WHERE Catalog.CatalogID = '"+catalog_id+"'";
    
        db.query(query, (err, result) => { // Query the database
          if (err) {
            res.redirect('/');
          }
          res.render('specific-equipment.ejs', {
            title: 'Welcome to The Rec Centre | View Players',
            players: result
          });
        });
      },

      deleteOldItem:(req, res) => { // Delete the items that are older that a specified amount of days
        let catalog_id = req.params.id;
        let daysOld = req.body.daysOld; 
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        console.log(daysOld);

        var sqlDelete = "DELETE FROM Equipment WHERE DATEDIFF('"+date+"', datePurchased) > '"+daysOld+"' AND CatalogID ='"+catalog_id+"'";

        db.query(sqlDelete, function (err, result){ // Query the database
            if(err) throw err;
            console.log("Records deleted");
            res.redirect("/viewEquipment/"+catalog_id);
        });

    },
    updatePrice:(req, res) => { // Update the price of all catalogs in a sport by a specified amount
        let sport = req.body.sport; // Get sport 
        let price = req.body.price; // Get price to be changed

        console.log(sport);
        
        console.log(price);

        var sqlUpdate = "UPDATE Catalog JOIN Sport ON Sport.sportID = Catalog.sportID SET price = price + '"+price+"' WHERE Sport.sportName = '"+sport+"'";

        db.query(sqlUpdate, function (err, result){ // Query the database
            if(err) throw err;
            console.log("Prices Updated!");
            res.redirect("/updatePrice");
        });

    },

    addBooking: (req, res) => { // Add a new training session to the database
        let message = '';
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

    
        

        console.log("add booking called" +"\nbooked time: "+ bookedTime+"\ndate for: "+dateFor+"\ntrainer ID: "+trainer_id+ "\nfirst name: "+firstName + "\nlast name: "+lastName + "\nphone number: " +phoneNumber+"\nemail: " +email + "\ndate: " +date);
        var sqlInsert = "INSERT INTO PersonalTraining (StudentID, TrainerID, TimeslotID, dateBooked) VALUES ((SELECT StudentID FROM Student WHERE firstName = '"+ firstName +"' AND lastName = '"+lastName+"' AND phoneNumber = '"+phoneNumber+"' AND email = '" + email+"'),'"+trainer_id+"','"+timeslotID+"','"+date+"');";


        db.query(sqlInsert, function (err, result) {
        // All info to be inserted

            if (err) throw err;
            console.log("1 record inserted");
            res.redirect("/book/"+trainer_id);
          });
    },
    trainerSpecialtyPage: (req, res) => { // Show all of a specific trainer's specialties and rank them 
        let playerId = req.params.id;
        let query = "SELECT * FROM `Trainer` JOIN TrainerSpecialty ON TrainerSpecialty.TrainerID = Trainer.TrainerID JOIN Specialty ON TrainerSpecialty.SpecialtyID = Specialty.SpecialtyID WHERE Trainer.TrainerID = '" + playerId + "' ORDER BY SkillLevel DESC";
        db.query(query, (err, result) => { // Query the database
            console.log(result);
            if (err) {
                return res.status(500).send(err);
            }
            res.render('view-specialty.ejs', {
                title: 'View Specialty',
                players: result,
                message: ''
            });
        });
    },
    showBookedSessions: (req, res) => { // Show all of the training sessions that have been booked in the database
        let playerId = req.params.id;
        let query = "SELECT Timeslot.timeslotID as ID, trainingDate, startTime, endTime, Trainer.firstName as firstName, Trainer.lastName as lastName FROM PersonalTraining JOIN Timeslot ON PersonalTraining.TimeslotID = Timeslot.TimeslotID AND PersonalTraining.TrainerID = Timeslot.TrainerID JOIN Student ON PersonalTraining.StudentID = Student.StudentID JOIN Trainer ON PersonalTraining.TrainerID = Trainer.TrainerID WHERE Student.StudentID = '" + playerId+"'"; //comment missing
        db.query(query, (err, result) => { // Query the database
            console.log(result);
            if (err) {
                return res.status(500).send(err);
            }
            res.render('training-sessions.ejs', {
                title: 'View Specialty',
                players: result,
                message: ''
            });
        });
    },

    bookSessionPage:(req, res)=>{ // Show all of a trainers booked sessions
        let trainerID = req.params.id;
        let query  = "SELECT * FROM Timeslot JOIN Trainer ON Trainer.TrainerID = Timeslot.TrainerID WHERE Trainer.TrainerID = '" + trainerID + "'AND isAvailable = true";

        db.query(query, (err, result) => { // query database

   
            console.log("book session" +result);
            if (err) {
                return res.status(500).send(err);
            }
            res.render('book-session.ejs', {
                title: 'Book Session',
                players: result,
                message: ''
            });
        });
    },
};