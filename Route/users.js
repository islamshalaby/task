const express = require('express')
var router = express.Router()
var UsersController = require('../Controller/Users')


// post new user
router.post('/addnew', UsersController.postnewUser)

// get all users
router.get('/all', UsersController.getAllUsers)



module.exports = router