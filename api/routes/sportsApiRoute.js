const express = require('express');
const router = express.Router();

// previous games controllers
const { getNbaScores } = require('../controllers/nbaController');
const { getNflScores } = require('../controllers/nflController');

// upcoming game controllers
const { getNbaUpcoming } = require('../controllers/nbaUpcomingController');

// nba scores route
router.post('/nba', getNbaScores);
router.post('/nba/upcoming', getNbaUpcoming);

// nfl scores route
router.post('/nfl', getNflScores);

module.exports = router;
