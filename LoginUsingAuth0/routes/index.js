var express = require('express');
var router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const axios = require('axios')


router.get("/", (req, res) => {
  console.log(req.oidc.isAuthenticated());
  res.render("index", {
    title: "Express App",
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});



router.get("/secured", requiresAuth(),async(req, res) => {
    let data={}
    const {token_type,access_token} =  req.oidc.accessToken
    try{
      const apiResponse = await axios.get('http://localhost:5000/private',
      {
        headers:{
          authorization:`${token_type} ${access_token}`
        }
      })    
      data = apiResponse.data
    }catch(e){
      console.log(e);
    }
  
    res.render("secured", {
      title: "Secured Page",
      isAuthenticated: req.oidc.isAuthenticated(),
      user: req.oidc.user,
      data:data
    });
  });
  


module.exports = router;