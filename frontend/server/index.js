const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tchai'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
    } else {
        console.log('Successfully connected to database!');
    }
});

app.use(express.json());

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    const sql = 'INSERT INTO account (username, password) VALUES (?, ?)';
    const values = [username, password];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error creating user account: ', err);
            res.status(500).json({message: 'Error creating user account'});
        } else {
            console.log('New user account created successfully!');
            res.status(200).json({message: 'User account created successfully'});
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});