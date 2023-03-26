const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const listSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
        position: Number,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const listModel = mongoose.model("List", listSchema);
module.exports = listModel;