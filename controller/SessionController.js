const SessionCardModel = require("../models/SessionCardModel.js")
const OnboardingCard = require("../models/OnboardingCardModel.js")

async function createSession(req,res){
    const body = req.body

    const newSession = await SessionCardModel.create({
        Heading: body.Heading
    })

    return res.status(200).json({ status: "Scuccessfully added to the card schema and funnel", newSession })
}

module.exports = {
    createSession
}