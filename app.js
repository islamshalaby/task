const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var {mongoUrl} = require('./config/database')
var mongoose = require('mongoose')

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// Routes
/**
 * Users
 */
var users = require('./Route/users')
app.use('/user', users)

/**
 * Contacts
 */
var users = require('./Route/contacts')
app.use('/contacts', users)

var port = process.env.PORT || 7000;

console.log(port)
app.listen(port)