import Quiz from "../models/quiz.model.js";

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

export { createQuiz, getAllQuiz };
