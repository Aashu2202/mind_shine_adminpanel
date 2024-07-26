const mongoose = require("mongoose");
const express = require("express");


const FunnelRouter = require("./Router/OnboardFunnelRouter");
const onboardrouter = require("./Router/OnboardingCardRouter");
const sessionRouter = require("./Router/SessionRouter")
const userrouter = require("./Router/UsersRouter");
const sessionCardRouter = require("./Router/SessionCardRouter");
const trainingPlanRouter = require("./Router/TrainingPlanRouter");
const trainingModuleRouter = require("./Router/TrainingModuleRouter");

const app = express();
const PORT = 8003;

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
//mongodb+srv://aashu2202:aashu2202@cluster0.vzuvurp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect("mongodb://localhost:27017/mindSh_demo")
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.error("DB connection error:", err);
    });

app.use("/api", FunnelRouter);
app.use("/api/onboard", onboardrouter);
app.use("/api/session", sessionRouter);
app.use("/api/users", userrouter);
app.use("/api/sessioncard", sessionCardRouter);
app.use("/api/trainingPlan", trainingPlanRouter);
app.use("/api/trainingModule", trainingModuleRouter);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
