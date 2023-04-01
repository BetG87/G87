const User = require('../models/User');
const bcrypt = require('bcrypt')

const userController =
{
        //GET ALL USERS
    getAllUser: async (req, res) =>
        {
        try {
            const user = await User.find();

            return res.status(200).json(user)
        }
        catch (err) {
            return res.status(500).json(err)
        }
    },
    getById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate("bankAccounts gameAccounts gameProduct");

            return res.status(200).json(user)
        }
        catch (err) {
            return res.status(500).json(err)
        }
    },
    deletelUser: async (req, res) => {
        try {
            const user = await User.findById(req.body._id)
            user.isActive = false;
            user.save()
            return res.status(200).json("Delete successfuly")
        }
        catch (err) {
            return res.status(500).json(err)
        }
    },
    updateUser: async (req, res) => {
        try {
           
            const user = await User.findById(req.body._id);
            if (req.body.password != null) {
                    const salt = await bcrypt.genSalt(10);
                    const hashed = await bcrypt.hash(req.body.password, salt);
                    user.password = hashed;
            }

            if (req.body.email != null) {
                user.email = req.body.email;
            }

            if (req.body.bankAccounts != null) {
                user.bankAccounts = req.body.bankAccounts;
            }

            if (req.body.gameAccounts != null) {
                user.gameAccounts = req.body.gameAccounts;
            }
            if (req.body.gameProduct != null) {
                user.gameProduct = req.body.gameProduct;
            }

            if (req.body.status != null) {
                user.status = req.body.status;
            }
            const updatedUser = await user.save();
            return res.status(200).json(updatedUser);
        }
        catch (err) {
            return res.status(500).json(err)
        }
    },
}

module.exports = userController;