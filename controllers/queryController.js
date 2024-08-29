import User from '../models/userModel.js';  

export const postQuery = async (req, res) => {
    const { firstName, lastName, emailId, phoneNumber, query } = req.body;
  
    if (firstName ==='' && lastName=== '' && emailId === '' && phoneNumber ==='' && query === '') {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const user = new User({ firstName, lastName, emailId, phoneNumber, query });
        const savedUser = await user.save();
        res.status(201).json({ message: 'Data inserted successfully', savedUser });
    } catch (err) {
        console.error('Error inserting data:', err.message);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

export const getQueries = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        return res.status(500).json({ message: 'Error retrieving users' });
    }
};
