var mongoose = require('mongoose'),
    userSchema = mongoose.Schema({
        name : String,
        authorization : {
            type : String,
            require : true
        },
        deviceToken : {
            type : String,
            require : true
        },
        fingerPrint : {
            type : String,
            require : true
        },
        contacts : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'contacts'
            }
        ],
    })
      
module.exports = mongoose.model('users', userSchema)

