const tokenUtil = require('../utils/token');
const redis = require('../config/redis');

const authenticateUser = async (username, password) => {
  // 💡 Aquí deberías conectar a una base de datos en producción
  if (username !== 'admin' || password !== 'admin123') {
    throw new Error('Credenciales inválidas');
  }

  const accessToken = tokenUtil.generateAccessToken({ username });
  const refreshToken = tokenUtil.generateRefreshToken({ username });

  await redis.set(refreshToken, username);

  return { accessToken, refreshToken };
};

module.exports = { authenticateUser };
