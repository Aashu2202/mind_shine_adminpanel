const SessionCardModel = require("../models/SessionCardModel.js")
const OnboardingCard = require("../models/OnboardingCardModel.js")

async function createSession(req,res){
    const body = req.body

    const newSession = await SessionCardModel.create({
        Heading: body.Heading
    })
    return res.status(200).json({ status: "Scuccessfully added to the card schema and funnel", newSession })
}

async function deleteSession(req,res){
    const session = await SessionCardModel.findById(req.params.id)

    session.OnboardingCardDetails.forEach(async (card) => {
        // console.log(card);
        const onboardCard = await OnboardingCard.findById(card.OnboardingCardId)
        console.log(onboardCard);
        const option = await OnboardingCard.findById(onboardCard.OnboardingOptions)
        // console.log(option);
    })
    return res.json(session)
}

module.exports = {
    createSession,
    deleteSession
}