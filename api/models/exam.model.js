const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
    user: { type: String, required: true },
    answers: [{ questionId: mongoose.Schema.Types.ObjectId, answer: String }],
    score: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Exam", ExamSchema);
