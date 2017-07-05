const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const app = express();
const router = express.Router();


app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache')
app.set('views', './views')
app.use('/static', express.static('static'));

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/newdb');
// "schema" User: User to hold all users
const User = require('./user.js')

// parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'ssshhh',
  resave: false,
  saveUninitialized: true
}));

// // USE IT
// var user = new User({firstName: "John",
// lastName:"Doe"});
// console.log(user);

// // "isntance" user: "collection" user
// const user = new User({firstName: "Alex", lastName: "Jones"});
// // save it to database and provide the error handler
// user.save().then(function(){
//    console.log("user has been inserted")
// }).catch(function(){
//    console.log("uh oh!")
// })
//
// console.log(user);


// requests
// root page renders all users
app.get('/', function (req,res) {
   User.find().then(function(user){
      console.log(user)
      res.render('index', {User: user})
   }).catch(function(){
      console.log("something went wrong with finding your users!")
   });

});

//page for adding/ editing/ deleting
// could probably be on the same page as users >> just insert forms and add these functions in the post for each form


// port
app.listen(3000, function() {
   console.log('Listening on port 3000!');
});









// recipe.ingredients.push({ingredient: 'sugar', measure: " Tbsp"});
// console.log(recipe.toObject());
