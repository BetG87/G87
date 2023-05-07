const Bank = require('../models/Bank')
const BankAccount = require('../models/BankAccount')

const bankController = {
    addBank: async (req, res) => {
        try {
            console.log('1')
            const newBank = new Bank(req.body);
            const savedBank = await newBank.save();
            return res.status(200).json(savedBank);
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }
    },
    getAllBank: async (req, res) => {
        try {
            const bank = await Bank.find();
            return res.status(200).json(bank)
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }

    },
    getById: async (req, res) => {
        try {
            const bank = await Bank.findById(req.params.id);
            return res.status(200).json(bank);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    updateBank: async (req, res) => {
        try {
            const bank = await Bank.findById(req.body._id);
            await bank.updateOne({ $set: req.body });
            return res.status(200).json("Update successfully");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    deleteBank: async (req, res) => {
        try {
            await BankAccount.updateMany(
                { bankId: req.body._id },
                {
                    bankId: null
                })
            
            const bank = await Bank.findByIdAndDelete(req.body._id);
            return res.status(200).json("Delete successfully")
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = bankController;