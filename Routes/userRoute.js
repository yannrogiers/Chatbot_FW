const express = require('express');
const router = express.Router();
//const jwt = require("jsonwebtoken");
const User = require('../models/userModel')
const {isAuth, getToken}  = require('../util')

/*https://expressjs.com/en/guide/routing.html*/
//User toevoegen 
router.put('/:id', isAuth, async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      user.first_name = req.body.first_name || user.first_name;
      user.last_name = req.body.last_name || user.last_name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser.id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: getToken(updatedUser)
      });
    } else {
      res.status(404).send({ msg: 'User Not Found' });
    }
  
  });

//User inloggen
router.post('/signin', async(req, res) => {

    const signUserIn = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(signUserIn){
        res.send({
            _id: signUserIn.id,
            first_name: signUserIn.first_name,
            last_name: signUserIn.last_name,
            email: signUserIn.email,
            isAdmin: signUserIn.isAdmin,
            token: getToken(signUserIn)
        });
        console.log(signUserIn)

    }else{
        res.status(401).send({msg: 'Invalid email or password.'})
    }
});


//Use profile editten
router.put('/:id', isAuth, async(req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(user){
        user.first_name = req.body.first_name || user.first_name;
        user.last_name = req.body.last_name || user.last_name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser.id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: getToken(updatedUser)
        });
    }else{
        res.status(404).send({msg: 'The user was not found!'})
    }
  
});


//register new user
router.post('/register', async(req, res) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    });
    const newUser = await user.save();
    if(newUser){
        res.send({
            _id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    }else{
        res.status(401).send({msg: 'Invalid user data.'})
    }
});


//Maak admin account
router.get('/createadmin', async (req, res) => {
    try {
        const user = new User({
            first_name: 'Yann',
            last_name:'Rogiers',
            email: 'yannrogiers@gmail.com',
            password: '123456',
            isAdmin: true
        });

        const newUser = await user.save();
        res.send(user);

    } catch (error) {
        res.send({msg: error.message});
    }




});

module.exports = router;