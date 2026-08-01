require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");
const { invokeGeminiAI } = require("./src/services/ai.service");
const {resume, selfDescription, jobDescription} = require("./src/services/temp");
const { generateInterviewReport } = require("./src/services/ai.service");
connectToDB();
generateInterviewReport({ resume, selfDescription, jobDescription })
if (process.env.GOOGLE_GENAI_API_KEY) {
    invokeGeminiAI().catch((error) => {
        console.error("AI startup check failed:", error.message);
    });
} else {
    console.log("GOOGLE_GENAI_API_KEY not set; skipping AI startup check.");
}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
