const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, address } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ name, email, password, address });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

   // const payload = { user: { id: user.id } };
   // const token = jwt.sign(payload, "Shashank", { expiresIn: '1h' });

    res.status(201).json({ message:"Register Succesfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, "Shashank", { expiresIn: '1h' });
    res.status(200).json({ message:"Login Successfully",token });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerUser, loginUser };
