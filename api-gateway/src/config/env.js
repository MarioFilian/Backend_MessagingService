const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  HOST_VALIDATE: process.env.HOST_VALIDATE,
  PORT_VALIDATE: process.env.PORT_VALIDATE,
  HOST_LOGIN: process.env.HOST_LOGIN,
  PORT_LOGIN: process.env.PORT_LOGIN,
  HOST_REGISTER: process.env.HOST_REGISTER,
  PORT_REGISTER: process.env.PORT_REGISTER,
};
