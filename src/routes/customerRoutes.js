const router = require('express').Router();
const auth = require('../middleware/auth');
const c = require('../controllers/customerController');

router.use(auth); // ella customer routes ku login venum

router.get('/', c.list);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.remove);

module.exports = router;
