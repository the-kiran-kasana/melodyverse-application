const express = require('express');
const { getPosts } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getPosts);

module.exports = router;
