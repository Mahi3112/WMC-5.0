// routes/member.js
const express = require('express');
const router = express.Router();
const { isMember } = require('../middlewares/isMember');
const { jwtAuthMiddleware } = require('../jwt');
const eventController = require('../controllers/MemberRegisterController');
router.use(jwtAuthMiddleware)
// Member routes

router.get('/registered-events/:id',eventController . getRegisteredEvents);
router.post('/register/:id', isMember, eventController.registerEvent);

module.exports = router;
