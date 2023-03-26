const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const positionSchema = new Schema({
    lastPosition: Number,
    userId: {
        type: String,
        required: true,
    },
});

const positionModel = mongoose.model("Position", positionSchema);
module.exports = positionModel;