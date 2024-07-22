const express = require("express");
const { handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById } = require("../controller/UsersController");

const userrouter = express.Router();

userrouter.get("/", handleGetAllUsers);
userrouter.post("/", handleCreateUser);
userrouter.patch("/:_id", handleUpdateUserById);
userrouter.delete("/:id", handleDeleteUserById);

module.exports = userrouter;
