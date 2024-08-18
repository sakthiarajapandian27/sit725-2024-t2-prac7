// controllers/queryController.js
const User = require('../models/userModel');

exports.postQuery = async (req, res) => {
    const { firstName, lastName, emailId, phoneNumber, query } = req.body;
    const user = new User({ firstName, lastName, emailId, phoneNumber, query });
    const savedUser = await user.save();
    res.json({ message: 'data inserted successfully', savedUser });
};

exports.getQueries = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        return res.status(500).json({ message: 'error retrieved in getting users' });
    }
};
