const fs = require('fs');


void function getAgeGroup(){
    this.value.toString();
    var o = h;
}

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

    viewSpecificGoggles: (req, res) => { // See a list of equipment in a catalog with the ages of them
        let age = req.body.ageGroup;
        let query = "SELECT * FROM Product p WHERE EXISTS (SELECT * FROM Racquets r WHERE p.productNo = r.productNo AND r.ageGroup = '"+age+"')";
    
        db.query(query, (err, result) => { // Query the database
          if (err) {
            res.redirect('/');
          }
          res.render('viewSpecificGoggles.ejs', {
            title: 'View Goggles',
            players: result
          });
        });
    },

    viewCountRentable: (req, res) => { // See a list of equipment in a catalog with the ages of them
        let rentable = req.body.rentable;
        let query = "SELECT COUNT(rentable) FROM Product WHERE rentable = 1)";
    
        db.query(query, (err, result) => { // Query the database
          if (err) {
            res.redirect('/');
          }
          res.render('rentableCount.ejs', {
            title: 'View amount of available rentals',
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
    updateProduct:(req, res) => { // Update the price of all catalogs in a sport by a specified amount
        let sport = req.body.sport; // Get sport 
        let price = req.body.price; // Get price to be changed

        console.log(sport);
        
        console.log(price);

        var sqlUpdate = "UPDATE Product = Product.productNo SET rentable = WHEN Product.sName = '"+sport+"' THEN rentable = FALSE AND purchasable = TRUE END WHERE productNo > 1";

        db.query(sqlUpdate, function (err, result){ // Query the database
            if(err) throw err;
            console.log("Prices Updated!");
            res.redirect("/updatePrice");
        });

    },
};