const UserProfile = require('../models/UserProfile');

exports.createUserProfile = async (req, res) => {
  try {
    const { 
      name, 
      dateOfBirth, 
      gender, 
      country, 
      state, 
      aadhaarNumber, 
      bankName, 
      ifscCode, 
      accountNumber, 
      cardNumber,
      currentBalance 
    } = req.body;

    const userProfile = new UserProfile({
      user: req.user._id,
      name,
      dateOfBirth,
      gender,
      country,
      state,
      aadhaarNumber,
      bankName,
      ifscCode,
      accountNumber,
      cardNumber,
      currentBalance
    });

    await userProfile.save();
    res.status(201).json({ message: 'User profile created successfully', profile: userProfile });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user profile', error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ user: req.user._id });
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { 
      name, 
      dateOfBirth, 
      gender, 
      country, 
      state, 
      aadhaarNumber, 
      bankName, 
      ifscCode, 
      accountNumber, 
      cardNumber 
    } = req.body;
    
    const updateData = { 
      name, 
      dateOfBirth, 
      gender, 
      country, 
      state, 
      aadhaarNumber, 
      bankName, 
      ifscCode, 
      accountNumber, 
      cardNumber 
    };

    const userProfile = await UserProfile.findOneAndUpdate(
      { user: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.status(200).json({ message: 'User profile updated successfully', profile: userProfile });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
};