const authService = require('../services/auth.service');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const tokens = await authService.authenticateUser(username, password);
    return res.status(200).json(tokens);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { login };
