import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  questions: [
    {
      questionText: {
        type: String,
        required: [true, "questionText is required"],
      },
      questionType: {
        // 'multipleChoice' or 'trueFalse'
        type: String,
        enum: ["multipleChoice", "trueFalse"],
        required: [true, "questionType is required"],
      },
      options: [
        {
          text: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            required: function () {
              return this.questionType === "multipleChoice";
            },
          },
        },
      ],
      correctAnswer: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            if (this.questionType === "multipleChoice") {
              return this.options.some((opt) => opt.text === value);
            } else {
              return value === "true" || value === "false";
            }
          },
          message: "Correct answer must match one of the options",
        },
      },
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
