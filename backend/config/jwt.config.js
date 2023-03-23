const jwt = require("jsonwebtoken");

require("dotenv").config();

const generateAuthToken = function (user) {
    const token = jwt.sign({ 
        id: user._id, 
        email: user.email, 
    }, process.env.JWT_SECRET);
    return token;
}

module.exports = generateAuthToken