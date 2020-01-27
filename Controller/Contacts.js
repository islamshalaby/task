var Contacts = require('../Model/Contact')
var Users = require('../Model/User')
var message = require('../messages/statusMessages.json')
var {validEmail, validPhone} = require('../helpers/validation')

// post new contact
exports.postNewContact = async (req, res) => {
    var body = req.body
    if (body.authorization && body.deviceToken && body.fingerPrint) {
        var user = await Users.findOne({authorization : body.authorization, deviceToken : body.deviceToken, fingerPrint : body.fingerPrint})

        if (user) {
            if (body.firstName && body.lastName && body.email && body.mobileNumber) {
                if (validEmail(body.email) && validPhone(body.mobileNumber)) {
                    body.userId = user
                    Contacts(body).save(err => {
                        if (err) throw err
            
                        return res.status(200).send({
                            statusCode : 200,
                            message : message.doneSuccessfully
                        })
                    })
                }else {
                    res.status(301).send({
                        statusCode : 301,
                        message : message.wrongEmailAndPhone
                    })
                }                
            }else {
                return res.status(405).send({
                    statusCode : 405,
                    message : message.contactFieldsRequired
                })
            }
        }else {
            return res.status(401).send({
                statusCode : 401,
                message : message.notAuthorize
            })
        }
    }else {
        return res.status(405).send({
            statusCode : 405,
            message : message.userFieldsRequired
        })
    }
    

}

// get all user contacts
exports.getAllUserContacts = async (req, res) => {
    var body = req.body
    if (body.authorization && body.deviceToken && body.fingerPrint) {
        var page = body.pageNum || 1,
            perPage = 5
        var user = await Users.findOne({authorization : body.authorization, deviceToken : body.deviceToken, fingerPrint : body.fingerPrint})
        .populate({path : 'contacts', options: {
            skip: (perPage * page) - perPage,
            limit : perPage
        }}).select('contacts')
        if (user) {
            res.status(200).send({
                statusCode : 200,
                data : user,
                message : message.doneSuccessfully
            })
        }else {
            return res.status(401).send({
                statusCode : 401,
                message : message.notAuthorize
            })
        }

    }else {
        return res.status(405).send({
            statusCode : 405,
            message : message.userFieldsRequired
        })
    }
}