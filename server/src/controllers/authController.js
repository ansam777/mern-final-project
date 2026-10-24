import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, bio } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please fill in all required fields.');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409);
      throw new Error('Email is already registered.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, bio });
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password.');
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error('Invalid credentials.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid credentials.');
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    next(error);
  }
};