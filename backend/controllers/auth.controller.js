const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res) => {
  const { username, usermail, usercontact, role, password } = req.body;

  try {
    const existing = await User.findOne({ usercontact });
    if (existing) return res.status(400).json({ msg: 'Mobile number already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, usermail, usercontact, role, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};

// Login
exports.login = async (req, res) => {
  const { usercontact, password } = req.body;

  try {
    const user = await User.findOne({ usercontact });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token, role: user.role, username: user.username });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
};
