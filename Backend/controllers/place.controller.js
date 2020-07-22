const CRUD = require('../helpers/crud')
const Place = require('../models/place.model')
const User = require('../models/user.model')

class PlaceController {
    static async getData(req, res) {
        await CRUD.getData(Place, true, ['author']) // autopopulate off
            .then(async response => {
                res.status(201).send(response)
            })
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            })
    }

    static async getOne(req, res) {
        let id = req.params.id;

        await CRUD.getOne(Place, ['author', 'rentalRequests.renterID', 'renters'], { _id: id })
            .then(async response => {
                if (!response.success) {
                    return res.status(404).send(response)
                }

                return res.status(200).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async create(req, res) {
        let user = req.user;
        req.body.author = user._id
        await CRUD.create(req.body, Place)
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async SellerPosts(req, res) {
        let SellerID = req.user._id;

        await CRUD.getData(Place, true, ['author'], { author: SellerID })
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    //! deprecated
    // static async SellerRentalRequests(req, res) {
    //     let SellerID = req.user._id;
    //     // ? all places posted by the seller
    //     let response = await Place.find({ author: SellerID }).populate(['author',{rentalRequests:'renterID'}, 'renters']).exec()
    //     // let response = await CRUD.getData(Place, true, { author: SellerID })
    //     console.log(response)
    //     res.status(200).send(response)
    // }


    static async confirmRental(req, res) {
        // decision can be true or false
        // incase its false, delete the request from the place object
        let { placeID, userID, decision } = req.body;
        console.log(req.body)
        if (decision == true) {
            await CRUD.updateOne(Place, { _id: placeID }, { $push: { renters: userID }, $pull: { rentalRequests: { renterID: userID } }, $inc: { 'residents.current': 1 } })
                .then(async response => {
                    // await CRUD.updateOne(Place, { _id: placeID }, { $pull: { placesFK: placeID } })
                    //     .then(async () => {
                    res.status(201).send(response)
                    // })
                })
                .catch(err => {
                    res.status(400).send(err)
                })
        } else {
            await CRUD.updateOne(Place, { _id: placeID }, { $pull: { rentalRequests: { renterID: userID } } })
                .then(async response => {
                    // await CRUD.updateOne(Place, { _id: placeID }, { $pull: { placesFK: placeID } })
                    //     .then(async () => {
                    res.status(201).send(response)
                    // })
                })
                .catch(err => {
                    res.status(400).send(err)
                })
        }

    }

    static async update(req, res) {
        await CRUD.updateOne(Place, { _id: req.params.id }, { $set: req.body })
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async delete(req, res) {
        await CRUD.delete(Place, { _id: req.params.id })
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }
}

module.exports = PlaceController