const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// PUT /api/user/:id/reset (Protected Route)
router.put('/:id/reset', authMiddleware, userController.resetPassword);

module.exports = router;
