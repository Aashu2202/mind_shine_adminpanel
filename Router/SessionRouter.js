const express = require("express");
const {handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById} = require("../controller/SessionController")

const sessionRouter = express.Router()

sessionRouter.get("/", handleGetAllUsers);
sessionRouter.post("/", handleCreateUser);
sessionRouter.patch("/:_id", handleUpdateUserById);
sessionRouter.delete("/:id", handleDeleteUserById);


module.exports = sessionRouter