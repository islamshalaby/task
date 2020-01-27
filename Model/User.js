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
        }
    }, {
        getters: true
      })
      
module.exports = mongoose.model('users', userSchema)
userSchema.virtual('contacts', {
    ref: 'contacts', 
    localField: '_id', 
    foreignField: 'userId', 
    justOne: false
  })
