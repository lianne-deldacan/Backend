const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = user.getJwtToken();
    console.log(token);

    res.status(200).json({
      message: 'Login successful',
      user,
      token,
    });
  } catch (err) {
    console.error('Error logging in user:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



exports.signupUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  try {
    if(firstName === "" || lastName === "" || email === "" || password === ""){
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({email:email});

    if(existingUser){
      return res.status(400).json({ message: 'Email is already registered' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const newUser = await user.save();

    const token = newUser.getJwtToken()
    console.log(token);

    return res.status(200).json({
      message: 'Signup successful',
      user: newUser,
      token,
    });
    
  } catch (err) {
    console.error('Error signing up user:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

