const express = require('express')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const { auth } = require('express-oauth2-jwt-bearer');




const app = express()
app.listen(5000,()=>{
    console.log(`Server started on http://localhost:5000/`);
})

const jwtCheck = auth({
    audience: 'http://localhost:5000',
    issuerBaseURL: 'https://express-demo-proj.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });
  
  // enforce on all endpoints





app.get('/public',(req,res)=>{
    res.json({
        type:'public'
    })
})



app.get('/private',jwtCheck,(req,res)=>{
    res.json({
        type:'private'
    })
})