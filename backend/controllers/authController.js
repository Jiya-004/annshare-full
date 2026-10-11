const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// REGISTER a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, organization, orgName, phone, location, docs } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const normalizedRole = role === 'ngos' || role === 'ngo' ? 'ngo' : role === 'admin' ? 'admin' : 'donor';
    const finalOrg = organization || orgName || name || '';

    const user = await User.create({
      name: (name || '').trim(),
      email: cleanEmail,
      password,
      role: normalizedRole,
      organization: finalOrg,
      orgName: finalOrg,
      phone: phone || '',
      location: location || 'Kathmandu, Nepal',
      badge: normalizedRole === 'donor' ? 'Verified Food Donor' : normalizedRole === 'ngo' ? 'Verified Community NGO' : 'System Admin',
      avatarText: (name && name[0] ? name[0] : 'U').toUpperCase(),
      verificationStatus: normalizedRole === 'ngo' ? 'pending' : 'verified',
      docs: docs || [],
    });

    res.status(201).json({
      _id: user._id,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      organization: user.organization,
      orgName: user.orgName,
      phone: user.phone,
      location: user.location,
      badge: user.badge,
      avatar: user.avatar,
      avatarText: user.avatarText,
      verificationStatus: user.verificationStatus,
      status: user.status,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// LOGIN existing user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    const user = await User.findOne({ email: cleanEmail });

    if (user && (await user.matchPassword(cleanPassword))) {
      res.status(200).json({
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization || user.orgName,
        orgName: user.orgName || user.organization,
        phone: user.phone,
        location: user.location,
        badge: user.badge,
        avatar: user.avatar,
        avatarText: user.avatarText,
        verificationStatus: user.verificationStatus,
        status: user.status,
        docs: user.docs,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET current authenticated user profile
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE current user profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, organization, orgName, phone, location, avatar } = req.body;
    if (name) user.name = name;
    if (organization !== undefined || orgName !== undefined) {
      user.organization = organization || orgName || '';
      user.orgName = organization || orgName || '';
    }
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;
    if (avatar !== undefined) user.avatar = avatar;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      organization: updatedUser.organization,
      orgName: updatedUser.orgName,
      phone: updatedUser.phone,
      location: updatedUser.location,
      badge: updatedUser.badge,
      avatar: updatedUser.avatar,
      avatarText: updatedUser.avatarText,
      verificationStatus: updatedUser.verificationStatus,
      status: updatedUser.status,
      token: generateToken(updatedUser._id),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ADMIN: GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    const formatted = users.map((u) => ({
      id: u._id.toString(),
      _id: u._id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      orgName: u.orgName || u.organization || u.name,
      organization: u.organization || u.orgName || u.name,
      location: u.location,
      joinedDate: u.joinedDate,
      verificationStatus: u.verificationStatus,
      status: u.status,
      avatarText: u.avatarText || (u.name ? u.name[0].toUpperCase() : 'U'),
      totalDonations: u.totalDonations,
      completedDonations: u.completedDonations,
      activeDonations: u.activeDonations,
      totalRequests: u.totalRequests,
      completedPickups: u.completedPickups,
      docs: u.docs || [],
    }));
    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN: UPDATE user status / verification
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, verificationStatus } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (status) user.status = status;
    if (verificationStatus) user.verificationStatus = verificationStatus;

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ADMIN: VERIFY NGO
const verifyNGO = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'NGO User not found' });
    }

    user.verificationStatus = 'verified';
    if (user.docs && user.docs.length > 0) {
      user.docs = user.docs.map((d) => ({
        ...d.toObject(),
        status: 'verified',
      }));
    }
    await user.save();
    res.status(200).json({ message: 'NGO verified successfully', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// CHANGE PASSWORD
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, email, userId } = req.body;
    const cleanCurrent = (currentPassword || '').trim();
    const cleanNew = (newPassword || '').trim();

    if (!cleanCurrent || !cleanNew) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (cleanNew.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long' });
    }

    let user = null;
    if (req.user && req.user._id) {
      user = await User.findById(req.user._id);
    }
    if (!user && (userId || req.user?.id)) {
      user = await User.findById(userId || req.user.id);
    }
    if (!user && email) {
      user = await User.findOne({ email: String(email).trim().toLowerCase() });
    }

    if (!user) {
      return res.status(404).json({ message: 'User account not found' });
    }

    const isMatch = await user.matchPassword(cleanCurrent);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = cleanNew;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Password updated successfully in database!',
      token,
      user: {
        id: user._id.toString(),
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        orgName: user.orgName || user.organization,
        organization: user.organization || user.orgName,
        phone: user.phone,
        location: user.location,
        avatar: user.avatar,
        avatarText: user.avatarText,
        badge: user.badge,
        verificationStatus: user.verificationStatus,
        status: user.status,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update password: ' + err.message });
  }
};

// ADMIN: DELETE user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
  getAllUsers,
  updateUserStatus,
  verifyNGO,
  deleteUser,
};