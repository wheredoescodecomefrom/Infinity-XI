const User = require('../models/User');

exports.discordLogin = async (req, res) => {
  try {
    const { discordId, username, avatar } = req.body;
    let user = await User.findOne({ discordId });
    if (!user) {
      user = await User.create({
        userId: discordId,
        username,
        userPfp: avatar,
        email: `${discordId}@discord.com` // Assuming a placeholder email
      });
    }
    // Assuming some form of token generation for the user
    const token = generateToken(user);
    res.status(200).json({
      message: 'User logged in successfully',
      token,
      user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in with Discord',
      error: error.message
    });
  }
};

exports.discordLogout = async (req, res) => {
  try {
    // Assuming some form of token generation for the user
    const token = generateToken(user);
    res.status(200).json({
      message: 'User logged out successfully',
      token
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error logging out with Discord',
      error: error.message
    });
  }
}

exports.discordCallback = async (req, res) => {
  try {
    // Assuming some form of token generation for the user
    const token = generateToken(user);
    res.status(200).json({
      message: 'User logged in successfully',
      token
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in with Discord',
      error: error.message
    });
  }
}