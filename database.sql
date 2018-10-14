CREATE TABLE AdminUsers(

  email VARCHAR(255) NOT NULL,
  password1 VARCHAR(255) NOT NULL,
  salt CHAR(64) NOT NULL,
  PRIMARY KEY(email)

);

CREATE TABLE DockingStation(

  name VARCHAR(255) NOT NULL,
  x_coordinate DOUBLE DEFAULT 0,
  y_coordinate DOUBLE DEFAULT 0,
  PRIMARY KEY(name)

);

CREATE TABLE Bicycle(

  bicycle_id INT(11) AUTO_INCREMENT,
  price DOUBLE DEFAULT NULL,
  date_purchased DATE,
  make VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  total_km DOUBLE DEFAULT NULL,
  total_trips INT(11),
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY(bicycle_id),
  FOREIGN KEY(name) REFERENCES DockingStation(name)

);
CREATE TABLE BicycleStatus(

  timestamp1 DATETIME,
  charging_level TINYINT,
  bike_x DOUBLE DEFAULT 0,
  bike_y DOUBLE DEFAULT 0,
  bicycle_id INT(11) AUTO_INCREMENT,
  FOREIGN KEY(bicycle_id) REFERENCES Bicycle(bicycle_id),
  CONSTRAINT PK_BicycleStatus PRIMARY KEY(bicycle_id, timestamp1)

);

CREATE TABLE BicycleRepairs(

  date_sent DATE NOT NULL,
  repair_req_desc VARCHAR(255),
  date_received DATE,
  price DOUBLE,
  repair_desc VARCHAR(255),
  bicycle_id INT(11) AUTO_INCREMENT,
  FOREIGN KEY(bicycle_id) REFERENCES Bicycle(bicycle_id),
  CONSTRAINT PK_BicycleRepairs PRIMARY KEY(bicycle_id,date_sent)

);
