const { Chats } = require('../models/index');

module.exports = {

    add(body) {

        // Create message
        Chats.create({
            sender_id: body.sender_id,
            reciber_id: body.reciber_id,
            type: body.type,
            message: body.message,
        }).then(chat => {
            return chat;
        }).catch(err => {
            return res.json({success: false, err});
        })

    }
}