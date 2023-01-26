const express = require('express');
const router = express.Router();

const { getScores } = require('../controllers/sportsApiController');

router.post('/go', getScores);

module.exports = router;
