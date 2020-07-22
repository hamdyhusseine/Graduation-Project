const CRUD = require('../helpers/crud')
const Admin = require('../models/admin.model')
const User = require('../models/user.model')
const statusTypes = require('../helpers/statusTypes.json')

class AdminController {
    static async requests(req, res) {
        // get all the Users whom accounts aren't activated
        await CRUD.getData(User, false, [], { status: statusTypes[1] }) //? pending
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async requestDecision(req, res) {
        let response = {}
        // send request decision approval or rejection
        if (req.body.decision) { // if approved
            response = { status: statusTypes[0], isSeller: true } //? approve activate the seller account
        } else { // rejected
            response = { status: statusTypes[2] } //? rejected 
        }

        await CRUD.updateOne(User, { _id: req.params.id }, { $set: response })
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async getData(req, res) {
        await CRUD.getData(Admin, false) // autopopulate off
            .then(async response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async getOne(req, res) {
        let id = req.params.id;

        await CRUD.getOne(Admin, false, { _id: id }) // autopopulate off
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
        await CRUD.create(req.body, Admin)
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async update(req, res) {
        await CRUD.updateOne(Admin, { _id: req.params.id }, { $set: req.body })
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async delete(req, res) {
        await CRUD.delete(Admin, { _id: req.params.id })
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }
}

module.exports = AdminController