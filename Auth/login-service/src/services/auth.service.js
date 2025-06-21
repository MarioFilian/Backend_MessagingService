const tokenUtil = require('../utils/token');
const redis = require('../config/redis');
const db = require('../config/postgres');
const bcrypt = require('bcrypt');

const authenticateUser = async (username, password) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const result = await db.query(query, [username]);

  if (result.rowCount === 0) {
    throw new Error('Usuario no encontrado');
  }

  const user = result.rows[0];

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Contraseña incorrecta');
  }

  const payload = { username: user.username, role: user.role };
  const accessToken = tokenUtil.generateAccessToken(payload);
  const refreshToken = tokenUtil.generateRefreshToken(payload);

  await redis.set(refreshToken, user.username);

  return { accessToken, refreshToken };
};

module.exports = { authenticateUser };
