'use strict';

const PORT = 8080;

const express = require('express');
const mysql = require('mysql');

const app = express();

app.use('/', express.static('public'));
app.use(express.json());

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'orientation_retake',
});

conn.connect(function(err){
  if(err){
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

app.get('/users', (req, res) => {
  conn.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.json({
        message: 'error1',
      });
    };
    res.json({
      users:
        (rows.map((listUser) => {
        return {
          id: listUser.id,
          name: listUser.name,
        };
      }))
    });
  });
});

app.listen(PORT);