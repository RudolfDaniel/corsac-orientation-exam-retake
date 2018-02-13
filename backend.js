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

app.get('/tickets', (req, res) => {
  if (req.query.manufacturer !== '' && req.query.reporter !== undefined) {
    conn.query(`SELECT * FROM tickets WHERE manufacturer = "${req.query.manufacturer}" AND reporter = ${req.query.reporter}`, (err, rows) => {
      if (err) {
        res.json({
          message: 'error2',
        });
      };
      res.json({
        tickets:
        (rows.map((listTicket) => {
          return {
            id: listTicket.id,
            reporter: listTicket.reporter,
            manufacturer: listTicket.manufacturer,
            serial_number : listTicket.serial_number,
            description : listTicket.description,
            reported_at : listTicket.reported_at,
          }
        }))
      });
    })
  } else if (req.query.manufacturer !== '') {
    conn.query(`SELECT * FROM tickets WHERE manufacturer = ${req.query.manufacturer}`, (err, rows) => {
      if (err) {
        res.json({
          message: 'error3',
        });
      };
      res.json({
        tickets:
        (rows.map((listTicket) => {
          return {
            id: listTicket.id,
            reporter: listTicket.reporter,
            manufacturer: listTicket.manufacturer,
            serial_number : listTicket.serial_number,
            description : listTicket.description,
            reported_at : listTicket.reported_at,
          }
        }))
      });
    })
  } else if (req.query.reporter !== undefined) {
    conn.query(`SELECT * FROM tickets WHERE reporter = "${req.query.reporter}"`, (err, rows) => {
      if (err) {
        res.json({
          message: 'error4',
        });
      };
      res.json({
        tickets:
        (rows.map((listTicket) => {
          return {
            id: listTicket.id,
            reporter: listTicket.reporter,
            manufacturer: listTicket.manufacturer,
            serial_number : listTicket.serial_number,
            description : listTicket.description,
            reported_at : listTicket.reported_at,
          }
        }))
      });
    })
  } else {
    conn.query('SELECT * FROM tickets', (err, rows) => {
    if (err) {
      res.json({
        message: 'error5',
      });
    };
    res.json({
      tickets:
      (rows.map((listTicket) => {
        return {
          id: listTicket.id,
          reporter: listTicket.reporter,
          manufacturer: listTicket.manufacturer,
          serial_number : listTicket.serial_number,
          description : listTicket.description,
          reported_at : listTicket.reported_at,
        }
      }))
    });
  });
}
});

app.listen(PORT);