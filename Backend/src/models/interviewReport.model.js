const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "Technical question is required"]
        },
        intention: {
            type: String,
            required: [true, "Intention is required"]
        },
        answer: {
            type: String,
            required: [true, "Answer is required"]
        }
    },
    {
        _id: false
    }
);

const behavioralQuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "Behavioral question is required"]
        },
        intention: {
            type: String,
            required: [true, "Intention is required"]
        },
        answer: {
            type: String,
            required: [true, "Answer is required"]
        }
    },
    {
        _id: false
    }
);

const skillGapSchema = new mongoose.Schema(
    {
        skills: {
            type: String,
            required: [true, "Skills is required"]
        },
        severity: {
            type: String,
            enum: ["low", "medium", "high"],
            required: [true, "Severity is required"]
        }
    },
    {
        _id: false
    }
);

const preparationPlanSchema = new mongoose.Schema(
    {
        days: {
            type: Number,
            required: [true, "Days is required"]
        },
        focus: {
            type: String,
            required: [true, "Focus is required"]
        },
        tasks: {
            type: String,
            required: [true, "Tasks is required"]
        }
    },
    {
        _id: false
    }
);

const interviewReportSchema = new mongoose.Schema(
    {
        jobDescription: {
            type: String,
            required: [true, "Job description is required"]
        },
        resume: {
            type: String
        },
        selfDescription: {
            type: String
        },
        matchScore: {
            type: Number,
            min: 0,
            max: 100
        },
        technicalQuestions: {
            type: [technicalQuestionSchema],
            default: []
        },
        behavioralQuestions: {
            type: [behavioralQuestionSchema],
            default: []
        },
        skillGaps: {
            type: [skillGapSchema],
            default: []
        },
        preparationPlan: preparationPlanSchema
    },
    {
        timestamps: true
    }
);

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;
