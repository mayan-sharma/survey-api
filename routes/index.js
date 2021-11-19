const express = require('express');

const authRouter = require('./auth');
const imageRouter = require('./image');
const surveyRouter = require('./survey');

const router = express.Router();

router.use('/', authRouter);
router.use('/image', imageRouter);
router.use('/survey', surveyRouter);

module.exports = router;