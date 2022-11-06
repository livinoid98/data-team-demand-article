const express = require('express');
const app = express();
const ejs = require('ejs');
const mysql = require('mysql2/promise');
const port = 3000;

let connection = mysql.createPool({
  host:'127.0.0.1',
  port:3306,
  user:'root',
  password:'admin123',
  database: 'data_team',
  connectionLimit: 50
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
  let sql = 'select * from checklist order by id desc';
  connection.query(sql, function(err, results, fields){
    if(err){
      throw err;
    }
    res.render('index.ejs',{records:results});
  });
});

app.get('/create', (req,res) => {
  res.render('create.ejs', {});
});

app.post('/create', (req,res) => {
  let title = req.body.title;
  let team = req.body.team;
  let name = req.body.name;
  let pageurl = req.body.pageurl;
  let content = req.body.content;
  let deadline = req.body.deadline;
  let file = req.body.file;
  let confirm1 = Boolean(req.body.confirm1);
  let confirm2 = Boolean(req.body.confirm2);
  let sql = `insert into checklist (title, team, name, pageurl, content, deadline, file, confirm1, confirm2) values (?,?,?,?,?,?,?,?,?)`;
  let param = [title, team, name, pageurl, content, deadline, file, confirm1, confirm2];
  connection.query(sql, param);
  res.redirect('/');
});

app.get('/edit/:id', (req,res) => {
  let sql = 'select * from checklist where id = ?';
  connection.query(sql, [req.params.id], (err, results) => {
    if(err) throw err;
    res.render("edit.ejs", {records:results});
  });
});

app.get('/delete/:id', (req,res) => {
  let sql = 'delete from checklist where id = ?';
  connection.query(sql, [req.params.id], (err,results) => {
    if(err){
      throw err;
    }
  }).then(() => {
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});