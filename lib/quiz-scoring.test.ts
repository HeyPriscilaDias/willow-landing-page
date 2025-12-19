import { describe, it, expect } from "vitest";
import {
  calculateResults,
  calculateAlignmentScores,
  calculateCombinedScores,
  getAllPersonalityTypeIds,
  HOLLAND_ALIGNMENTS,
  BIG5_ALIGNMENTS,
  Answer,
} from "./quiz-scoring";
import personalityTypes from "./data/personality-types.json";
import quizQuestions from "./data/quiz-questions.json";

// Types for quiz questions
interface QuestionOption {
  optionId: string;
  optionText: string;
  optionAlignment: string;
}

interface Question {
  id: string;
  active: boolean;
  questionType: string;
  questionText: string;
  options: QuestionOption[];
  order: number;
}

// Helper to create mock answers that will produce a specific personality type
function createMockAnswersForType(
  targetHolland: string,
  targetBig5: string
): Answer[] {
  const answers: Answer[] = [];

  // Questions 1-6: Holland code questions (6 options, select top 2)
  // Give strong preference to target Holland code
  for (let q = 1; q <= 6; q++) {
    answers.push({
      questionId: `H${q}_question`,
      answerChoices: [
        {
          optionId: `H${q}_${targetHolland.toLowerCase()}_1`,
          optionAlignment: targetHolland,
          choice: 1, // First choice = 3 points
        },
        {
          optionId: `H${q}_${targetHolland.toLowerCase()}_2`,
          optionAlignment: targetHolland,
          choice: 2, // Second choice = 1 point
        },
      ],
    });
  }

  // Questions 7-10: Big 5 questions (5 options, select top 2)
  // Give strong preference to target Big5
  for (let q = 7; q <= 10; q++) {
    answers.push({
      questionId: `B5_${q}_question`,
      answerChoices: [
        {
          optionId: `B5_${q}_${targetBig5.toLowerCase()}_1`,
          optionAlignment: targetBig5,
          choice: 1, // First choice = 3 points
        },
        {
          optionId: `B5_${q}_${targetBig5.toLowerCase()}_2`,
          optionAlignment: targetBig5,
          choice: 2, // Second choice = 1 point
        },
      ],
    });
  }

  // Questions 11-20: Binary Big 5 questions (2 options, select 1)
  // Continue giving preference to target Big5
  for (let q = 11; q <= 20; q++) {
    answers.push({
      questionId: `B5_bin${q - 10}`,
      answerChoices: [
        {
          optionId: `B5_bin${q - 10}_${targetBig5.toLowerCase()}`,
          optionAlignment: targetBig5,
          choice: 1, // Only choice = 3 points
        },
      ],
    });
  }

  return answers;
}

