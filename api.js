const express = require('express');
const cors = require('cors');
const db = require('mysql2');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const connection = db.createConnection({
    host:"localhost",
    port: 3306,
    user:"root",
    password:"Koo8w0irfg1#",
    database:"coffeeshop"
});

//Data of all cafes
app.get('/all/cafes', (req, res) => {
    //query as a constant
    const queryAllDataCafes = 'SELECT * FROM cafes'
    connection.query(queryAllDataCafes, (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.send(results)
        }
    });
});

//Data of all users
app.get('/all/users', (req, res) => {
    const queryAllDataUsers = 'SELECT * FROM users'
    connection.query(queryAllDataUsers, (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.send(results)
        }
    });
});

//Endpoint filtering cafes table by cafe_id
app.get('/all/cafes/:id', (req, res) => {
    const qParamCafeId = req.params.id
    connection.query('SELECT * FROM cafes WHERE cafe_id = ?',
        [qParamCafeId],
        (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.send(results)
        }
        });
});

//Endpoint filtering users table by user_id
app.get('/all/users/:id', (req, res) => {
    const qParamUserId = req.params.id
    connection.query('SELECT * FROM users WHERE user_id = ?',
        [qParamUserId],
        (error, results) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.send(results)
            }
        });
});

//Endpoint filtering cafes table by name of cafe
app.get('/cafe/:name', (req, res) => {
    const qParamCafeNames = req.params.name;
    connection.query('SELECT * FROM cafes WHERE name = ?',
        [qParamCafeNames],
        (error, results) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.send(results);
            }
        });
});

//Endpoint filtering users table by username of user
app.get('/users/:username', (req, res) => {
    const qParamUsersUsername = req.params.username;
    connection.query('SELECT * FROM users WHERE username = ?',
        [qParamUsersUsername],
        (error, results) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.send(results);
            }
        });
});

// JSON Syntax
//{
//  "cafe_id": "",
// 	"name": "Starbucks",
// 	"location": "Rådhuspladsen 45",
// 	"wifi_speed": 1000,
// 	"power_outlets": 40,
// 	"seating_capacity": 30,
// 	"rating": 5,
// 	"opening_hours": "7 AM - 8 PM",
// 	"ambiance": "cozy"
// }

app.post('/new/cafes',(req,res)=> {
    const name = req.body.name;
    const location = req.body.location;
    const wifi_speed = req.body.wifi_speed;
    const power_outlets = req.body.power_outlets;
    const seating_capacity = req.body.seating_capacity;
    const rating = req.body.rating
    const opening_hours = req.body.opening_hours
    const ambiance = req.body.ambiance

    connection.query('SELECT * FROM cafes WHERE name = ? OR location = ?',
        [name, location],
        (error, results) => {
            if (error) {
                res.status(500).send(error.message);
            } else if (results.length > 0) {
                // Cafe with the same name or location already exists
                res.status(418).send('Error: Values already exist in table');
            } else {
                connection.query('INSERT INTO cafes (name, location, wifi_speed, power_outlets, seating_capacity, rating, opening_hours, ambiance) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [name, location, wifi_speed, power_outlets, seating_capacity, rating, opening_hours, ambiance],
                    (error, insertResults) => {
                        if (error) {
                            res.status(500).send(error.message);
                        } else {
                            res.send(insertResults);
                        }
                    });
            }
    });
});

// JSON Syntax
//{
// 	"username": "user11",
// 	"email": "user11@email.com",
// 	"password": "password11",
// 	"full_name": "Mike Meyers",
// 	"age": 30,
// 	"gender": "Male",
// 	"favorite_cafe_id": 1
// }

app.post('/new/users',(req,res)=> {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const full_name = req.body.full_name;
    const age = req.body.age
    const gender = req.body.gender
    const favorite_cafe_id = req.body.favorite_cafe_id

    connection.query('SELECT * FROM users WHERE username = ? OR email = ? OR password = ?',
        [username, email, password],
        (error, results) => {
            if (error) {
                res.status(500).send(error.message);
            } else if (results.length > 0) {
                // Users with the same username, email or password already exists
                res.status(418).send('Error: Values already exist in table');
            } else {
                connection.query('INSERT INTO users (username, email, password, full_name, age, gender, favorite_cafe_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [username, email, password, full_name, age, gender, favorite_cafe_id],
                    (error, results) => {
                        if (error) {
                            res.status(500).send(error.message);
                        } else {
                            res.send(results);
                        }
                    });
            }
        });
});

app.get('*',(req,res) =>{
    res.sendStatus(404);
});

app.listen(port, ()=>{
    console.log("API is live");
});