const { Router } = require('express');
const PlaceController = require('../controllers/place.controller');
const authenticate = require('../middlewares/check-auth')
const router = Router();

router.post(
    '/',
    (req, res, next) => authenticate(req, res, next, false, true), // must be seller
    PlaceController.create
);

router.get('/', PlaceController.getData);

// get place by id
router.get('/:id', PlaceController.getOne);

// ! deprecated
// ? fetch rental requests on the seller dashboard
// router.get('/seller/requests',
//     (req, res, next) => authenticate(req, res, next, false, true), // must be seller
//     PlaceController.SellerRentalRequests)
// ? fetch all posts posted by the seller
router.get('/seller/posts',
    (req, res, next) => authenticate(req, res, next, false, true), // must be seller
    PlaceController.SellerPosts
)

router.put(
    '/:id',
    (req, res, next) => authenticate(req, res, next, false, true), // must be seller
    PlaceController.update
);
router.post(
    '/rent/',
    (req, res, next) => authenticate(req, res, next, false, true), // must be seller
    PlaceController.confirmRental
);
router.delete(
    '/:id',
    (req, res, next) => authenticate(req, res, next, false, true), // must be seller
    PlaceController.delete
);

module.exports = router;