describe("Quiz Scoring Algorithm", () => {
  describe("calculateAlignmentScores", () => {
    it("should assign 3 points for first choice", () => {
      const answers: Answer[] = [
        {
          questionId: "test",
          answerChoices: [
            { optionId: "opt1", optionAlignment: "Artistic", choice: 1 },
          ],
        },
      ];

      const scores = calculateAlignmentScores(answers);
      expect(scores["Artistic"]).toBe(3);
    });

    it("should assign 1 point for second choice", () => {
      const answers: Answer[] = [
        {
          questionId: "test",
          answerChoices: [
            { optionId: "opt1", optionAlignment: "Artistic", choice: 2 },
          ],
        },
      ];

      const scores = calculateAlignmentScores(answers);
      expect(scores["Artistic"]).toBe(1);
    });

    it("should accumulate scores across multiple answers", () => {
      const answers: Answer[] = [
        {
          questionId: "test1",
          answerChoices: [
            { optionId: "opt1", optionAlignment: "Artistic", choice: 1 },
          ],
        },
        {
          questionId: "test2",
          answerChoices: [
            { optionId: "opt2", optionAlignment: "Artistic", choice: 1 },
          ],
        },
      ];

      const scores = calculateAlignmentScores(answers);
      expect(scores["Artistic"]).toBe(6); // 3 + 3
    });

    it("should initialize all alignments to 0", () => {
      const scores = calculateAlignmentScores([]);

      HOLLAND_ALIGNMENTS.forEach((alignment) => {
        expect(scores[alignment]).toBe(0);
      });

      BIG5_ALIGNMENTS.forEach((alignment) => {
        expect(scores[alignment]).toBe(0);
      });
    });
  });

  describe("calculateCombinedScores", () => {
    it("should multiply Holland scores by Big5 scores", () => {
      const alignmentCounts: Record<string, number> = {
        Investigative: 0,
        Artistic: 10,
        Social: 0,
        Enterprising: 0,
        Conventional: 0,
        Realistic: 0,
        Openness: 5,
        Conscientiousness: 0,
        Extraversion: 0,
        Agreeableness: 0,
        "Emotional-Stability": 0,
      };

      const combined = calculateCombinedScores(alignmentCounts);
      expect(combined["Artistic_Openness"]).toBe(50); // 10 * 5
    });

    it("should generate all 30 combinations", () => {
      const alignmentCounts: Record<string, number> = {};
      [...HOLLAND_ALIGNMENTS, ...BIG5_ALIGNMENTS].forEach((a) => {
        alignmentCounts[a] = 1;
      });

      const combined = calculateCombinedScores(alignmentCounts);
      expect(Object.keys(combined).length).toBe(30);
    });
  });

  describe("calculateResults - All 30 Personality Types", () => {
    // Generate tests for all 30 combinations
    HOLLAND_ALIGNMENTS.forEach((holland) => {
      BIG5_ALIGNMENTS.forEach((big5) => {
        const expectedId = `${holland}_${big5}`;

        it(`should return ${expectedId} when ${holland} and ${big5} are highest`, () => {
          const answers = createMockAnswersForType(holland, big5);
          const result = calculateResults(answers);
          expect(result).toBe(expectedId);
        });
      });
    });
  });

  describe("Personality Type ID Validation", () => {
    it("should generate IDs that match the personality-types.json data", () => {
      const generatedIds = getAllPersonalityTypeIds();
      const dataIds = (personalityTypes as Array<{ id: string }>).map(
        (pt) => pt.id
      );

      // Check that all generated IDs exist in the data
      generatedIds.forEach((id) => {
        expect(dataIds).toContain(id);
      });
    });

    it("should have exactly 30 personality types", () => {
      const ids = getAllPersonalityTypeIds();
      expect(ids.length).toBe(30);
    });

    it("all personality types in data should be reachable by the algorithm", () => {
      const generatedIds = getAllPersonalityTypeIds();
      const dataIds = (personalityTypes as Array<{ id: string }>).map(
        (pt) => pt.id
      );

      // Check that all data IDs can be generated
      dataIds.forEach((id) => {
        expect(generatedIds).toContain(id);
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty answers", () => {
      const result = calculateResults([]);
      // With all zeros, the algorithm returns empty string (no max > 0)
      expect(result).toBe("");
    });

    it("should handle tied scores by returning first in iteration order", () => {
      // Create answers that give equal scores to multiple types
      const answers: Answer[] = [
        {
          questionId: "test1",
          answerChoices: [
            { optionId: "opt1", optionAlignment: "Investigative", choice: 1 },
          ],
        },
        {
          questionId: "test2",
          answerChoices: [
            { optionId: "opt2", optionAlignment: "Artistic", choice: 1 },
          ],
        },
        {
          questionId: "test3",
          answerChoices: [
            { optionId: "opt3", optionAlignment: "Openness", choice: 1 },
          ],
        },
      ];

      const scores = calculateAlignmentScores(answers);
      expect(scores["Investigative"]).toBe(3);
      expect(scores["Artistic"]).toBe(3);
      expect(scores["Openness"]).toBe(3);

      // Both Investigative_Openness and Artistic_Openness would score 9
      // Investigative comes first in HOLLAND_ALIGNMENTS array
      const result = calculateResults(answers);
      expect(result).toBe("Investigative_Openness");
    });

    it("should handle single alignment focus", () => {
      // User only selected Artistic and Openness options
      const answers: Answer[] = [];

      // 6 Holland questions - all Artistic
      for (let i = 0; i < 6; i++) {
        answers.push({
          questionId: `h${i}`,
          answerChoices: [
            { optionId: `h${i}_1`, optionAlignment: "Artistic", choice: 1 },
            { optionId: `h${i}_2`, optionAlignment: "Artistic", choice: 2 },
          ],
        });
      }

      // 14 Big5 questions - all Openness
      for (let i = 0; i < 14; i++) {
        answers.push({
          questionId: `b${i}`,
          answerChoices: [
            { optionId: `b${i}_1`, optionAlignment: "Openness", choice: 1 },
          ],
        });
      }

      const result = calculateResults(answers);
      expect(result).toBe("Artistic_Openness");
    });
  });

  describe("Scoring Math Verification", () => {
    it("should calculate correct maximum possible score for a type", () => {
      // Maximum Holland score: 6 questions * (3 + 1) points = 24
      // Maximum Big5 score: 4 multi-select questions * 4 points + 10 binary * 3 points = 16 + 30 = 46
      // But in our mock, we give same alignment for both choices in multi-select

      const answers = createMockAnswersForType("Artistic", "Openness");
      const scores = calculateAlignmentScores(answers);

      // Holland: 6 questions * (3 + 1 points) = 24
      expect(scores["Artistic"]).toBe(24);

      // Big5: 4 multi-select * 4 points + 10 binary * 3 points = 16 + 30 = 46
      expect(scores["Openness"]).toBe(46);

      // Combined score
      const combined = calculateCombinedScores(scores);
      expect(combined["Artistic_Openness"]).toBe(24 * 46);
    });
  });
});

describe("Integration: Generated Results Match Data File", () => {
  const personalityTypeIds = (personalityTypes as Array<{ id: string }>).map(
    (pt) => pt.id
  );

  HOLLAND_ALIGNMENTS.forEach((holland) => {
    BIG5_ALIGNMENTS.forEach((big5) => {
      const expectedId = `${holland}_${big5}`;

      it(`${expectedId}: algorithm output matches data file entry`, () => {
        const answers = createMockAnswersForType(holland, big5);
        const result = calculateResults(answers);

        // Verify the result matches expected format
        expect(result).toBe(expectedId);

        // Verify this ID exists in the personality types data
        expect(personalityTypeIds).toContain(result);
      });
    });
  });
});

// ============================================================================
// QUIZ QUESTIONS DATA VALIDATION
// These tests ensure the quiz-questions.json data is valid and complete
// ============================================================================

describe("Quiz Questions Data Validation", () => {
  const questions = quizQuestions as Question[];
  const activeQuestions = questions.filter((q) => q.active);
  const hollandQuestions = activeQuestions.filter((q) =>
    q.id.startsWith("H")
  );
  const big5MultiQuestions = activeQuestions.filter(
    (q) => q.id.startsWith("B5_") && !q.id.includes("bin")
  );
  const big5BinaryQuestions = activeQuestions.filter((q) =>
    q.id.includes("bin")
  );

  describe("Question Structure", () => {
    it("should have exactly 20 active questions", () => {
      expect(activeQuestions.length).toBe(20);
    });

    it("should have 6 Holland code questions (Q1-6)", () => {
      expect(hollandQuestions.length).toBe(6);
    });

    it("should have 4 Big5 multi-select questions (Q7-10)", () => {
      expect(big5MultiQuestions.length).toBe(4);
    });

    it("should have 10 Big5 binary questions (Q11-20)", () => {
      expect(big5BinaryQuestions.length).toBe(10);
    });

    it("Holland questions should have exactly 6 options each", () => {
      hollandQuestions.forEach((q) => {
        expect(q.options.length).toBe(6);
      });
    });

    it("Big5 multi-select questions should have exactly 5 options each", () => {
      big5MultiQuestions.forEach((q) => {
        expect(q.options.length).toBe(5);
      });
    });

    it("Big5 binary questions should have exactly 2 options each", () => {
      big5BinaryQuestions.forEach((q) => {
        expect(q.options.length).toBe(2);
      });
    });

    it("questions should be ordered 1-20", () => {
      const orders = activeQuestions.map((q) => q.order).sort((a, b) => a - b);
      expect(orders).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    });
  });

  describe("Alignment Validity", () => {
    const validHollandAlignments = new Set(HOLLAND_ALIGNMENTS);
    const validBig5Alignments = new Set(BIG5_ALIGNMENTS);

    it("Holland questions should only use valid Holland alignments", () => {
      hollandQuestions.forEach((q) => {
        q.options.forEach((opt) => {
          expect(validHollandAlignments.has(opt.optionAlignment as typeof HOLLAND_ALIGNMENTS[number])).toBe(true);
        });
      });
    });

    it("Big5 questions should only use valid Big5 alignments", () => {
      [...big5MultiQuestions, ...big5BinaryQuestions].forEach((q) => {
        q.options.forEach((opt) => {
          expect(validBig5Alignments.has(opt.optionAlignment as typeof BIG5_ALIGNMENTS[number])).toBe(true);
        });
      });
    });

    it("each Holland question should have one option per Holland code", () => {
      hollandQuestions.forEach((q) => {
        const alignments = q.options.map((opt) => opt.optionAlignment);
        const uniqueAlignments = new Set(alignments);

        // Should have 6 unique alignments
        expect(uniqueAlignments.size).toBe(6);

        // Each Holland code should appear exactly once
        HOLLAND_ALIGNMENTS.forEach((alignment) => {
          expect(alignments.filter((a) => a === alignment).length).toBe(1);
        });
      });
    });

    it("each Big5 multi-select question should have one option per Big5 trait", () => {
      big5MultiQuestions.forEach((q) => {
        const alignments = q.options.map((opt) => opt.optionAlignment);
        const uniqueAlignments = new Set(alignments);

        // Should have 5 unique alignments
        expect(uniqueAlignments.size).toBe(5);

        // Each Big5 trait should appear exactly once
        BIG5_ALIGNMENTS.forEach((alignment) => {
          expect(alignments.filter((a) => a === alignment).length).toBe(1);
        });
      });
    });
  });

  describe("Big5 Binary Questions Coverage", () => {
    it("each Big5 trait should appear in exactly 4 binary questions", () => {
      const traitCounts: Record<string, number> = {};
      BIG5_ALIGNMENTS.forEach((trait) => {
        traitCounts[trait] = 0;
      });

      big5BinaryQuestions.forEach((q) => {
        q.options.forEach((opt) => {
          traitCounts[opt.optionAlignment]++;
        });
      });

      BIG5_ALIGNMENTS.forEach((trait) => {
        expect(traitCounts[trait]).toBe(4);
      });
    });

    it("binary questions should have 5 unique trait pairings (each asked twice)", () => {
      // Note: The quiz intentionally asks each trait pairing twice for reliability
      const pairings = new Map<string, number>();

      big5BinaryQuestions.forEach((q) => {
        const traits = q.options.map((opt) => opt.optionAlignment).sort();
        const pairKey = traits.join("_");
        pairings.set(pairKey, (pairings.get(pairKey) || 0) + 1);
      });

      // Should have exactly 5 unique pairings
      expect(pairings.size).toBe(5);

      // Each pairing should appear exactly twice
      pairings.forEach((count, pairing) => {
        expect(count).toBe(2);
      });
    });
  });

  describe("Option ID Uniqueness", () => {
    it("all option IDs should be unique across all questions", () => {
      const allOptionIds: string[] = [];
      activeQuestions.forEach((q) => {
        q.options.forEach((opt) => {
          allOptionIds.push(opt.optionId);
        });
      });

      const uniqueIds = new Set(allOptionIds);
      expect(uniqueIds.size).toBe(allOptionIds.length);
    });

    it("all question IDs should be unique", () => {
      const questionIds = activeQuestions.map((q) => q.id);
      const uniqueIds = new Set(questionIds);
      expect(uniqueIds.size).toBe(questionIds.length);
    });
  });
});

// ============================================================================
// REAL QUIZ SIMULATION TESTS
// These tests use actual question data to simulate real user quiz scenarios
// ============================================================================

describe("Real Quiz Simulation", () => {
  const questions = (quizQuestions as Question[])
    .filter((q) => q.active)
    .sort((a, b) => a.order - b.order);

  // Helper to create answers from real questions targeting specific alignments
  function createRealAnswersForType(
    targetHolland: string,
    targetBig5: string
  ): Answer[] {
    const answers: Answer[] = [];

    questions.forEach((question) => {
      const isHollandQuestion = question.id.startsWith("H");
      const isBinaryQuestion = question.options.length === 2;

      if (isHollandQuestion) {
        // Find the option matching target Holland code
        const primaryOption = question.options.find(
          (opt) => opt.optionAlignment === targetHolland
        );
        // Pick any other option as secondary
        const secondaryOption = question.options.find(
          (opt) => opt.optionAlignment !== targetHolland
        );

        if (primaryOption && secondaryOption) {
          answers.push({
            questionId: question.id,
            answerChoices: [
              {
                optionId: primaryOption.optionId,
                optionAlignment: primaryOption.optionAlignment,
                choice: 1,
              },
              {
                optionId: secondaryOption.optionId,
                optionAlignment: secondaryOption.optionAlignment,
                choice: 2,
              },
            ],
          });
        }
      } else if (isBinaryQuestion) {
        // Binary Big5 question - pick the target Big5 if available
        const targetOption = question.options.find(
          (opt) => opt.optionAlignment === targetBig5
        );
        const selectedOption = targetOption || question.options[0];

        answers.push({
          questionId: question.id,
          answerChoices: [
            {
              optionId: selectedOption.optionId,
              optionAlignment: selectedOption.optionAlignment,
              choice: 1,
            },
          ],
        });
      } else {
        // Multi-select Big5 question
        const primaryOption = question.options.find(
          (opt) => opt.optionAlignment === targetBig5
        );
        const secondaryOption = question.options.find(
          (opt) => opt.optionAlignment !== targetBig5
        );

        if (primaryOption && secondaryOption) {
          answers.push({
            questionId: question.id,
            answerChoices: [
              {
                optionId: primaryOption.optionId,
                optionAlignment: primaryOption.optionAlignment,
                choice: 1,
              },
              {
                optionId: secondaryOption.optionId,
                optionAlignment: secondaryOption.optionAlignment,
                choice: 2,
              },
            ],
          });
        }
      }
    });

    return answers;
  }

  describe("All 30 personality types reachable with real questions", () => {
    HOLLAND_ALIGNMENTS.forEach((holland) => {
      BIG5_ALIGNMENTS.forEach((big5) => {
        const expectedId = `${holland}_${big5}`;

        it(`${expectedId}: achievable using real quiz options`, () => {
          const answers = createRealAnswersForType(holland, big5);

          // Should have 20 answers (one per question)
          expect(answers.length).toBe(20);

          const result = calculateResults(answers);
          expect(result).toBe(expectedId);
        });
      });
    });
  });

  describe("Answer completeness", () => {
    it("real quiz simulation should generate answer for every question", () => {
      const answers = createRealAnswersForType("Artistic", "Openness");
      const answeredQuestionIds = new Set(answers.map((a) => a.questionId));

      questions.forEach((q) => {
        expect(answeredQuestionIds.has(q.id)).toBe(true);
      });
    });

    it("multi-select questions should have 2 choices in answers", () => {
      const answers = createRealAnswersForType("Artistic", "Openness");

      questions.forEach((q) => {
        if (q.options.length > 2) {
          const answer = answers.find((a) => a.questionId === q.id);
          expect(answer?.answerChoices.length).toBe(2);
        }
      });
    });

    it("binary questions should have 1 choice in answers", () => {
      const answers = createRealAnswersForType("Artistic", "Openness");

      questions.forEach((q) => {
        if (q.options.length === 2) {
          const answer = answers.find((a) => a.questionId === q.id);
          expect(answer?.answerChoices.length).toBe(1);
        }
      });
    });
  });
});

// ============================================================================
// SCORING CONSISTENCY TESTS
// These tests verify the scoring produces consistent, expected results
// ============================================================================

describe("Scoring Consistency", () => {
  const questions = (quizQuestions as Question[])
    .filter((q) => q.active)
    .sort((a, b) => a.order - b.order);

  it("same answers should always produce same result", () => {
    const answers = createMockAnswersForType("Social", "Agreeableness");

    // Run 10 times to check consistency
    for (let i = 0; i < 10; i++) {
      const result = calculateResults(answers);
      expect(result).toBe("Social_Agreeableness");
    }
  });

  it("stronger Holland preference should dominate weaker one", () => {
    const answers: Answer[] = [];

    // Give Artistic 5 first choices, Realistic 1 first choice
    for (let i = 0; i < 5; i++) {
      answers.push({
        questionId: `h${i}`,
        answerChoices: [
          { optionId: `art${i}`, optionAlignment: "Artistic", choice: 1 },
        ],
      });
    }
    answers.push({
      questionId: "h5",
      answerChoices: [
        { optionId: "real5", optionAlignment: "Realistic", choice: 1 },
      ],
    });

    // Give Openness consistent selection
    for (let i = 0; i < 10; i++) {
      answers.push({
        questionId: `b${i}`,
        answerChoices: [
          { optionId: `open${i}`, optionAlignment: "Openness", choice: 1 },
        ],
      });
    }

    const scores = calculateAlignmentScores(answers);
    expect(scores["Artistic"]).toBeGreaterThan(scores["Realistic"]);

    const result = calculateResults(answers);
    expect(result).toBe("Artistic_Openness");
  });

  it("mixed answers should produce reasonable result", () => {
    // Simulate a user with mixed preferences
    const answers: Answer[] = [];

    // Mix of Holland preferences (slight Investigative lean)
    const hollandChoices = [
      "Investigative", "Investigative", "Investigative",
      "Artistic", "Social", "Conventional"
    ];

    hollandChoices.forEach((holland, i) => {
      answers.push({
        questionId: `h${i}`,
        answerChoices: [
          { optionId: `h${i}_1`, optionAlignment: holland, choice: 1 },
        ],
      });
    });

    // Mix of Big5 preferences (slight Conscientiousness lean)
    const big5Choices = [
      "Conscientiousness", "Conscientiousness", "Conscientiousness",
      "Openness", "Extraversion", "Agreeableness",
      "Conscientiousness", "Openness", "Emotional-Stability", "Agreeableness"
    ];

    big5Choices.forEach((big5, i) => {
      answers.push({
        questionId: `b${i}`,
        answerChoices: [
          { optionId: `b${i}_1`, optionAlignment: big5, choice: 1 },
        ],
      });
    });

    const scores = calculateAlignmentScores(answers);

    // Investigative should be highest Holland
    expect(scores["Investigative"]).toBe(9); // 3 * 3

    // Conscientiousness should be highest Big5
    expect(scores["Conscientiousness"]).toBe(12); // 4 * 3

    const result = calculateResults(answers);
    expect(result).toBe("Investigative_Conscientiousness");
  });
});
