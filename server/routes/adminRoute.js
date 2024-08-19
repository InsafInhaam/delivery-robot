const express = require('express');
const { Adminlogin, createAdmin } = require('../controllers/adminController');
const router = express.Router(); 

router.route('/login').post(Adminlogin);
router.route('/create-admin').post(createAdmin);
// router.route('/all-admin').post(login);
// router.route('/delete-admin').post(login);

module.exports = router;

