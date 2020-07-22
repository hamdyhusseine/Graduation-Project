const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const router = Router();

router.post('/login', (req, res) => AuthController.login(req, res));
router.post('/register', (req, res) => AuthController.register(req, res));
router.post('/admin', (req, res) => AuthController.adminLogin(req, res));

module.exports = router;