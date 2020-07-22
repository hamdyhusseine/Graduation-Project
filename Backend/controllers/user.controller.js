const CRUD = require('../helpers/crud')
const User = require('../models/user.model')
const Place = require('../models/place.model')
const statusTypes = require('../helpers/statusTypes.json')

class UserController {
    static async getData(req, res) {
        await CRUD.getData(User, false) // autopopulate off
            .then(async response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async getOne(req, res) {
        const id = req.params.id;

        await CRUD.getOne(User, false, { _id: id }) // autopopulate off
            .then(async response => {
                if (!response.success) {
                    res.status(404).send(response)
                } else {
                    res.status(200).send(response)
                }
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async profileDetails(req, res) {
        try {
            let userResponse = await CRUD.getOne(User, 'placesFK', { _id: req.user._id })
            let rentalRequests = userResponse.data.placesFK
            let userConfirmedRentalsResponse = await CRUD.getData(Place, true, ['author'], { renters: req.user._id })
            let confirmedRentals = userConfirmedRentalsResponse.data
            res.status(200).send({ confirmedRentals, rentalRequests })
        } catch (e) {
            res.status(400).send(e)
        }
    }

    static async applyToBeSeller(req, res) {
        let address = req.body.address;
        let socialLink = req.body.socialLink

        await CRUD.updateOne(User, { _id: req.user._id }, { $set: { socialLink, address, status: statusTypes[1] } }, { new: true })
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async update(req, res) {
        let body = req.body
        let user = req.user

        let query = { _id: user._id }

        // ? requesting to change the password but the current password is not correct
        if (!!body.currentPassword && body.currentPassword.length > 0) {
            query.password = body.currentPassword
        }

        try {
            let response = await CRUD.updateOne(User, query, { $set: req.body })
            return res.status(201).send(response)
        }
        catch (e) {
            res.status(400).send(e)
        }
    }


    static async rentalRequest(req, res) {
        let placeID = req.body.placeID
        let renterID = req.user._id // current user id
        let message = req.body.message;
        let place = await CRUD.getOne(Place, false, { _id: placeID })
        // ? the user must not be a current renter or has sent a rental request before
        if (
            !!place.data
            && place.data.renters.indexOf(renterID) == -1
            && place.data.rentalRequests.find(object => object.renterID == renterID) == undefined
        ) {
            let rentalRequestObject = {
                message,
                renterID
            }
            await CRUD.updateOne(Place, { _id: placeID }, { $push: { rentalRequests: rentalRequestObject } })
                .then(response => {
                    res.status(201).send(response)
                })
                .catch(err => {
                    res.status(400).send(err)
                })
        } else {
            res.status(403).send({ success: false, data: {}, message: "User has already sent a rental request or has already rented this place" })
        }
    }

    static async delete(req, res) {
        await CRUD.delete(User, { _id: req.params.id })
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }
}

module.exports = UserController