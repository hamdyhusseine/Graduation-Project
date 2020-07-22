const { Router } = require('express');
const AdminController = require('../controllers/admin.controller');
const authenticate = require('../middlewares/check-auth')
const router = Router();


router.get('/', (req, res, next) => authenticate(req, res, next, true), AdminController.getData);

router.get('/requests', (req, res, next) => authenticate(req, res, next, true), AdminController.requests);

router.post('/requests/decision/:id', (req, res, next) => authenticate(req, res, next, true), AdminController.requestDecision);

// router.put(
//     '/:id',
//     AdminController.update
// );
// router.delete(
//     '/:id',
//     AdminController.delete
// );

module.exports = router;
