const SessionModel = require("../models/SessionModel");
const OnboardingCardModel = require("../models/OnboardingCardModel");
const SessionCardModel = require("../models/SessionCardModel"); // Assuming you have a model for the session cards
const { getAllDetails } = require("../utils/GetAllData");

// Get request method API
async function handleGetAllUsers(req, res) {
    getAllDetails(req, res, SessionModel);
}

async function handleCreateUser(req, res) {
    const {
        TitleEn,
        Title,
        Searchable,
        Hidden,
        Free,
        New,
        Updated,
        Testable,
        HideSessionRating,
        ImageURL,
        HighResImgURL,
        ImageURLV2,
        HighResImgURLV2,
        DescriptionEn,
        DescriptionDe,
        ShortDescriptionEn,
        ShortDescriptionDe,
        BenefitEn,
        BenefitDe,
        Duration,
        EquipmentEn,
        EquipmentDe,
        TagForMindShineV1,
        TagForMindShineV2,
        TagsV2,
        SessionCardId
    } = req.body;

    try {
        const newSession = await SessionModel.create({
            TitleEn,
            Title,
            Searchable,
            Hidden,
            Free,
            New,
            Updated,
            Testable,
            HideSessionRating,
            ImageURL,
            HighResImgURL,
            ImageURLV2,
            HighResImgURLV2,
            DescriptionEn,
            DescriptionDe,
            ShortDescriptionEn,
            ShortDescriptionDe,
            BenefitEn,
            BenefitDe,
            Duration,
            EquipmentEn,
            EquipmentDe,
            TagForMindShineV1,
            TagForMindShineV2,
            TagsV2,
            SessionCardId
        });

        return res.status(200).json({ status: "Successfully added to the card schema and funnel", newSession });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Error creating session", error: error.message });
    }
}

async function handleDeleteUserById(req, res) {
    try {
        // Find and delete the session
        const deletedSession = await SessionModel.findByIdAndDelete(req.params.id);

        if (!deletedSession) {
            return res.status(404).json({ error: "Session not found" });
        }

        // Find and delete related session cards
        await SessionCardModel.deleteMany({ _id: { $in: deletedSession.SessionCardId } });

        // Update onboarding cards to remove references to the deleted session
        await OnboardingCardModel.updateMany(
            { "OnboardingOptions.SessionID": req.params.id },
            { $pull: { "OnboardingOptions.SessionID": req.params.id } }
        );

        return res.status(200).json({ status: "Session deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Error deleting session", error: error.message });
    }
}


async function handleUpdateUserById(req, res) {
    try {
        const changes = req.body;
        const updatedUser = await SessionModel.findByIdAndUpdate(req.params.id, changes, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ status: "User not found" });
        }
        return res.status(200).json({ status: "User updated successfully", updatedUser });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ error: "Error updating user" });
    }
}

module.exports = {
    handleCreateUser,
    handleUpdateUserById,
    handleDeleteUserById,
    handleGetAllUsers
};
