const express = require('express');
const router = express.Router();

const { getNbaScores } = require('../controllers/nbaController');
const { getNflScores } = require('../controllers/nflController');

// nba scores route
router.post('/nba', getNbaScores);

// nfl scores route
router.post('/nfl', getNflScores);

module.exports = router;
