const express = require('express');
const router = express.Router();
//const jwt = require("jsonwebtoken");
const User = require('../models/userModel')
const {isAuth, getToken}  = require('../util')



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


router.post('/signin', async(req, res) => {

    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(signinUser){
        res.send({
            _id: signinUser.id,
            first_name: signinUser.first_name,
            last_name: signinUser.last_name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        });
        console.log(signinUser)

    }else{
        res.status(401).send({msg: 'Invalid email or password.'})
    }
});

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
        res.status(404).send({msg: 'User not found!'})
    }
  
});

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