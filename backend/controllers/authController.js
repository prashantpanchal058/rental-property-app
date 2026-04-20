const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Helper to generate JWT token
 * Uses secret and expiry from .env
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

/**
 * @desc    User Signup
 * @route   POST /api/auth/signup
 * @access  Public
 */
exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // 1. Basic Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    // 2. Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered',
      });
    }

    // 3. Create User 
    // Ensure the role string matches your frontend ('Tenant' or 'Property Owner')
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || 'Tenant', 
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    User Login
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find user and include password for verification
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if blocked by Admin
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been restricted by admin',
      });
    }

    // Verify password (assuming matchPassword is defined in User model)
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    console.log(user._id)
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Welcome back!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get Current User Profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update User Profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, phone, address, profilePicture } = req.body;

    // Force update specific fields only to avoid schema validation crashes
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { 
        $set: { 
          name, 
          phone, 
          address: address || "", 
          profilePicture 
        } 
      },
      { new: true, runValidators: false } // Bypasses password/email validation during update
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // ALWAYS send a response to stop the "Saving..." loop
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser 
    });

  } catch (error) {
    console.error("CRITICAL BACKEND ERROR:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Database Update Failed: " + error.message 
    });
  }
};