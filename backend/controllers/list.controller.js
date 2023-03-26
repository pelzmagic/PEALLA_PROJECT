const listModel = require("../models/list.model");
const positionModel = require("../models/position.model");

const createList = async (req, res, next) => {
    try {
        const { title } = req.body;
        const user = req.user;
        let position;
        let list;
        let mylist = await positionModel
            .findOneAndUpdate(
                { userId: user.id },
                { $inc: { lastPosition: 1 } },
                { new: true }
            )
            .then(async (data) => {
                if (data === null) {
                    const newPos = new positionModel({
                        userId: user.id,
                        lastPosition: 1,
                    });
                    newPos.save();

                    position = 1;
                } else {
                    position = data.lastPosition;
                }
                list = await listModel.create({
                    title: title,
                    userId: user.id,
                    position: position,
                });
            });
        return res.status(200).json({
            success: true,
            message: "list created",
            list: list,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const updateList = async (req, res, next) => {
    try {
        const title = req.body.title;
        const position = req.body.position;
        const id = req.params.id;
        const user = req.user;
        let list;
        let firstPosition;

        if (position) {
            let firstList = await listModel.findOne({
                position: position,
                userId: user.id,
            });
            firstPosition = firstList.position;
            let secondList = await listModel.findOne({
                _id: id,
                userId: user.id,
            });
            secondPosition = secondList.position;

            if (firstList && secondList) {
                let my = await listModel
                    .findByIdAndUpdate(
                        { _id: firstList._id },
                        { position: secondPosition },
                        { new: true }
                    )
                    .then(async () => {
                        list = await listModel.findByIdAndUpdate(
                            { _id: id },
                            { position: firstPosition },
                            { new: true }
                        );
                    });
            } else {
                return res.status(400).json({
                    message: "List does not exist",
                    success: false,
                });
            }
        }
        if (title) {
            list = await listModel.findOneAndUpdate(
                { _id: id, userId: user.id },
                { title: title }
            );
        }
        return res.status(200).json({
            success: true,
            message: "list updated",
            list: list,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const getListById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = req.user;

        const list = await listModel
            .findOne({ _id: id, userId: user.id })
            .populate("cards", "-__v");
        return res.status(200).json({
            success: true,
            message: "list found",
            list: list,
        });
    } catch (error) {
        return res.status(400).json({
            message: "An error occured",
            success: false,
        });
    }
};

const getAllLists = async (req, res, next) => {
    try {
        const user = req.user;
        const lists = await listModel
            .find({ userId: user.id })
            .populate("cards", "-__v")
            .sort({ position: 1 });
        return res.status(200).json({
            success: true,
            message: "lists found",
            list: lists,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const deleteList = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = req.user;

        await listModel.findOneAndDelete({ _id: id, userId: user.id });
        return res.status(200).json({
            success: true,
            message: "list deleted",
        });
    } catch (error) {
        return res.status(400).json({
            message: "An error occured",
            success: false,
        });
    }
};
module.exports = {
    createList,
    updateList,
    deleteList,
    getAllLists,
    getListById,
};