const express = require('express')
const router = express.Router()
const { sendMessage } = require('../controller/message.controller')
const authenticateToken = require('../middleware/authMiddleware')
const validateRequest = require('../middleware/validateRequest')
const authSchema = require('../validator/auth.validator')
router.post('/', authenticateToken, sendMessage)

module.exports = router
