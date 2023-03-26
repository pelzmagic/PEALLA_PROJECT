const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const cardSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const cardModel = mongoose.model("Card", cardSchema);
module.exports = cardModel;