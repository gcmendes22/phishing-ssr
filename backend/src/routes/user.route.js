const express = require("express")
const auth = require("../middleware/auth")
const asyncMiddleware = require("../middleware/async")
const userController = require("../controllers/user.controller")

const router = express.Router()

router.get("/users/me", auth, asyncMiddleware(userController.getCurrentUser))
router.post('/users/login',  asyncMiddleware(userController.login))
router.post("/users/signup", asyncMiddleware(userController.signup))
router.post('/users/confirm-login',  asyncMiddleware(userController.confirmLogin))

router.post("/phishing-sms", asyncMiddleware(userController.phishingSMS))
router.post("/phishing-email", asyncMiddleware(userController.phishingEmail))

module.exports = router