const express = require('express');
const router = express.Router();

 // Middlewares
const auth = require('./middlewares/auth');


// Controllers
const AuthController = require('./controllers/AuthController');

// Home
router.get('/', (req, res) => res.json({ hello: "World" }));

 // Two routes: login y registry
// /api/singin & /api/singup
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

// Routes with middleware auth to protect the acces routes
/*router.get('/api/users', auth, UsertController.index);
router.get('/api/users/:id', auth, UserController.find, UserPolicy.show, UserController.show);
router.patch('/api/users/:id', auth, UserController.find, UserPolicy.update, UserController.update);
router.delete('/api/users/:id', auth, UserController.find, UserPolicy.delete, UserController.delete); */

module.exports = router;