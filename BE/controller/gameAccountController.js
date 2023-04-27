const GameAccount = require('../models/GameAccount')
const User = require('../models/User');
const { use } = require('../routes/user');

const gameAccountController = {
    addBankAccount: async (req, res) => {
        try {
            const newGameAccount = new GameAccount(req.body);

            const savedGameAccount = await newGameAccount.save();
            if (req.body.user) {
                const user = await User.findOne({ _id: req.body.user });
                await user.updateOne({ $push: { gameAccounts: savedGameAccount._id } })
                if (user && user.gameProduct && user.gameProduct.includes(req.body.gameProduct)) {
                } else {
                    const user1 = await User.findOne({ _id: req.body.user });
                    await user1.updateOne({ $push: { gameProduct: req.body.gameProduct } })
                }
               
            }
            
            return res.status(200).json(savedGameAccount);
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }
    },
    getAllGameAccount: async (req, res) => {
        try {
            const gameAccount = await GameAccount.find();
            return res.status(200).json(gameAccount)
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }

    },
    getById: async (req, res) => {
        try {
            const gameAccount = await GameAccount.findById(req.params.id).populate('user');
            return res.status(200).json(gameAccount);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    updateGameAccount: async (req, res) => {
        try {
            const gameAccount = await GameAccount.findById(req.body._id);
            await gameAccount.updateOne({ $set: req.body });
            return res.status(200).json("Update successfully");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    deleteGameAccount: async (req, res) => {
        try {
            await User.updateMany(
                { gameAccounts: req.body._id},
                {
                    $pull: { gameAccounts: req.body._id }
                })
            const gameAccount = await GameAccount.findByIdAndDelete(req.body._id);
            return res.status(200).json("Delete successfully")
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = gameAccountController;  