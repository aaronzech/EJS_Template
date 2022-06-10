const express = require('express');
const { render } = require('express/lib/response');
const app = express();
const redditData = require('./data.json');
console.log(redditData);

const path = require('path');
const { request } = require('http');
const { text } = require('express');
const { all } = require('express/lib/application');

//app.use(express.static('public'))
app.use(express.static(path.join(__dirname, '/public'))); // Add CSS template


// Use middleware
app.use(express.urlencoded({extended: true}))


app.set('view engine','ejs');

app.get('/tacos',(req,res) =>{
    res.send('getpost');
    console.log(req.body);
})
app.post('/tacos',(req,res) =>{
    //res.send("POST/TACOS RESPONSE")
    console.log(req.body);
    const {meat, qty } = req.body;
    res.send(`OK here are your ${meat} + ${qty}`)
})

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


//pretend database for RESTFUL API teset

const comments = [
    {
        username: 'Todd',
        comment: 'lol so funny'
    },
    {
        username: 'ST3@k',
        comment: 'yum yum'
    },
    {
        username: 'S@NKE001',
        comment: 'xD'
    },
    {
        username: 'PRO$HOES',
        comment: 'tie them up'
    },
    {
        username: 'diseny_prince',
        comment: 'A dream is what makes a wish come true'
    },
    {
        username: 'Knightless_SLeeper',
        comment: 'Let your sword fall'
    },
]
app.get('/comments',(req,res) =>{
    //res.render('index')
    console.log("comments");
    res.render('index',{comments});
})

app.post('/comments',(req,res) =>{
   
    const {username,comment} = req.body; // Save form variables from body object
    comments.push({username,comment}); // Add to comment array
    //Redirect the user to main page
    res.redirect('/comments');
})

app.get('/comments/new',(req,res) =>{
    res.render('new');
})
