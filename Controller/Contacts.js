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
                var emailExist = await Contacts.findOne({email : body.email}),
                    phoneExist = await Contacts.findOne({mobileNumber : body.mobileNumber})
                    
                if (validEmail(body.email) && validPhone(body.mobileNumber)) {
                    if (!emailExist && !phoneExist) {
                        body.userId = user
                        var contacts = new Contacts(body)
                        user.contacts.push(contacts)
                        contacts.save(err => {
                            if (err) throw err
                            user.save()
                        })
                        Contacts(body).save(err => {
                            if (err) throw err
                
                            return res.status(200).send({
                                statusCode : 200,
                                message : message.doneSuccessfully
                            })
                        })
                    }else {
                        res.status(302).send({
                            statusCode : 302,
                            message : message.emailOrMobileNumberExist
                        })
                    }
                    
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
            perPage = 3,
            query = {}
            if (body.character) {
                query = {$or : [{firstName : {$regex: '.*' + body.character + '.*', $options: 'i'}}, {lastName : {$regex: '.*' + body.character + '.*', $options: 'i'}}]}
            }
        var user = await Users.findOne({authorization : body.authorization, deviceToken : body.deviceToken, fingerPrint : body.fingerPrint})
        .populate({
            path : 'contacts', 
            options: {
                skip: (perPage * page) - perPage,
                limit : perPage
            },
            match: query
        }).select('contacts')
        if (user) {
            res.status(200).send({
                statusCode : 200,
                data : user.contacts,
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

// get recent contacts
exports.getRecentContacts = async (req, res) => {
    var body = req.body
    if (body.authorization && body.deviceToken && body.fingerPrint) {
        var user = await Users.findOne({authorization : body.authorization, deviceToken : body.deviceToken, fingerPrint : body.fingerPrint})
        .populate({
            path : 'contacts', 
            options: {
                limit : 5,
                sort: { '_id': -1 }
            }
        }).select('contacts')
        if (user) {
            res.status(200).send({
                statusCode : 200,
                data : user.contacts,
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