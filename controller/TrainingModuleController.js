const TrainingModuleModel = require("../models/TrainingModuleModel");
const { deleteUserById } = require("../utils/DeleteAllData");
const { getAllDetails } = require("../utils/GetAllData");
const TrainingPlanModel = require("../models/TrainingPlanModel")

// Get request method API
async function handleGetAllUsers(req, res) {
    getAllDetails(req, res, TrainingModuleModel);
}

// Post method API
async function handleCreateUser(req, res) {
    const {
        TitleEN,
        TitleDE,
        FullTitleEN,
        FullTitleDE,
        SubTitleEN,
        SubTitleDE,
        Hidden,
        TrainingItems,
        TrainingPlansId
    } = req.body;

    try {
        const newTrainingModule = await TrainingModuleModel.create({
            TitleEN,
            TitleDE,
            FullTitleEN,
            FullTitleDE,
            SubTitleEN,
            SubTitleDE,
            Hidden,
            TrainingItems,
            TrainingPlansId
        });
        if (TrainingPlansId) {
            const TrainingPlan = await TrainingPlanModel.findById(TrainingPlansId);
            if (!TrainingPlan) {
                return res.status(404).json({ error: "Training Plan not found" });
            }

            TrainingPlan.TrainingModulesId.push(newTrainingModule._id);
            await TrainingPlan.save();
        }
        return res.status(200).json({ status: "Successfully added to the training module schema", newTrainingModule });
    } catch (err) {
        console.error("Error in POST request:", err);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

// Update the user data
async function handleUpdateUserById(req, res) {
    try {
        const changes = req.body;
        const updatedUser = await TrainingModuleModel.findByIdAndUpdate(req.params._id, changes, { new: true });
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

        const TrainingModule = await TrainingModuleModel.findById(req.params.id);
        if (!TrainingModule) {
            return res.status(404).json({ error: "Onboarding card not found" });
        }
        const deletedUserStatus = await deleteUserById(TrainingModuleModel, req.params.id);
        if (!deletedUserStatus) {
            return res.status(404).json({ error: "Training module not found" });
        }
        console.log(deletedUserStatus);
        await TrainingPlanModel.findByIdAndUpdate(TrainingModule.TrainingPlansId, {
            $pull: { TrainingModulesId: req.params.id }
        });

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