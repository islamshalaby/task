var Users = require('../Model/User')
var message = require('../messages/statusMessages.json')


// post new user
exports.postnewUser = async (req, res) => {
    var body = req.body
    
    if (body.deviceToken && body.fingerPrint && body.authorization) {
        var user = await Users.findOne({deviceToken : body.deviceToken, fingerPrint : body.fingerPrint, authorization : body.authorization})
        if (user) {
            return res.status(301).send({
                statusCode : 301,
                message : message.userExist
            })

        }else {
            Users(body).save(err => {
                if (err) throw err
    
                return res.status(200).send({
                    statusCode : 200,
                    message : message.sentSuccessfully
                })
            })
        }
    }else {
        return res.status(405).send({
            statusCode : 405,
            message : message.userFieldsRequired
        })
    }
    
}

// get all users
exports.getAllUsers = async (req, res) => {
    var users = await Users.find()

    return res.status(200).send({
        statusCode : 200,
        data : users,
        message : message.sentSuccessfully
    })
}