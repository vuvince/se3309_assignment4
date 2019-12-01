const fs = require("fs");

module.exports = {
  customerHome: (req, res) => {
    res.render("customers.ejs", {
      title: "Customers",
      message: "",
      transactions: res
    });
  },

  addCustomerPage: (req, res) => {
    res.render("addCustomer.ejs", {
      title: "Welcome to CountryClub | Add Customer",
      message: '',
    });
  },

  addCustomer: (req, res) => {
    let employeeID = req.body.employeeID; // FIX TO GET A RANDOM EXISTING EMPID
    let customerEmail = req.body.customerEmail;
    let fName = req.body.fName;
    let lName = req.body.lName;
    let cPhone = req.body.cPhone;
      
    let query = "INSERT INTO `Customer` (customerEmail, fName, lName, cPhone, employeeID) VALUES ('" +
                            customerEmail + "', '" + fName + "', '" + lName + "', '" + cPhone + "', '" + employeeID + "');";
    db.query(query, function(err, result) {
      // All info to be inserted
      if (err) throw err;
      res.redirect("/customers");
    });
  },

  editCustomerPage: (req, res) =>{
    res.render('editCustomer.ejs', {
      title: "Edit Customer"
    }) 
  },

  editCustomer: (req, res) => {
    let customerEmail = req.body.customerEmail; // FIX
    let fName = req.body.fName; 
    let lName = req.body.lName; 
    let cPhone = req.body.cPhone; 
    let employeeID = req.body.employeeID; 

    let query =
    "UPDATE Customer SET fName ='" + fName + "', lName = '" + lName + "', cPhone = '" + cPhone + "', employeeID = '"  + employeeID + "' WHERE customerEmail = '" + customerEmail + "'"; 
    
    db.query(query, (err, result) => {
        if(err) {
            return res.status(500).send(err);
        }
        // find a way to display the update when done
        res.redirect('/Customers'); 
    })

    console.log("edit");
  },

  deleteCustomerPage: (req, res) => {
    res.render('deleteCustomer.ejs', {
      title: "Delete Customer"
    }) 
  },

  deleteCustomer: (req, res) => {
    let customerEmail = req.body.customerEmail; 

    let query =
    "DELETE FROM Customer WHERE customerEmail='" + customerEmail + "'"; 
    
    db.query(query, (err, result) => {
        if(err) {
            return res.status(500).send(err);
        }
        // find a way to display the update when done
        res.redirect('/Customers'); 
    })
  },

  searchCustomersPage: (req, res) => {
    res.render("searchCustomer.ejs", {
      title: "Welcome to CountryClub | Search Customers",
      customers: res,
      message: ''
    });
  },

  searchCustomers: (req, res) => {
    // Show all of a trainers booked sessions
    let customerEmail = req.body.customerEmail;
    let query = "SELECT * FROM Customer WHERE customer = " + customerEmail;

    db.query(query, (err, result) => {
      // query database
      if (err) {
        //res.redirect("/customers");
        console.log(err); 
      }
      res.render("searchCustomer.ejs", {
        title: "Search Customers",
        customers: result,
        message: ""
      });
    });
  },

  
 
};
