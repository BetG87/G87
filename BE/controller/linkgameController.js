const LinkGame = require('../models/LinkGame')

const linkGameController = {
    addLinkGame: async (req, res) => {
        try {
            const newLinkGame = new LinkGame(req.body);
            const savedLinkGame = await newLinkGame.save();
            return res.status(200).json(savedLinkGame);
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }
    },
    getAllLinkGame: async (req, res) => {
        try {
            const linkGame = await LinkGame.find();
            return res.status(200).json(linkGame)
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }

    },
    getById: async (req, res) => {
        try {
            const linkGame = await LinkGame.findById(req.params.id);
            return res.status(200).json(linkGame);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    updateLinkGame: async (req, res) => {
        try {
            const linkGame = await LinkGame.findById(req.body._id);
            await linkGame.updateOne({ $set: req.body });
            return res.status(200).json("Update successfully");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    deleteLinkGame: async (req, res) => {
        try {

            const linkGame = await LinkGame.findByIdAndDelete(req.body._id);
            return res.status(200).json("Delete successfully")
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = linkGameController;