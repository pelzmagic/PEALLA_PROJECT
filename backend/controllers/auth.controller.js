const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const tokenModel = require("../models/token.model")
const generateAuthToken = require("../config/jwt.config")
const sendEmail = require("../utils/email/sendEmail");

const clientURL = process.env.CLIENT_URL;

const signupController = async (req, res, next)=>{
    try {

        const userPayload = req.body
        const checkUser = await userModel.findOne({email:userPayload.email})
        if(checkUser){
            return res.status(401).json({
                success: false,
                message:"User with this email already exists"
            })
        }
        const userDetails = await userModel.create(userPayload)
        return res.status(200).json({
            success: true,
            message:"User created",
            user: userDetails
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"An error occured",
        })
    }
}

const loginController = async (req, res, next)=>{
    try {
        const userPayload = req.body
        

        const userData = await userModel.findOne({email: userPayload.email})

        if(!userData){
            return res.status(401).json({
                success: false,
                message:"User does not exist"
            })
        }

        const validate = await userData.isValidPassword(userPayload.password)

        if(!validate){
            return res.status(401).json({
                success: false,
                message:"Password incorrect"
            })  
        }
        const token = generateAuthToken(userData)

        return res.status(200).json({
            success: true,
            message:"Login successful",
            user: userData,
            token: token
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"An error occured",
        })
    }
}

const requestPasswordResetController = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await userModel.findOne({ email: payload.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User with this email does not exist",
      });
    }
  
    let token = await tokenModel.findOne({ userId: user._id });

    if (token) await token.deleteOne();
  
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, 10);
  
    const toks = await tokenModel.create({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    });
  
    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
    console.log('link', link)
  
    sendEmail(
      user.email,
      "Password Reset Request",
      {
        name: user.username,
        link: link,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
      link: link,
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "An error occured",
    });
  }

};


const resetPasswordController = async (userId, token, password) => {
  let passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }

  console.log(passwordResetToken.token, token);

  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }

  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await userModel.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await User.findById({ _id: userId });

  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  );

  await passwordResetToken.deleteOne();

  return { message: "Password reset was successful" };
};

module.exports = {
    signupController,
    loginController,
    requestPasswordResetController,
    resetPasswordController
}