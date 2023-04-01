const Status = require('../models/Status')

const statusController = {
    addStatus: async (req, res) => {
        try {
            console.log('1')
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

            const status = await Status.findById(req.body._id);
            status.isActive = false
            status.save()
            return res.status(200).json("Delete successfully")
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = statusController;