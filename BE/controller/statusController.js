const Status = require('../models/Status')
const BankAccount = require('../models/BankAccount')
const Bank = require('../models/Bank')
const User = require('../models/User');
const GameAccount = require('../models/GameAccount');
const GameProduct = require('../models/GameProduct')
const Transaction = require('../models/TransactionSchema')
const statusController = {
    addStatus: async (req, res) => {
        try {
            const newStatus = new Status(req.body);
            const savedStatus = await newStatus.save();
            return res.status(200).json(savedStatus);
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }
    },
    getAllStatus: async (req, res) => {
        try {
            const status = await Status.find();
            return res.status(200).json(status)
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }

    },
    getById: async (req, res) => {
        try {
            const status = await Status.findById(req.params.id);
            return res.status(200).json(status);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    updateStatus: async (req, res) => {
        try {
            const status = await Status.findById(req.body._id);
            await status.updateOne({ $set: req.body });
            return res.status(200).json("Update successfully");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    deleteStatus: async (req, res) => {
        try {
            await GameAccount.updateMany(
                { status: req.body._id },
                {
                    $pull: { status: req.body._id }
                })
            await User.updateMany(
                { status: req.body._id },
                {
                    $pull: { status: req.body._id }
                })
            await Transaction.updateMany(
                { status: req.body._id },
                {
                    $pull: { status: req.body._id }
                })
            await BankAccount.updateMany(
                { status: req.body._id },
                {
                    $pull: { status: req.body._id }
                })
            await GameProduct.updateMany(
                { status: req.body._id },
                {
                    $pull: { status: req.body._id }
                })
            await Bank.updateMany(
                { status: req.body._id },
                {
                    $pull: { status: req.body._id }
                })
            const status = await Status.findByIdAndDelete(req.body._id);
            return res.status(200).json("Delete successfully")
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = statusController;