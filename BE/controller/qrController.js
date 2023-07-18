const Qr = require('../models/Qr')
const qrController = {
    addQr: async (req, res) => {
        try {
            const newQr = new Qr(req.body);
            const savedQr = await newQr.save();
            return res.status(200).json(savedQr);
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }
    },
    getAllQr: async (req, res) => {
        try {
            const bank = await Qr.find();
            return res.status(200).json(bank)
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }

    },
    getById: async (req, res) => {
        try {
            const qr = await Qr.findById(req.params.id);
            return res.status(200).json(qr);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    getByDomain: async (req, res) => {
        try {
            const qr = await Qr.find({domain : req.params.domain});
            return res.status(200).json(qr);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    updateQr: async (req, res) => {
        try {
            const qr = await Qr.findById(req.body._id);
            await qr.updateOne({ $set: req.body });
            return res.status(200).json("Update successfully");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    deleteQr: async (req, res) => {
        try {
            
            const qr = await Qr.findByIdAndDelete(req.body._id);
            return res.status(200).json("Delete successfully")
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = qrController;