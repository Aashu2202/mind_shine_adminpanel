const express = require("express");
const { handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById } = require("../controller/FunnelController");

const FunnelRouter = express.Router();

FunnelRouter.get("/", handleGetAllUsers);
FunnelRouter.post("/", handleCreateUser);
FunnelRouter.patch("/:_id", handleUpdateUserById);
FunnelRouter.delete("/:id", handleDeleteUserById);

module.exports = FunnelRouter;
