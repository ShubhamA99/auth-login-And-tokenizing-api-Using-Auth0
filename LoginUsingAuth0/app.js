var express = require('express');
var indexRouter = require('./routes/index.js')
const { auth } = require('express-openid-connect');
require('dotenv').config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET || 'Shubham123',
    baseURL: process.env.BASEURL || 'http://localhost:3000',
    clientID: process.env.CLIENTID || 'hmrvgaZahtPJPO8NjGqxqiGw8B6OVRb8',
    issuerBaseURL: process.env.ISSUERBASEURL || 'https://express-demo-proj.us.auth0.com',
    clientSecret:process.env.CLIENTSECRET || 'Z1NT3zO3lOIfhJXNmd1qPO22xgcVKSGaOck05B7N49wIJNyBu0s63pfEhTo_CVm7',
    authorizationParams:{
      response_type:'code',
      audience:'http://localhost:5000',
      scope:'openid profile email'
    }
  };



var app = express();
app.set('views','views');
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(auth(config));


app.use('/',indexRouter)


app.listen(3000,()=>{
    console.log("Server Started at http://localhost:3000/");
})