const { ObjectId } = require("mongodb");
const cardModel = require("../models/card.model");
const listModel = require("../models/list.model");

const createCard = async (req, res, next) => {
    try {
        const { listId, text } = req.body;
        const user = req.user;
        let myCard = await cardModel
            .create({ text: text })
            .then(async (data) => {
                await listModel.findByIdAndUpdate(listId, {
                    $push: { cards: data },
                });
            });

        return res.status(200).json({
            success: true,
            message: "card added",
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const deleteCard = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { listId } = req.body;
        const user = req.user;

        let card = await cardModel.findOneAndDelete({ _id: id });
        let list = listModel.findById({ _id: listId });
        list.then(async (data) => {
            const index = data.cards.findIndex((curr) => {
                return curr.valueOf() === id;
            });
            let newId = new ObjectId(id);
            if (index !== -1) {
                await listModel.findByIdAndUpdate(listId, {
                    $pull: { cards: newId },
                });
            }
        });
        return res.status(200).json({
            success: true,
            message: "card deleted",
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const updateCard = async (req, res, next) => {
    try {
        const { text } = req.body;
        const id = req.params.id;
        const user = req.user;
        let myCard = await cardModel.findOneAndUpdate(id, { text: text });

        return res.status(200).json({
            success: true,
            message: "card updated",
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};
module.exports = { createCard, deleteCard, updateCard };