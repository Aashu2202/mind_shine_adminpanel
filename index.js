const mongoose = require("mongoose");
const express = require("express");
const FunnelRouter = require("./Router/OnboardFunnelRouter");
const onboardrouter = require("./Router/OnboardingCardRouter");
const sessionRouter = require("./Router/SessionRouter")

const app = express();
const PORT = 8003;

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

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

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
