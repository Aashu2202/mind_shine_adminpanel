const express = require("express");
const {createSession, deleteSession} = require("../controller/SessionController")

const sessionRouter = express.Router()

sessionRouter.post('/', createSession)
sessionRouter.delete('/:id', deleteSession)

module.exports = sessionRouter