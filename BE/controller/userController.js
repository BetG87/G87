const { User, GameAccount, BankAccount, GameProduct } = require('../models');
const bcrypt = require('bcrypt')

const userController =
{
    //GET ALL USERS
    getAllUser: async (req, res) => {
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
    deletedUser: async (req, res) => {
        try {
            await GameAccount.updateMany(
                { user: req.params.id },
                {
                    user: null
                })
            await BankAccount.updateMany(
                { user: req.params.id },
                {
                    user: null
                })
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
            if (req.body.isActive != null) {
                user.isActive = req.body.isActive;
            }
            if (req.body.admin != null) {
                user.admin = req.body.admin;
            }
            if (req.body.numberPhone != null) {
                user.numberPhone = req.body.numberPhone;
            }
            if (req.body.fullName != null) {
                user.fullName = req.body.fullName;
            }
            const updatedUser = await user.save();
            return res.status(200).json(updatedUser);
        }
        catch (err) {
            return res.status(500).json(err)
        }
    }, changePassword: async (req, res) => {
        try {
            const user = await User.findById(req.body._id);

            const validPassword = await bcrypt.compare(
                req.body.oldPassword,
                user.password
            )
            if (!validPassword) {
                return res.status(404).json("Wrong password")
            }
            else {
                if (req.body.newPassword != null) {
                    const salt = await bcrypt.genSalt(10);
                    const hashed = await bcrypt.hash(req.body.newPassword, salt);
                    user.password = hashed;
                }
                const updatedUser = await user.save();
                return res.status(200).json("Change Password succcessfully");
            }

        }
        catch (err) {
            return res.status(500).json(err)
        }
    },
    usernameisexist: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (user) {
                console.log(req.body.username)
                return res.status(200).json({ isexist: true })

            }
            else {
                return res.status(200).json({ isexist: false })
            }

        }
        catch (err) {
            return res.status(500).json("abc");
        }
    },
    emailisexist: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(200).json({ isexist: true })
            }
            else {
                return res.status(200).json({ isexist: false })
            }

        }
        catch (err) {
            return res.status(500).json("abc");
        }
    }

}

module.exports = userController;