const userModel = require("../models/user.model")
const generateAuthToken = require("../config/jwt.config")

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

module.exports = {signupController, loginController}