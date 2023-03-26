const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const {
    createList,
    updateList,
    deleteList,
    getListById,
    getAllLists,
} = require("../controllers/list.controller");

const listRouter = express.Router();

listRouter.post("/", verifyToken, createList);
listRouter.get("/", verifyToken, getAllLists);
listRouter.put("/:id", verifyToken, updateList);
listRouter.delete("/:id", verifyToken, deleteList);
listRouter.get("/:id", verifyToken, getListById);

module.exports = listRouter;