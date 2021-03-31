const app = require("../");
const request = require("supertest");

describe("API", () => {
  describe("getQuizzes", () => {
    it("returns a list of quizzes", async () => {
      const expected = [
        {
          title: "Basic Math Quiz",
          id: "math",
        },
        {
          title: "Basic English Quiz",
          id: "english",
        },
      ];

      const response = await request(app).get("/api/quizzes");
      expect(response.body).toEqual(expected);
    });
  });

  describe("getQuiz", () => {
    it("returns the data for a quiz", async () => {
      // TODO: Your code goes here
      const expected = {
        id: "math",
        title: "Basic Math Quiz",
        questions: [
          {
            id: "question_1",
            text: "What is 1 + 1?",
            options: ["1", "2", "3"],
          },
          {
            id: "question_2",
            text: "True or false: 2 + 2 = 4",
            options: ["True", "False"],
          },
          {
            id: "question_3",
            text: "What is the square root of 49",
            options: ["4", "6", "7"],
          },
        ],
      };

      const response = await request(app).get("/api/quizzes/math");
      expect(response.body).toEqual(expected);
    });

    it("returns a 404 if the quiz cannot be found", async () => {
      const response = await request(app).get("/api/quizzes/history");
      expect(response.statusCode).toEqual(404);
    });
  });

  describe("postQuiz", () => {
    it("returns the correct grades for the quiz", async () => {
      const data = {
        answers: {
          question_1: "2",
          question_2: "False",
        },
      };
      const expected = {
        correct: 1,
        incorrect: 2,
        questions: {
          question_1: "true",
          question_2: "false",
          question_3: "false",
        },
      };

      const response = await request(app)
        .post("/api/quizzes/math/attempt")
        .send(data);
      expect(response.body).toEqual(expected);
    });
  });
});
