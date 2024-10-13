import Quiz from "../models/quiz.model.js";
import QuizResult from "../models/quizResult.model.js";

const createQuiz = async (req, res) => {
  const { title, questions } = req.body;
  try {
    const newQuiz = await Quiz.create({ title, questions });
    res.status(201).json({
      success: true,
      quiz: newQuiz,
      message: "Quiz is Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllQuiz = async (req, res) => {
  try {
    const allQuiz = await Quiz.find();
    res.status(200).json({ success: true, allquiz: allQuiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getQuizById = async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    res.status(200).json({ success: true, quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch quiz" });
  }
};

const submitQuiz = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const { quizId, answers } = req.body;
    const userId = req.user.id;

    const quiz = await Quiz.findById(quizId).populate("questions.options");

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    let score = 0;
    const totalQuestions = quiz.questions.length;

    answers.forEach((answer) => {
      const question = quiz.questions.find(
        (q) => q._id.toString() === answer.questionId
      );

      if (!question) {
        console.log(`Question with ID ${answer.questionId} not found.`);
        return;
      }

      if (question.questionType === "multipleChoice") {
        if (answer.selectedOption === question.correctAnswer) {
          score++;
        }
      } else if (question.questionType === "trueFalse") {
        if (
          answer.selectedOption.toLowerCase() ===
          question.correctAnswer.toLowerCase()
        ) {
          score++;
        }
      }
    });

    // Save the result in QuizResult
    const newQuizResult = new QuizResult({
      userId,
      quizId,
      score,
      totalQuestions,
    });

    await newQuizResult.save();

    res.json({
      success: true,
      score,
      totalQuestions,
      message: `You scored ${score} out of ${totalQuestions}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { createQuiz, getAllQuiz, submitQuiz, getQuizById };
