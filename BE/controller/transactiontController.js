const Transaction = require('../models/TransactionSchema')
const BankAccount = require('../models/BankAccount')

const transactionController = {
    addTransaction: async (req, res) => {
        try {
            const newtransaction = new Transaction(req.body);

            const savedTransaction = await newtransaction.save();
            if (req.body.user) {
                const bankaccount = BankAccount.findById(req.body.bankAccount);
                await bankaccount.updateOne({ $push: { bankAccount: savedTransaction._id } })
            }
            return res.status(200).json(savedTransaction);
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }
    },
    getAllTransaction: async (req, res) => {
        try {
            const bankAccount = await Transaction.find().populate('bankAccount bankAccountAdmin gameProduct user status');
            return res.status(200).json(bankAccount)
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }
    },
    getById: async (req, res) => {
        try {
            const transaction = await Transaction.findById(req.params.id);
            return res.status(200).json(transaction);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    getByUserId: async (req, res) => {
        try {
            const transaction = await Transaction.find({ user: req.params.id }).populate('bankAccount');
            return res.status(200).json(transaction);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    updateTransaction: async (req, res) => {
        try {
            const transaction = await Transaction.findById(req.body._id);
            await transaction.updateOne({ $set: req.body });
            return res.status(200).json("Update successfully");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    deleteTransaction: async (req, res) => {
        try {
            const transaction = await Transaction.findByIdAndDelete(req.body._id);
            return res.status(200).json("Delete successfully")
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = transactionController;