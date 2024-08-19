const express = require('express');
const { createRobot, viewRobot, deleteRobot, getLidStatus, updateLid } = require('../controllers/robotController');
const router = express.Router();

router.route('/create-robot').post(createRobot);
router.route('/robots').get(viewRobot);
router.route('/delete-robots/:id').delete(deleteRobot);

// codes goes for the robot
router.route('/lid').get(getLidStatus);
router.route('/lid').post(updateLid);

module.exports = router;

