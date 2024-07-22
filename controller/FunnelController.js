const FunnelModel = require("../models/FunnelModel");
const OnboardingCardModel = require("../models/OnboardingCardModel");
const {deleteUserById} = require("../utils/DeleteOnBoardCard");
// Get request method API
async function handleGetAllUsers(req, res) {
    try {
        const allDbUsers = await FunnelModel.find({});
        return res.json(allDbUsers);
    } catch (error) {
        console.error("Error in GET request:", error);
        return res.status(500).json({ status: "Something went wrong in GET request" });
    }
}

// Post method API
async function handleCreateUser(req, res) {
    const {Name, Link, DeepLink, SignUpType, FreePeriod, Partner, FunnelDescription, OnboardingCards } = req.body;

    console.log(Name, Link, DeepLink, SignUpType, FreePeriod, Partner, FunnelDescription, OnboardingCards);
    if (!Name || !Link || !DeepLink || !SignUpType) {
        return res.status(400).json({ error: "Email, name, and password are required" });
    }

    try {
        const newUser = await FunnelModel.create({
            Name,
            Link,
            DeepLink,
            SignUpType,
            FreePeriod,
            Partner,
            FunnelDescription,
            OnboardingCards,
        });
        return res.status(200).json({ status: "Successfully added to the user schema", newUser });
    } catch (err) {
        console.error("Error in POST request:", err);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

// Update the user data
async function handleUpdateUserById(req, res) {
    try {
        const changes = req.body;
        const updatedUser = await FunnelModel.findByIdAndUpdate(req.params._id, changes, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ status: "User not found" });
        }
        return res.status(200).json({ status: "User updated successfully", updatedUser });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ error: "Error updating user" });
    }
}

// Delete user
async function handleDeleteUserById(req, res) {
    try {
        const cardData = await FunnelModel.findById(req.params.id);
        cardData.OnboardingCards.forEach(async (card) => {
            await deleteUserById(OnboardingCardModel ,card._id);
        })
        const deletedUser = await FunnelModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json({ status: "Success" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Error deleting user" });
    }
}

module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleUpdateUserById,
    handleDeleteUserById,
};
