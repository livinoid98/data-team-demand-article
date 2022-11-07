const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
  fs.readFile('./formList.txt', 'utf8', (err,data) => {
    if(err){
        console.log(err);
    }else{
        let arrayList = data.split('㏇');
        let allTitle = [];
        let allTeam = [];
        let allName = [];
        let allPageUrl = [];
        let allContent = [];
        let allDeadLine = [];
        let allConfirm1 = [];
        let allConfirm2 = [];
        for(let i=0; i<arrayList.length; i++){
          let column = arrayList[i].split('№');
          allTitle.push(column[0]);
          allTeam.push(column[1]);
          allName.push(column[2]);
          allPageUrl.push(column[3]);
          allContent.push(column[4]);
          allDeadLine.push(column[5]);
          allConfirm1.push(column[6]);
          allConfirm2.push(column[7]);
        }
        return res.render('index.ejs', {id:Number(arrayList.length), title: allTitle, team:allTeam, name:allName, pageurl:allPageUrl, content:allContent, deadline:allDeadLine, confirm1:allConfirm1, confirm2:allConfirm2});
    }
  });
});

app.get('/create', (req,res) => {
  res.render('create.ejs', {});
});

app.post('/create', (req,res) => {
  fs.readFile('./formList.txt', 'utf8', (err,data) => {
    if(err){
        console.log(err);
    }else{
      let article_list = req.body.title + '№' + req.body.team + '№' + req.body.name + '№' + req.body.pageurl + '№' + req.body.content + '№' + req.body.deadline + '№' + Boolean(req.body.confirm1) + '№' + Boolean(req.body.confirm2) + '㏇';

      fs.appendFile('./formList.txt', article_list, (err) => {
        if(err){
            console.log(err);
        }else{
            console.log('write file success');
        }
      });
    }
    res.redirect('/');
  });
});


app.get('/edit/:id', (req,res) => {
  let id = req.params.id - 1;
  let title = '';
  let team = '';
  let name = '';
  let pageurl = '';
  let content = '';
  let deadline = '';
  let confirm1 = '';
  let confirm2 = '';
  fs.readFile('./formList.txt', 'utf8', (err,data) => {
    if(err){
      console.log(err);
    }else{
      let spliceTemp = data.split('㏇');
      let updateList = spliceTemp[id];
      let updateElement = updateList.split('№');
      res.render("edit.ejs", {title:updateElement[0], team:updateElement[1], name:updateElement[2], pageurl:updateElement[3], content:updateElement[4], deadline:updateElement[5], confirm1:updateElement[6], confirm2:updateElement[7]});
    }
  });
});

app.get('/delete/:id', (req,res) => {
  id = req.params.id;
  let origin = '';
  fs.readFile('./formList.txt', 'utf8', (err,data) => {
    if(err){
      console.log(err);
    }else{
      let spliceTemp = data.split('㏇');
      spliceTemp.splice(id-1, 1);
      for(let j=0; j<spliceTemp.length; j++){
        if(spliceTemp[j]===''){
          origin += spliceTemp[j];
        }else{
          origin += spliceTemp[j] + '㏇';
        }
      }
      console.log(origin);
      fs.writeFile('./formList.txt', origin, (err)=>{
        if(err){
          console.error(err);
        }else{
          console.log('update file success');
        }
      });
    }
  });
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});