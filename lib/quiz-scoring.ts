// Types
export interface AnswerChoice {
  optionId: string;
  optionAlignment: string;
  choice: number;
}

export interface Answer {
  questionId: string;
  answerChoices: AnswerChoice[];
}

// Alignment enums for scoring
export const HOLLAND_ALIGNMENTS = [
  "Investigative",
  "Artistic",
  "Social",
  "Enterprising",
  "Conventional",
  "Realistic",
] as const;

export const BIG5_ALIGNMENTS = [
  "Openness",
  "Conscientiousness",
  "Extraversion",
  "Agreeableness",
  "Emotional-Stability",
] as const;

export type HollandAlignment = (typeof HOLLAND_ALIGNMENTS)[number];
export type Big5Alignment = (typeof BIG5_ALIGNMENTS)[number];

// Helper function to normalize alignment names for scoring
export function normalizeAlignment(alignment: string): {
  alignment: string;
  multiplier: number;
} {
  if (alignment === "Introversion, low Extraversion") {
    return { alignment: "Extraversion", multiplier: -1 };
  }
  if (alignment === "Neuroticism") {
    return { alignment: "Emotional-Stability", multiplier: -1 };
  }
  if (alignment === "Low Agreeableness") {
    return { alignment: "Agreeableness", multiplier: -1 };
  }
  return { alignment, multiplier: 1 };
}

// Calculate alignment scores from answers
export function calculateAlignmentScores(
  answers: Answer[]
): Record<string, number> {
  const alignmentCounts: Record<string, number> = {};

  // Initialize counts
  [...HOLLAND_ALIGNMENTS, ...BIG5_ALIGNMENTS].forEach((a) => {
    alignmentCounts[a] = 0;
  });

  // Tally scores
  for (const answer of answers) {
    for (const choice of answer.answerChoices) {
      if (choice.optionAlignment) {
        const points = choice.choice === 1 ? 3 : 1;
        const { alignment, multiplier } = normalizeAlignment(
          choice.optionAlignment
        );
        alignmentCounts[alignment] =
          (alignmentCounts[alignment] || 0) + points * multiplier;
      }
    }
  }

  return alignmentCounts;
}

// Calculate combined scores (Holland x Big5)
export function calculateCombinedScores(
  alignmentCounts: Record<string, number>
): Record<string, number> {
  const combinedScores: Record<string, number> = {};

  for (const holland of HOLLAND_ALIGNMENTS) {
    for (const big5 of BIG5_ALIGNMENTS) {
      const key = `${holland}_${big5}`;
      combinedScores[key] = alignmentCounts[holland] * alignmentCounts[big5];
    }
  }

  return combinedScores;
}

// Calculate quiz results from answers - returns the personality type ID
export function calculateResults(answers: Answer[]): string {
  const alignmentCounts = calculateAlignmentScores(answers);
  const combinedScores = calculateCombinedScores(alignmentCounts);

  // Find the highest combined score
  let maxAlignment = "";
  let maxScore = 0;

  for (const [alignment, score] of Object.entries(combinedScores)) {
    if (score > maxScore) {
      maxScore = score;
      maxAlignment = alignment;
    }
  }

  return maxAlignment;
}

// Get all valid personality type IDs
export function getAllPersonalityTypeIds(): string[] {
  const ids: string[] = [];
  for (const holland of HOLLAND_ALIGNMENTS) {
    for (const big5 of BIG5_ALIGNMENTS) {
      ids.push(`${holland}_${big5}`);
    }
  }
  return ids;
}
