const express = require("express");
const { handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById } = require("../controller/OnboardingCardController");

const onboardrouter = express.Router();

onboardrouter.get("/", handleGetAllUsers);
onboardrouter.post("/", handleCreateUser);
onboardrouter.patch("/:_id", handleUpdateUserById);
onboardrouter.delete("/:id", handleDeleteUserById);

module.exports = onboardrouter;
