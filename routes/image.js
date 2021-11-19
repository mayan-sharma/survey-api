const express = require('express');

const { resize } = require('../controllers/image');

const router = express.Router();

router.get('/', resize);

module.exports = router;