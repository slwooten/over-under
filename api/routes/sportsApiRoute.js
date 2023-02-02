const express = require('express');
const router = express.Router();

// nba controllers
const { getNbaScores } = require('../controllers/nbaController');
const { getNbaUpcoming } = require('../controllers/nbaUpcomingController');
const { getNbaPlayer } = require('../controllers/nbaPlayerController');

// nfl controllers
const { getNflScores } = require('../controllers/nflController');

// nba routes
router.post('/nba', getNbaScores);
router.post('/nba/upcoming', getNbaUpcoming);
router.post('/nba/player', getNbaPlayer)

// nfl route
router.post('/nfl', getNflScores);

module.exports = router;
