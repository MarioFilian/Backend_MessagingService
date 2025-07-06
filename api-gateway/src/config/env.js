const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  HOST_AUTH: process.env.HOST_AUTH || 'localhost',
  PORT_VALIDATE: process.env.PORT_VALIDATE,
  PORT_LOGIN: process.env.PORT_LOGIN,
  PORT_REGISTER: process.env.PORT_REGISTER,
};
