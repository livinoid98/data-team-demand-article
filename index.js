const express = require('express');
const app = express();
const ejs = require('ejs');
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('views'));

app.get('/', (req, res) => {
  res.render('index.ejs', {});
});

app.get('/create', (req,res) => {
  res.render('create.ejs', {});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});