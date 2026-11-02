const router = require('express').Router();

router.get('/health', require('../controllers/healthController').check);
router.use('/auth', require('./authRoutes'));
router.use('/customers', require('./customerRoutes'));
router.use('/offers', require('./offerRoutes'));

module.exports = router;
