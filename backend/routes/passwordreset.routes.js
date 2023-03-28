const express = require('express')
const requestPassowrdResetRouter = express.Router()
const { requestPasswordResetController } = require('../controllers/auth.controller')

requestPassowrdResetRouter.post("/", requestPasswordResetController);
// authRouter.post("/resetPassword", resetPasswordController);

module.exports = requestPassowrdResetRouter;