const express = require("express");
const {handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById} = require("../controller/TrainingPlanController")

const trainingPlanRouter = express.Router()

trainingPlanRouter.get("/", handleGetAllUsers);
trainingPlanRouter.post("/", handleCreateUser);
trainingPlanRouter.patch("/:_id", handleUpdateUserById);
trainingPlanRouter.delete("/:id", handleDeleteUserById);


module.exports = trainingPlanRouter