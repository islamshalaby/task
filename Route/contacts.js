var express = require('express')
var router = express.Router()
var ContactsController = require('../Controller/Contacts')

// post new contact
router.post('/addcontact', ContactsController.postNewContact)

// get all user contacts
router.post('/getList', ContactsController.getAllUserContacts)

module.exports = router