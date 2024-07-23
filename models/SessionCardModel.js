const mongoose = require("mongoose");
const OnboardingCardModel = require("./OnboardingCardModel");

const SessionSchema = new mongoose.Schema({
    OnboardingCardDetails: [
        {
            OnboardingCardId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OnboardingCard",
                default: null
            },
            OnboardingOptionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OnboardingCard.OnboardingOptions",
                default: null
            }
        },
    ],
    Heading: {
        type: String
    }
}, { timestamps: true })

const SessionCardModel = mongoose.model("Session", SessionSchema);

module.exports = SessionCardModel;