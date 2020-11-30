const { Users } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {

    // Login
    signIn(req, res) {

        let { email, password } = req.body;

        // Search User
        Users.findOne({
            where: {
                email: email
            }
        }).then(user => {

            if (!user) {
                res.status(404).json({ msg: "User with this mail does not exist" });
            } else {

                if (bcrypt.compareSync(password, user.password)) {

                    // Create a token
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });

                    res.json({
                        user: user,
                        accessToken: token
                    })

                } else {

                    // Unauthorized Access
                    res.status(401).json({ msg: "Invalid Password" })
                }

            }

        }).catch(err => {
            res.status(500).json(err);
        })

    },

    // Registro
    signUp(req, res) {
        // Encrypt Pass
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        // Create user
        Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roomName: req.body.roomName,
            email: req.body.email,
            password: password,
            title: req.body.title,
            phoneNumber: req.body.phoneNumber,
            dateBirth: req.body.dateBirth,
            gender: req.body.gender,
            customer: req.body.customer,
            admin: req.body.admin

        }).then(user => {

            // Creamos el token
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.json({
                user: user,
                accessToken: token
            });

        }).catch(err => {
            res.status(500).json(err);
        });

    }

}