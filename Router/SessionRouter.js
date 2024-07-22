const express = require("express");
const {createSession} = require("../controller/SessionController")

const sessionRouter = express.Router()

sessionRouter.post('/', createSession)

module.exports = sessionRouter