const express = require("express");
const {handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById} = require("../controller/TrainingModuleController")

const trainingModuleRouter = express.Router()

trainingModuleRouter.get("/", handleGetAllUsers);
trainingModuleRouter.post("/", handleCreateUser);
trainingModuleRouter.patch("/:_id", handleUpdateUserById);
trainingModuleRouter.delete("/:id", handleDeleteUserById);


module.exports = trainingModuleRouter