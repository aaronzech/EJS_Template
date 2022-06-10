const express = require('express');
const { render } = require('express/lib/response');
const app = express();
const redditData = require('./data.json');
console.log(redditData);

const path = require('path');

//app.use(express.static('public'))
app.use(express.static(path.join(__dirname, '/public'))); // Add CSS template




app.set('view engine','ejs');

//app.set('views',path.join(__dirname,'/views')); // USE TO map the views path

app.get('/',(req,res) =>{
   //res.send("Hi");
    res.render('home');
})

app.get('/r/:subreddit',(req,res) =>{
    //res.send("Hi");
    const {subreddit} = req.params;
    const data1 = redditData[subreddit];
    if(data1){
        console.log(data1)
        res.render('subreddit',{...data1});  // Spread it in
    } else{
        res.render("notFound", {subreddit})
    }

 })

 app.get('/cats',(req,res) =>{
     const cats =[
         'Blue','Rocket','Reece','Rose','Ronny'
     ]
     res.render('cats', {cats});
 })

app.get('/rand',(req,res) =>{
    const num = Math.floor(Math.random() * 10)+ 1;
     res.render('random', {rand: num});
 })

app.listen(3000, ()=> {
    console.log("LISTENING ON PORT 3000");
})