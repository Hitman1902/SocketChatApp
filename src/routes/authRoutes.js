const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/auth.controller");
const validateRequest = require("../middleware/validateRequest");
const authSchema = require("../validator/auth.validator");
router.post("/register", validateRequest(authSchema), register);
router.post("/login", validateRequest(authSchema), login);

module.exports = router;
