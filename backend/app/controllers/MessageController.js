const { Messages } = require('../models/index');

module.exports = {

    add(body) {

        // Create message
        Messages.create({
            sender_id: body.sender_id,
            reciber_id: body.reciber_id,
            conversation_id: body.conversation_id,
            message_content: body.message_content,
        }).then(msg => {
            console.log(`New message created ${msg}`);
        }).catch(err => {
            console.log(err);
        })

    }
}