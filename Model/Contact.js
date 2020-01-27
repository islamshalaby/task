var mongoose = require('mongoose'),
    contactSchema = mongoose.Schema({
        firstName : String,
        lastName : String,
        email : String,
        mobileNumber : String,
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'users'
        },
        createdAt : {
            type : Date,
            default : Date.now()
        }
    })

module.exports = mongoose.model('contacts', contactSchema)