"use client";

import { useState, useMemo, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import quizQuestions from "@/lib/data/quiz-questions.json";
import personalityTypes from "@/lib/data/personality-types.json";

// Types
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

interface AnswerChoice {
  optionId: string;
  optionAlignment: string;
  choice: number;
}

interface Answer {
  questionId: string;
  answerChoices: AnswerChoice[];
}

interface PersonalityType {
  id: string;
  title: string;
  shortDescription: string;
  superpowers: string;
  recommendedCareers: Array<{
    onetCode: string;
    title: string;
    description: string;
  }>;
  possibleMajors: Array<{
    title: string;
    description: string;
  }>;
}

type QuizView = "start" | "questions" | "results";

// Alignment enums for scoring
const HOLLAND_ALIGNMENTS = [
  "Investigative",
  "Artistic",
  "Social",
  "Enterprising",
  "Conventional",
  "Realistic",
];

const BIG5_ALIGNMENTS = [
  "Openness",
  "Conscientiousness",
  "Extraversion",
  "Agreeableness",
  "Emotional-Stability",
];

// Helper function to normalize alignment names for scoring
function normalizeAlignment(alignment: string): { alignment: string; multiplier: number } {
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

// Calculate quiz results from answers
function calculateResults(answers: Answer[]): string {
  const alignmentCounts: Record<string, number> = {};

  // Initialize counts
  [...HOLLAND_ALIGNMENTS, ...BIG5_ALIGNMENTS].forEach(a => {
    alignmentCounts[a] = 0;
  });

  // Tally scores
  for (const answer of answers) {
    for (const choice of answer.answerChoices) {
      if (choice.optionAlignment) {
        const points = choice.choice === 1 ? 3 : 1;
        const { alignment, multiplier } = normalizeAlignment(choice.optionAlignment);
        alignmentCounts[alignment] = (alignmentCounts[alignment] || 0) + (points * multiplier);
      }
    }
  }

  // Calculate combined scores (Holland x Big5)
  const combinedScores: Record<string, number> = {};

  for (const holland of HOLLAND_ALIGNMENTS) {
    for (const big5 of BIG5_ALIGNMENTS) {
      const key = `${holland}_${big5.replace("-", "_")}`;
      combinedScores[key] = alignmentCounts[holland] * alignmentCounts[big5];
    }
  }

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

// Parse superpowers from string format
function parseSuperpowers(superpowersStr: string): string[] {
  if (!superpowersStr) return [];
  return superpowersStr
    .split(" - ")
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

// Progress Bar Component
function QuizProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center w-full gap-1">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
            index < current ? "bg-[#062F29]" : "bg-neutral-300"
          }`}
        />
      ))}
    </div>
  );
}

// Option Component
function QuestionOptionItem({
  option,
  selectedOptions,
  onSelect,
  maxSelections,
}: {
  option: QuestionOption;
  selectedOptions: string[];
  onSelect: (optionId: string) => void;
  maxSelections: number;
}) {
  const isSelected = selectedOptions.includes(option.optionId);
  const optionIndex = selectedOptions.indexOf(option.optionId);
  const optionNumber = optionIndex >= 0 ? optionIndex + 1 : "";

  return (
    <button
      type="button"
      className="flex items-center gap-4 mt-4 cursor-pointer text-left w-full group"
      onClick={() => onSelect(option.optionId)}
      aria-pressed={isSelected}
    >
      <div className="w-8 h-8 min-w-8 flex items-center justify-center rounded border border-neutral-400 bg-white text-base font-bold text-neutral-700">
        {optionNumber}
      </div>
      <span className={`text-sm leading-5 text-neutral-600 ${isSelected ? "font-semibold" : "font-normal"}`}>
        {option.optionText}
      </span>
    </button>
  );
}

// Question Card Component
function QuestionCard({
  question,
  selectedOptions,
  onOptionSelect,
}: {
  question: Question;
  selectedOptions: string[];
  onOptionSelect: (optionId: string) => void;
}) {
  const maxSelections = question.options.length === 2 ? 1 : 2;

  const handleSelect = useCallback((optionId: string) => {
    onOptionSelect(optionId);
  }, [onOptionSelect]);

  return (
    <div className="mt-4">
      <h2 className="font-heading font-semibold text-[30px] leading-9 tracking-tight text-[#0f172a]">
        {question.questionText}
      </h2>
      <p className="font-sans text-base leading-6 text-neutral-500 mt-6">
        Select your top {maxSelections === 1 ? "option" : "and second top option"} that best describes you.
      </p>
      <div className="mt-3">
        {question.options.map((option) => (
          <QuestionOptionItem
            key={option.optionId}
            option={option}
            selectedOptions={selectedOptions}
            onSelect={handleSelect}
            maxSelections={maxSelections}
          />
        ))}
      </div>
    </div>
  );
}

// Superpowers List Component
function SuperpowersList({ superpowers }: { superpowers: string[] }) {
  if (!superpowers.length) return null;

  return (
    <div>
      {superpowers.map((superpower, index) => {
        const parts = superpower.split(/[:–-]/).map(part => part.trim());
        const title = parts[0] || superpower;
        const description = parts.slice(1).join(": ").trim() || "";

        return (
          <div
            key={index}
            className="bg-[#0f172a] rounded-xl p-3 mt-3"
          >
            <p className="font-sans font-semibold text-sm leading-5 text-white">
              {title}
            </p>
            {description && (
              <p className="font-sans font-normal text-sm leading-5 text-white/90 mt-1">
                {description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Main Quiz Page Component
export default function PersonalityQuizPage() {
  const [view, setView] = useState<QuizView>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [personalityResult, setPersonalityResult] = useState<PersonalityType | null>(null);

  // Filter active questions and sort by order
  const questions = useMemo(() => {
    return (quizQuestions as Question[])
      .filter(q => q.active)
      .sort((a, b) => a.order - b.order);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const maxSelections = currentQuestion?.options.length === 2 ? 1 : 2;

  // Handle option selection
  const handleOptionSelect = useCallback((optionId: string) => {
    setSelectedOptions(prev => {
      const isAlreadySelected = prev.includes(optionId);

      if (isAlreadySelected) {
        // Deselect
        return prev.filter(id => id !== optionId);
      }

      if (prev.length >= maxSelections) {
        // Replace last selection with new one
        if (maxSelections === 1) {
          return [optionId];
        }
        return [...prev.slice(0, -1), optionId];
      }

      // Add to selection
      return [...prev, optionId];
    });
  }, [maxSelections]);

  // Handle next button
  const handleNext = useCallback(() => {
    if (selectedOptions.length === 0) {
      alert("Please select at least one option.");
      return;
    }

    if (maxSelections === 2 && selectedOptions.length < 2) {
      alert("Please select your top and second top option.");
      return;
    }

    // Create answer record
    const answerChoices: AnswerChoice[] = selectedOptions.map((optionId, index) => {
      const option = currentQuestion.options.find(o => o.optionId === optionId);
      return {
        optionId,
        optionAlignment: option?.optionAlignment || "",
        choice: index + 1,
      };
    });

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      answerChoices,
    };

    // Update answers
    const updatedAnswers = [...answers.filter(a => a.questionId !== currentQuestion.id), newAnswer];
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      // Calculate results
      const resultId = calculateResults(updatedAnswers);
      const result = (personalityTypes as PersonalityType[]).find(
        pt => pt.id === resultId
      );

      if (result) {
        setPersonalityResult(result);
        setView("results");
      } else {
        // Fallback to first personality type if no match found
        setPersonalityResult(personalityTypes[0] as PersonalityType);
        setView("results");
      }
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);

      // Load any existing answer for next question
      const nextQuestion = questions[currentQuestionIndex + 1];
      const existingAnswer = answers.find(a => a.questionId === nextQuestion?.id);
      if (existingAnswer) {
        setSelectedOptions(existingAnswer.answerChoices.map(c => c.optionId));
      } else {
        setSelectedOptions([]);
      }
    }
  }, [selectedOptions, maxSelections, currentQuestion, answers, isLastQuestion, questions, currentQuestionIndex]);

  // Handle previous button
  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);

      // Load existing answer for previous question
      const prevQuestion = questions[prevIndex];
      const existingAnswer = answers.find(a => a.questionId === prevQuestion?.id);
      if (existingAnswer) {
        setSelectedOptions(existingAnswer.answerChoices.map(c => c.optionId));
      } else {
        setSelectedOptions([]);
      }
    }
  }, [currentQuestionIndex, questions, answers]);

  // Handle start quiz
  const handleStartQuiz = useCallback(() => {
    setView("questions");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOptions([]);
  }, []);

  // Handle retake quiz
  const handleRetake = useCallback(() => {
    setView("start");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOptions([]);
    setPersonalityResult(null);
  }, []);

  // Start View
  if (view === "start") {
    return (
      <div className="min-h-screen bg-[#062F29] px-4 pb-4 overflow-y-auto">
        {/* Header */}
        <header className="py-4">
          <div className="flex items-center justify-between">
            <div className="h-10 w-10">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M20 4C11.164 4 4 11.164 4 20s7.164 16 16 16 16-7.164 16-16S28.836 4 20 4z" fill="white"/>
                <path d="M20 8c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8z" fill="#062F29"/>
                <path d="M20 12c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" fill="white"/>
              </svg>
            </div>
            <span className="hidden md:block font-sans font-semibold text-base text-white">
              Willow&apos;s Personality Quiz
            </span>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] max-w-[800px] mx-auto text-center">
          <h1 className="font-heading font-semibold text-[36px] md:text-[46px] leading-[130%] tracking-tight text-white">
            Willow&apos;s personality quiz:<br />
            Where your journey<br />
            to self-discovery begins
          </h1>

          <div className="mt-12">
            <span className="font-sans text-base leading-6 bg-[#D8FBDB] text-neutral-600 px-2 py-1">
              There are no wrong answers!
            </span>
          </div>

          <p className="mt-2 font-sans text-base leading-6 text-neutral-300">
            The more honest you are, the more insightful your results will be.
          </p>

          <button
            onClick={handleStartQuiz}
            className="mt-12 px-8 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-2xl transition-colors"
          >
            Start the Quiz
          </button>
        </div>
      </div>
    );
  }

  // Results View
  if (view === "results" && personalityResult) {
    const superpowers = parseSuperpowers(personalityResult.superpowers);

    return (
      <div className="min-h-screen bg-[#062F29] px-4 pb-4 overflow-y-auto">
        {/* Header */}
        <header className="py-4">
          <div className="flex items-center justify-between">
            <div className="h-10 w-10">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M20 4C11.164 4 4 11.164 4 20s7.164 16 16 16 16-7.164 16-16S28.836 4 20 4z" fill="white"/>
                <path d="M20 8c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8z" fill="#062F29"/>
                <path d="M20 12c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" fill="white"/>
              </svg>
            </div>
            <span className="hidden md:block font-sans font-semibold text-base text-white">
              Willow&apos;s Personality Quiz
            </span>
            <div className="w-10" />
          </div>
        </header>

        {/* Results Content */}
        <div className="max-w-[800px] mx-auto flex flex-col justify-center min-h-[calc(100vh-120px)]">
          <div>
            <p className="font-heading font-semibold text-[22px] leading-7 tracking-tight text-slate-300">
              You are a...
            </p>
            <h1 className="font-heading font-semibold text-[30px] leading-9 tracking-tight text-white mt-2">
              {personalityResult.title}
            </h1>
            <p className="font-sans text-sm leading-5 text-white mt-8">
              {personalityResult.shortDescription}
            </p>
            <p className="font-sans font-semibold text-sm leading-5 text-white mt-4">
              Your Superpowers:
            </p>
          </div>

          {/* Superpowers */}
          <div className="mt-4">
            <SuperpowersList superpowers={superpowers} />
          </div>

          {/* Recommended Careers */}
          {personalityResult.recommendedCareers && personalityResult.recommendedCareers.length > 0 && (
            <div className="mt-8">
              <h3 className="font-heading font-semibold text-lg text-white mb-4">
                Recommended Careers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {personalityResult.recommendedCareers.slice(0, 4).map((career, index) => (
                  <div key={index} className="bg-white/10 rounded-xl p-4">
                    <p className="font-sans font-semibold text-sm text-white">{career.title}</p>
                    <p className="font-sans text-xs text-white/70 mt-1">{career.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-end mt-8 gap-4">
            <button
              onClick={handleRetake}
              className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Questions View
  return (
    <div className="min-h-screen bg-[#062F29] px-4 pb-4 overflow-y-auto">
      {/* Header */}
      <header className="py-4">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M20 4C11.164 4 4 11.164 4 20s7.164 16 16 16 16-7.164 16-16S28.836 4 20 4z" fill="white"/>
              <path d="M20 8c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8z" fill="#062F29"/>
              <path d="M20 12c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" fill="white"/>
            </svg>
          </div>
          <span className="hidden md:block font-sans font-semibold text-base text-white">
            Willow&apos;s Personality Quiz
          </span>
          <div className="w-10" />
        </div>
      </header>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="flex justify-center mt-0">
          {/* Left column - Back button */}
          <div className="w-1/6 flex flex-col justify-center items-start" style={{ height: "calc(100vh - 72px)" }}>
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 ml-4"
              >
                <ArrowLeft size={20} />
                Back
              </button>
            )}
          </div>

          {/* Center column - Question card */}
          <div className="w-2/3 max-w-[700px] relative" style={{ height: "calc(100vh - 72px)" }}>
            {/* Background decorative card */}
            <div
              className="absolute bg-[#D8FBDB] rounded-3xl"
              style={{
                height: "110%",
                width: "90%",
                transform: "rotate(-6deg)",
                top: "24px",
                left: 0,
              }}
              aria-hidden="true"
            />

            {/* Main content card */}
            <div
              className="relative flex flex-col p-14 rounded-3xl bg-white shadow-[0px_25px_60px_0px_rgba(16,24,40,0.20)]"
              style={{
                transform: "rotate(-2deg)",
                height: "110%",
                marginTop: "2px",
              }}
            >
              <QuizProgressBar current={currentQuestionIndex + 1} total={questions.length} />
              {currentQuestion && (
                <QuestionCard
                  question={currentQuestion}
                  selectedOptions={selectedOptions}
                  onOptionSelect={handleOptionSelect}
                />
              )}
            </div>
          </div>

          {/* Right column - Next button */}
          <div className="w-1/6 flex flex-col justify-center items-end" style={{ height: "calc(100vh - 72px)" }}>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 mr-4"
            >
              {isLastQuestion ? "Submit" : "Next"}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="mt-2">
          <QuizProgressBar current={currentQuestionIndex + 1} total={questions.length} />
          <div className="m-2 mt-4 bg-white rounded-2xl p-6">
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                selectedOptions={selectedOptions}
                onOptionSelect={handleOptionSelect}
              />
            )}
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="flex justify-between mt-4 items-center px-2">
          {currentQuestionIndex > 0 ? (
            <button
              onClick={handlePrevious}
              className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
          >
            {isLastQuestion ? "Submit" : "Next"}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
