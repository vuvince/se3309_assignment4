DROP SCHEMA IF EXISTS CountryClub;

CREATE SCHEMA CountryClub;

USE CountryClub;

DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Transactions;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Item;
DROP TABLE IF EXISTS Club;
DROP TABLE IF EXISTS Racquet;
DROP TABLE IF EXISTS CurlingBroom;
DROP TABLE IF EXISTS Goggles;

CREATE TABLE Employee (
employeeID		INT(15) unsigned NOT NULL UNIQUE AUTO_INCREMENT,
ePassword		VARCHAR(100) NOT NULL,
fName			VARCHAR(100) NOT NULL,
lName			VARCHAR(100) NOT NULL,
phoneNum		VARCHAR(100) NOT NULL,
PRIMARY KEY (employeeID));

CREATE TABLE Customer (
customerEmail	VARCHAR(100) NOT NULL PRIMARY KEY UNIQUE,
fName			VARCHAR(100) NOT NULL,
lName			VARCHAR(100) NOT NULL,
cPhone			VARCHAR(100) NOT NULL,
employeeID		INT(15) unsigned,
FOREIGN KEY (employeeID) REFERENCES Employee(employeeID));

CREATE TABLE Transactions (
transactionID 	INT(15) unsigned NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
tTime			TIME NOT NULL,
tDate			DATE NOT NULL,
totalPrice		FLOAT(15) unsigned,
employeeID		INT(15) unsigned,
customerEmail	VARCHAR(100),
FOREIGN KEY (employeeID) REFERENCES Employee(employeeID),
FOREIGN KEY (customerEmail) REFERENCES Customer(customerEmail));

CREATE TABLE Sport (
sName		VARCHAR(100) NOT NULL PRIMARY KEY UNIQUE
);

CREATE TABLE Product (
productNo		BIGINT(15) unsigned NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
rentable	 	BOOL,
purchasable		BOOL,
price			INT(15) unsigned NOT NULL,
brand			VARCHAR(100),
sName			VARCHAR(100) NOT NULL,
FOREIGN KEY (sName) REFERENCES Sport(sName)
);

CREATE TABLE Item  (
itemID			INT(15) unsigned NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
transactionID 	INT(15) unsigned NOT NULL,
productNo		BIGINT(15) unsigned NOT NULL,
FOREIGN KEY (transactionID) REFERENCES Transactions(transactionID) ON DELETE CASCADE,
FOREIGN KEY (productNo) REFERENCES Product(productNo) ON DELETE CASCADE
);

CREATE TABLE Club (
productNo		BIGINT(15) unsigned NOT NULL PRIMARY KEY UNIQUE,
cLength			FLOAT NOT NULL,
cType			VARCHAR(100) NOT NULL,
FOREIGN KEY (productNo) REFERENCES Product(productNo)
);

CREATE TABLE Racquet (
productNo		BIGINT(15) unsigned NOT NULL PRIMARY KEY UNIQUE,
rLength			FLOAT NOT NULL,
ageGroup		VARCHAR(100) NOT NULL,
rWeight			FLOAT NOT NULL,
FOREIGN KEY (productNo) REFERENCES Product(productNo)
);

CREATE TABLE CurlingBroom (
productNo		BIGINT(15) unsigned NOT NULL PRIMARY KEY UNIQUE,
shaftMaterial	VARCHAR(100) NOT NULL,
bristleHardness	VARCHAR(100) NOT NULL,
shaftLength		FLOAT NOT NULL,
FOREIGN KEY (productNo) REFERENCES Product(productNo)
);

CREATE TABLE Goggles (
productNo		BIGINT(15) unsigned NOT NULL PRIMARY KEY UNIQUE,
size			VARCHAR(100) NOT NULL,
style			VARCHAR(100) NOT NULL,
colour			VARCHAR(100) NOT NULL,
FOREIGN KEY (productNo) REFERENCES Product(productNo)
);
