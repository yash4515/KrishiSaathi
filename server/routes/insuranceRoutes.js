const router = require('express').Router();
const { getPlans, getPlan, createPlan, updatePlan, deletePlan } = require('../controllers/insuranceController');
const { auth, authorize } = require('../middlewares/auth');
const { validateId, validateInsurance } = require('../middlewares/validate');

router.get('/', getPlans);
router.get('/:id', validateId, getPlan);
router.post('/', auth, authorize('admin'), validateInsurance, createPlan);
router.put('/:id', auth, authorize('admin'), validateId, updatePlan);
router.delete('/:id', auth, authorize('admin'), validateId, deletePlan);

module.exports = router;
