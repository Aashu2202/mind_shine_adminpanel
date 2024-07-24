const express = require("express");
const {handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById} = require("../controller/SessionCardController")

const sessionCardRouter = express.Router()

sessionCardRouter.get("/", handleGetAllUsers);
sessionCardRouter.post("/", handleCreateUser);
sessionCardRouter.patch("/:_id", handleUpdateUserById);
sessionCardRouter.delete("/:id", handleDeleteUserById);


module.exports = sessionCardRouter