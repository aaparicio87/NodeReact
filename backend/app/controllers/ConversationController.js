const { Conversations } = require('../models/index');

module.exports = {

    add(body) {

        // Create message
        Conversations.create({
            title: body.title,
            creator_id: body.creator_id,
        }).then(msg => {
            console.log(`New conversation created ${msg}`);
        }).catch(err => {
            console.log(err);
        })

    }
}