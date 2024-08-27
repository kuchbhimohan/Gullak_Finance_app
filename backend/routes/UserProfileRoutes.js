const express = require('express');
const router = express.Router();
const UserProfileController = require('../controller/UserProfileController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, UserProfileController.createUserProfile);
router.get('/', authMiddleware, UserProfileController.getUserProfile);
router.put('/', authMiddleware, UserProfileController.updateUserProfile);

module.exports = router;