const express = require('express');
const app = express();
const ejs = require('ejs');
const mysql = require('mysql2/promise');
const port = 3000;

let connection = mysql.createPool({
  host:'127.0.0.1',
  port:3306,
  user:'root',
  password:'skxortn1!',
  database: 'data_team'
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('views'));

app.get('/', (req, res) => {
  res.render('index.ejs', {});
});

app.get('/create', (req,res) => {
  res.render('create.ejs', {});
});

app.post('/create', (req,res) => {
  let sql = `insert into checklist ("id", "title", "team", "name", "pageurl", "content", "deadline") values('test','성장운영본부 데이터팀','최찬영','https://cheremimaka.com/index.html','예시내용',NOW())`;
  connection.query(sql);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});