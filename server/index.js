// import dotenv package to read the properties in the .env file.
require('dotenv').config();

//import the express module
const express = require('express');

// import the path utils from Node.
const path = require('path');
const cors = require("cors");
const cookSession = require('cookie-session');

//import login service
const loginService = require("./services/loginService");

// create an instance of express
const app = express();

// read the value of PORT NODE_EVN variable in the .env file
// when the index.js file starts up this file is read in and
// we can set configuration variables for the application.
const PORT =  process.env.PORT || 5000

// Middleware For Cross Origin Resource SHaring
app.use(cors());

//To get access to the name value pairs send in the message Body of POST Request.
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Session Middleware
app.use(cookSession({
  name:"session",
  keys:['SDFLU9iw2308dlsfuwe2adfl', 'LDFA34gsdfgFOPW2323DA7FS2']
}));

//set up ejs to be the template engine 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

//Middleware Serving Static Pages from client directory
//second parameter is an configuration object of how we want
//the static file server to run.
app.use(express.static(path.join(__dirname, "../client"), {extensions: ["html", 'htm']}));

 //creating a protected route
app.get('/dashboard', (req, res)=>{
  if(req.session.isValid){
    res.render('dashboard')
  }else{
    res.redirect('/login')
  }
});

//render login get request
app.get("/login", (req, res)=>{
  res.render("login", {passwordWarning:"", emailWarning:"", email:"", password:""});
});

app.post("/login", (req, res)=>{
  const cred = {
    email: req.body.email,
    password: req.body.password
  }

  const isValidUser = loginService.authenticate(cred);

  //if the isValidUser has a user returned
  if( isValidUser.user !== null){
    // set a session value isValid
    if(!req.session.isValid){
      req.session.isValid = true;
    }
    res.redirect('dashboard');
  }

  if(isValidUser.user === null){
    res.render('login', {
      emailWarning:isValidUser.emailWarning, 
      passwordWarning:isValidUser.passwordWarning,
      email:req.body.email,
      password:req.body.password
    });
  }
});

app.post("/login", (req, res)=>{
  const credentials = {
    email:req.body.email,
    password:req.body.password
  }

  const isValidUser = loginService.authenticate(credentials);
  res.end();
})

// Final Middleware 
// Catch all for any request not handled while express was
// processing requests. 
// Returns 404 Page from the client directory.
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
});

// Tell express app to listen for incoming request on a specific PORT
app.listen(PORT, () => {
  console.log(`server started on http://localhost:5000`);
});
