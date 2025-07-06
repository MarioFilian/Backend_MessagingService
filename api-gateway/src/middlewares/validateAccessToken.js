const axios = require('axios');
const { PORT_VALIDATE, HOST_AUTH } = require('../config/env');

const validateAccessToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access token faltante' });
  }

  try {
    const response = await axios.post(
      `http://${HOST_AUTH}:${PORT_VALIDATE}/validate/access`,
      { accessToken: token }
    );

    if (response.data.valid === true) {
      next();
    } else {
      res.status(401).json({ error: 'Access token inválido' });
    }
  } catch (err) {
    console.error('❌ Error validando token:', err.message);
    res.status(500).json({ error: 'Error validando token' });
  }
};

module.exports = validateAccessToken;
