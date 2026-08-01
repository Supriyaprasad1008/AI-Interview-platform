const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

function getAIClient() {
    if (!process.env.GOOGLE_GENAI_API_KEY) {
        throw new Error("GOOGLE_GENAI_API_KEY is not set");
    }

    return new GoogleGenAI({
        apiKey: process.env.GOOGLE_GENAI_API_KEY
    });
}

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).describe("The match score between the candidate's resume and the job description, expressed as a percentage"),
    technicalQuestions: z.array(
        z.object({
            question: z.string().describe("The technical question asked during the interview"),
            intention: z.string().describe("The intention behind the question, e.g., to assess problem-solving skills, coding ability, etc."),
            answer: z.string().describe("The candidate's answer to the technical question")
        })
    ).describe("A list of technical questions asked during the interview, along with their intentions and the candidate's answers"),
    behavioralQuestions: z.array(
        z.object({
            question: z.string().describe("The behavioral question asked during the interview"),
            intention: z.string().describe("The intention behind the question, e.g., to assess teamwork, leadership, etc."),
            answer: z.string().describe("The candidate's answer to the behavioral question")
        })
    ).describe("A list of behavioral questions asked during the interview, along with their intentions and the candidate's answers"),
    skillGaps: z.array(
        z.object({
            skills: z.string().describe("The specific skills where the candidate has gaps"),
            severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap")
        })
    ).describe("A list of skill gaps identified during the interview, along with their severity levels"),
    preparationPlan: z.array(
        z.object({
            days: z.number().int().positive().describe("The number of days allocated for preparation"),
            focus: z.string().describe("The main focus area for preparation"),
            tasks: z.string().describe("The specific tasks or activities to be undertaken during the preparation period")
        })
    ).describe("A detailed preparation plan for the candidate, including the number of days, focus areas, and tasks to be completed")
});

async function invokeGeminiAI(
    prompt = "Explain what GenAI interview questions are and give me 5 examples."
) {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
        model: DEFAULT_MODEL,
        contents: prompt,
        config: {
            temperature: 0.2,
            maxOutputTokens: 500
        }
    });

    return response.text;
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const ai = getAIClient();
    const prompt = `You are an AI interview preparation assistant. Based on the following information, generate a comprehensive interview report in JSON format that adheres to the provided schema.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}`;

    const response = await ai.models.generateContent({
        model: DEFAULT_MODEL,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(interviewReportSchema)
        }
    });

    return JSON.parse(response.text);
}

module.exports = {
    invokeGeminiAI,
    generateInterviewReport
};
