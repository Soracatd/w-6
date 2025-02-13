const mysql = require('mysql2');
const express = require('express');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  database: 'week6-1',
});

const app = express();
const port = 3000;
app.use(express.json());
app.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM `tbl_user` WHERE statun = 1',
        function (err, results, fields) {
          res.json(results);
    }
  );
});

app.get('/:Id', (req, res) => {
    connection.query(
        'SELECT * FROM `tbl_user` WHERE Id = ' + req.params.Id,
        function (err, results, fields) {
          res.json(results);
    }
  );
});

app.post('/', (req, res) => {
    const data = req.body;
    connection.query(
        'INSERT INTO tbl_user (Fname, Lname, statun) VALUES ('${data.Fname}', '${data.Lname}', '1')',
        function (err, results, fields) {
          res.json(results);
    }
  );
});

app.put('/:Id', (req, res) => {
  connection.query(
      'UPDATE tbl_user SET Fname = ? , Lname = ? WHERE Id = ?',
      [req.body.Fname, req.body.Lname, req.body.Id],
      (err, results, fields) => {
        res.json(results);
  }
);
});

app.delete('/:Id', (req, res) => {
    connection.query(
        'UPDATE tbl_user SET Statun = 0 WHERE Id = ${req.params.Id}',
        function (err, results, fields) {
          res.json(results);
    }
  );
});

app.listen(port, () => {
    console.log('Server is running on port : ',port);
})
