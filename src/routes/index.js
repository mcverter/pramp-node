const quizzes = require("../../data/quizzes.json");

/**
 * Returns a list of quizzes with titles and IDs
 */
async function getQuizzes(req, res, next) {
  res.send(Object.values(quizzes).map(({ title, id }) => ({ title, id })));
}

/**
 * Returns quiz data for the given ID, omitting the answers
 */
async function getQuiz(req, res, next) {
  const { id } = req.params;
  const quiz = quizzes[id];

  if (!quiz) {
    res.send(404);
  } else {
    res.json({
      ...quiz,
      questions: quiz.questions.map(({ answer, ...q }) => q),
    });
  }
}

/**
 * Handles a quiz submission and returns a graded result
 */
async function postQuiz(req, res, next) {
  const { id } = req.params;
  const quiz = quizzes[id];

  if (!quiz) {
    res.sendStatus(404);
  } else {
    const { answers } = req.body;

    const response = { correct: 0, incorrect: 0, questions: {} };
    quiz.questions.forEach((q) => {
      const { id, answer } = q;
      if (answers[id] && answers[id] === answer) {
        response.correct++;
        response.questions[id] = "true";
      } else {
        response.incorrect++;
        response.questions[id] = "false";
      }
    });
    res.json(response);
  }
}

module.exports = {
  getQuizzes,
  getQuiz,
  postQuiz,
};
