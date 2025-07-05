const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/sendController');

router.post('/', sendMessage);

module.exports = router;
