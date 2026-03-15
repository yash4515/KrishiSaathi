const router = require('express').Router();
const { register, login, getMe, updateProfile } = require('../controllers/authController');
const { auth } = require('../middlewares/auth');
const { validateRegister, validateLogin, validateProfile } = require('../middlewares/validate');
const { authLimiter } = require('../middlewares/rateLimiter');

router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);
router.get('/me', auth, getMe);
router.put('/profile', auth, validateProfile, updateProfile);

module.exports = router;
