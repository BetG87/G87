const Transaction = require('../models/TransactionSchema')
const BankAccount = require('../models/BankAccount')
const { ObjectId } = require('mongodb');
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
    }, checkTransactionStatus: async (req, res) => {
        try {

            const result = await Transaction.aggregate([
                {
                    $lookup: {
                        from: "status",
                        localField: "status",
                        foreignField: "_id",
                        as: "statusInfo"
                    }
                },
                {
                    $match: {
                        "type": req.body.type,
                        "user": new ObjectId(req.body.user),
                        "statusInfo.name": "Chờ xử lý",
                        "isActive": true
                    }
                },
                {
                    $group: {
                        _id: req.body.user,
                        count: { $sum: 1 }
                    }
                }
            ]);

            console.log(result[0].count >= 2)
            if (result[0].count >= 2) {
                res.status(200).json(true);
            } else {
                res.status(200).json(false);
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = transactionController;