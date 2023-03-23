const express = require("express");
const {signupController, loginController} = require("../controllers/auth.controller")

const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);

module.exports = authRouter;