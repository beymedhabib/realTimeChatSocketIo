var express = require("express");
var users = require("./../models/UserSchema")
var router = express.Router();
// var jwt = require('jsonwebtoken');
// var bcrypt = require("bcryptjs")
// register
router.post("/register",async (req,res)=>{
    console.log('req-->',req.body);
    // let user = new users(req.body);
    let user = new users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    await user.save();
    res.send(user);
    
})

module.exports = router;