const rateLimit = require('express-rate-limit');

const accountLimiter = rateLimit({
	windowMs: 1440 * 60 * 1000, // 1 hour
	max: 15, // Limit each IP to 5 over-under/go requests per `window` (here, per hour)
	message:
		'Too many requests created from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  success: false,
});

module.exports = { accountLimiter };
