const express = require('express');
const loginRouter = express.Router();
const { UserModel } = require('../../Database/mongodb');
const log = require('../Controllers/login');

loginRouter.post('/signup', log.signUp );

loginRouter.post('/login', log.login)

loginRouter.get('/getcookie', async(req, res)=>{
    console.log('Cookies:', req.cookies.server)
})

module.exports = loginRouter;