const express = require('express');

const { isAuth } = require('../controllers/auth');
const { createSurvey, takeSurvey, getSurvey } = require('../controllers/survey');

const router = express.Router();

router.get('/:id', isAuth, getSurvey);
router.post('/:id', isAuth, takeSurvey);
router.post('/', isAuth, createSurvey);

module.exports = router;