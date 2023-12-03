CREATE TABLE cafes (
  cafe_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  location VARCHAR(100),
  wifi_speed INT,
  power_outlets INT,
  seating_capacity INT,
  rating FLOAT,
  opening_hours VARCHAR(50),
  menu_url VARCHAR(255),
  ambiance VARCHAR(100)
);

INSERT INTO cafes (name, location, wifi_speed, power_outlets, seating_capacity, rating, opening_hours, ambiance)
VALUES
('BeanBuzz', '123 Main St', 50, 20, 30, 4.5, '8 AM - 6 PM', 'Cozy'),
('BrewHaven', '456 Oak St', 60, 15, 25, 4.2, '7 AM - 8 PM', 'Modern'),
('CupCraft', '789 Maple St', 45, 25, 40, 4.8, '6 AM - 9 PM', 'Rustic'),
('MugMingle', '101 Pine St', 55, 18, 35, 4.0, '9 AM - 7 PM', 'Lively'),
('EspressoExpo', '202 Cedar St', 65, 22, 28, 4.7, '8 AM - 5 PM', 'Chic'),
('JavaJolt', '303 Elm St', 40, 30, 45, 4.3, '7 AM - 6 PM', 'Casual'),
('PerkPalace', '404 Birch St', 70, 10, 20, 4.9, '6 AM - 10 PM', 'Elegant'),
('RoastRendezvous', '505 Walnut St', 55, 20, 32, 4.1, '8 AM - 7 PM', 'Quaint'),
('SteamySip', '606 Chestnut St', 48, 28, 38, 4.6, '9 AM - 8 PM', 'Vintage'),
('CaffeineCraze', '707 Pinecone St', 62, 15, 22, 4.4, '7 AM - 9 PM', 'Artistic');

CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50),
  email VARCHAR(100),
  password VARCHAR(255),
  full_name VARCHAR(100),
  age INT,
  gender VARCHAR(10),
  favorite_cafe_id INT,
  FOREIGN KEY (favorite_cafe_id) REFERENCES cafes(cafe_id)
);

INSERT INTO users (username, email, password, full_name, age, gender, favorite_cafe_id)
VALUES
('user1', 'user1@email.com', 'password1', 'John Doe', 25, 'Male', 3),
('user2', 'user2@email.com', 'password2', 'Jane Smith', 30, 'Female', 6),
('user3', 'user3@email.com', 'password3', 'Bob Johnson', 22, 'Male', 8),
('user4', 'user4@email.com', 'password4', 'Alice Brown', 28, 'Female', 1),
('user5', 'user5@email.com', 'password5', 'Charlie Davis', 35, 'Male', 5),
('user6', 'user6@email.com', 'password6', 'Emily White', 26, 'Female', 9),
('user7', 'user7@email.com', 'password7', 'David Wilson', 32, 'Male', 2),
('user8', 'user8@email.com', 'password8', 'Grace Miller', 29, 'Female', 7),
('user9', 'user9@email.com', 'password9', 'Samuel Lee', 27, 'Male', 4),
('user10', 'user10@email.com', 'password10', 'Olivia Turner', 31, 'Female', 10);

CREATE TABLE favourites (
  favourite_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  cafe_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (cafe_id) REFERENCES cafes(cafe_id)
);

INSERT INTO favourites (user_id, cafe_id)
VALUES
(1, 5),
(2, 7),
(3, 10),
(4, 2),
(5, 9),
(6, 1),
(7, 4),
(8, 8),
(9, 3),
(10, 6);


SET SQL_SAFE_UPDATES = 0;

DELETE FROM cafes
WHERE name = "Starbucks";

SELECT *
FROM cafes;

SELECT *
FROM cafes
WHERE name = "Starbucks";

SELECT *
FROM users
WHERE username = "user11";

DELETE FROM users
WHERE username = "user11";