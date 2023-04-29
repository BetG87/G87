const GameProduct = require('../models/GameProduct')
const GameAccount = require('../models/GameAccount')
const Transaction = require('../models/TransactionSchema')
const User = require('../models/User');

const gameProductController = {
    addGameProduct: async (req, res) => {
        try {
            const newGameProduct = new GameProduct(req.body);
            const savedGameProduct = await newGameProduct.save();
            return res.status(200).json(savedGameProduct);
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }
    },
    getAllGameProduct: async (req, res) => {
        try {
            const gameProduct = await GameProduct.find();
            return res.status(200).json(gameProduct)
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }

    },
    getById: async (req, res) => {
        try {
            const gameProduct = await GameProduct.findById(req.params.id);
            return res.status(200).json(gameProduct);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    updateGameProduct: async (req, res) => {
        try {
            const gameProduct = await GameProduct.findById(req.body._id);
            await gameProduct.updateOne({ $set: req.body });
            return res.status(200).json("Update successfully");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    deleteGameProduct: async (req, res) => {
        try {
            await GameAccount.updateMany(
                { gameProduct: req.body._id },
                {
                    $pull: { gameProduct: req.body._id }
                })
            await User.updateMany(
                { gameProduct: req.body._id },
                {
                    $pull: { gameProduct: req.body._id }
                })
            await Transaction.updateMany(
                { gameProduct: req.body._id },
                {
                    $pull: { gameProduct: req.body._id }
                })
            const gameProduct = await GameProduct.findByIdAndDelete(req.body._id);
            return res.status(200).json("Delete successfully")
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = gameProductController;