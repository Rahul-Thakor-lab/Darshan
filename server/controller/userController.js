const mUSER = require("../models/User");

let updateProfile = async (req, res) => {
    const email = req.params.Email;
    const { name } = req.body;
    try {
        const user = await mUSER.findOneAndUpdate({ email }, { name }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ Name: user.name, Email: user.email, Role: user.role });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

let updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, email, role } = req.body;
    try {
        const user = await mUSER.findByIdAndUpdate(id, { name, email, role }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ Name: user.name, Email: user.email, Role: user.role });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



let createUser = async (req, res) => {
    const { email, name,role } = req.body;
    try {
        const newUser = new mUSER({ email, name,role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

let getAllUsers = async (req, res) => {
    try {
        const users = await mUSER.aggregate([{
            $project: {
                _id: "$_id",
                Name: "$name",
                Email: "$email",
                Role: "$role"
            }
        }
        ]);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

let deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await mUSER.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { createUser, updateProfile, getAllUsers,updateUser,deleteUser};