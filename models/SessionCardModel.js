const mongoose = require("mongoose")

const SessionSchema = new mongoose.Schema({
    OnboardingOptionId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OnboardingCard.OnboardingOptions",
            default: null
        }
    ],
    Heading: {
        type: String
    }
}, {timestamps: true})

const SessionCardModel = mongoose.model("Session", SessionSchema);

module.exports = SessionCardModel;