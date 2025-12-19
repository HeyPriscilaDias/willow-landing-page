"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight, Star, Briefcase, Target, BookOpen, Heart, Quotes, EnvelopeSimple } from "phosphor-react";
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
  workStyle: string;
  personalGoals: string[];
  studyTips: string[];
  relationshipTips: string;
  whatItMeans: string;
  areasToImprove: string;
  recommendedCareersOpening: string;
  recommendedCareers: Array<{
    onetCode: string;
    title: string;
    description: string;
  }>;
  possibleMajors: Array<{
    title: string;
    description: string;
  }>;
  inspirationalQuotes: Array<{
    quote: string;
    name: string;
    description: string;
  }>;
}

type QuizView = "start" | "questions" | "email" | "results";

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
      const key = `${holland}_${big5}`;
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
      <h2 className="font-heading font-semibold text-[30px] leading-9 tracking-tight text-heading">
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

// localStorage key for persisting quiz state
const STORAGE_KEY = "willow-personality-quiz";

// Main Quiz Page Component
export default function PersonalityQuizPage() {
  const [view, setView] = useState<QuizView>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [personalityResult, setPersonalityResult] = useState<PersonalityType | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Load saved state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.personalityResultId) {
          // Find the personality type by ID
          const result = (personalityTypes as PersonalityType[]).find(
            pt => pt.id === parsed.personalityResultId
          );
          if (result) {
            setPersonalityResult(result);
            setView("results");
            setAnswers(parsed.answers || []);
          }
        }
      }
    } catch (e) {
      // Ignore localStorage errors
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when quiz is completed
  useEffect(() => {
    if (isHydrated && view === "results" && personalityResult) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          personalityResultId: personalityResult.id,
          answers: answers,
          completedAt: new Date().toISOString(),
        }));
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  }, [isHydrated, view, personalityResult, answers]);

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
      // Calculate results and store them, but go to email capture first
      const resultId = calculateResults(updatedAnswers);
      const result = (personalityTypes as PersonalityType[]).find(
        pt => pt.id === resultId
      );

      if (result) {
        setPersonalityResult(result);
      } else {
        // Fallback to first personality type if no match found
        setPersonalityResult(personalityTypes[0] as PersonalityType);
      }
      setView("email");
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
    // Clear localStorage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // Ignore localStorage errors
    }
    setView("start");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOptions([]);
    setPersonalityResult(null);
    setEmail("");
    setEmailError("");
  }, []);

  // Handle email submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Please enter your email address.");
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quiz-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          personalityTypeId: personalityResult?.id || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setEmailError(data.error || "Failed to submit email. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Success - proceed to results
      setView("results");
    } catch (error) {
      console.error("Email submission error:", error);
      setEmailError("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  }, [email, personalityResult]);

  // Show loading state until hydrated to prevent flash
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#062F29] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

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

  // Email Capture View
  if (view === "email") {
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

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] max-w-[500px] mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-[#D8FBDB] flex items-center justify-center mb-6">
            <EnvelopeSimple size={32} className="text-heading" />
          </div>

          <h1 className="font-heading font-semibold text-[32px] md:text-[40px] leading-[130%] tracking-tight text-white">
            Your results are ready!
          </h1>

          <p className="mt-4 font-sans text-base leading-6 text-neutral-300">
            To see your results, enter your email address below.
          </p>

          <form onSubmit={handleEmailSubmit} className="w-full mt-8">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${
                  emailError ? "border-red-400" : "border-white/20"
                } text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors`}
              />
            </div>
            {emailError && (
              <p className="mt-2 text-sm text-red-400 text-left">{emailError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 px-8 py-3 bg-[#D8FBDB] hover:bg-[#c8f0cb] disabled:bg-[#D8FBDB]/50 disabled:cursor-not-allowed text-heading font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  Submit &amp; See Results
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 font-sans text-xs text-neutral-400">
            We&apos;ll send you a copy of your results and occasional updates about Willow.
          </p>
        </div>
      </div>
    );
  }

  // Results View
  if (view === "results" && personalityResult) {
    const superpowers = parseSuperpowers(personalityResult.superpowers);
    const personalGoals = personalityResult.personalGoals || [];
    const studyTips = personalityResult.studyTips || [];
    const inspirationalQuotes = personalityResult.inspirationalQuotes || [];

    return (
      <div className="min-h-screen bg-[#F5F5F3]">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-5 md:px-10 py-4">
            <div className="flex items-center justify-between">
              <div className="h-8 w-8">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M20 4C11.164 4 4 11.164 4 20s7.164 16 16 16 16-7.164 16-16S28.836 4 20 4z" fill="#062F29"/>
                  <path d="M20 8c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8z" fill="#F5F5F3"/>
                  <path d="M20 12c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" fill="#062F29"/>
                </svg>
              </div>
              <span className="font-sans font-semibold text-base text-heading">
                Your Results
              </span>
              <button
                onClick={handleRetake}
                className="text-sm text-heading hover:underline"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-5 md:px-10 pb-16">
          {/* Personality Type Header */}
          <div className="bg-[#0A4A42] rounded-xl p-6 md:p-8 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Star size={24} className="text-white" weight="fill" />
              <span className="font-sans font-semibold text-white">Your personality type</span>
            </div>
            <div className="md:flex md:gap-8">
              {/* Personality Type Image */}
              <div className="mb-6 md:mb-0 md:flex-shrink-0">
                <img
                  src={`/personality-type-images/${personalityResult.id.toUpperCase().replace(/-/g, "")}.jpg`}
                  alt={personalityResult.title}
                  className="w-full md:w-80 h-auto rounded-xl object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="font-heading font-semibold text-3xl md:text-4xl text-white mb-4">
                  {personalityResult.title}
                </h1>
                <p className="font-sans text-white/90 leading-relaxed">
                  {personalityResult.shortDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Superpowers Section */}
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-6">
              <Star size={24} className="text-heading" />
              <h2 className="font-heading font-semibold text-2xl text-heading">
                Your super powers
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {superpowers.map((superpower, index) => {
                const parts = superpower.split(/[:–-]/).map(part => part.trim());
                const title = parts[0] || superpower;
                const description = parts.slice(1).join(": ").trim() || "";
                return (
                  <div key={index} className="bg-neutral-100 rounded-xl p-4">
                    <h3 className="font-sans font-semibold text-heading">{title}</h3>
                    {description && (
                      <p className="font-sans text-sm text-neutral-600 mt-2">{description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Work Style Section */}
          {personalityResult.workStyle && (
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase size={24} className="text-heading" />
                <h2 className="font-heading font-semibold text-2xl text-heading">
                  Your work style
                </h2>
              </div>
              <p className="font-sans text-neutral-700 leading-relaxed">
                {personalityResult.workStyle}
              </p>
            </div>
          )}

          {/* Personal Development Goals */}
          {personalGoals.length > 0 && (
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-6">
                <Target size={24} className="text-heading" />
                <h2 className="font-heading font-semibold text-2xl text-heading">
                  Personal development goals
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {personalGoals.map((goal, index) => {
                  const parts = goal.split(":").map(part => part.trim());
                  const title = parts[0] || goal;
                  const body = parts.slice(1).join(": ").trim() || "";
                  return (
                    <div key={index} className="border border-neutral-200 rounded-xl p-4">
                      <div className="w-10 h-10 rounded-full bg-[#D8FBDB] flex items-center justify-center mb-3">
                        <Target size={20} className="text-heading" />
                      </div>
                      <h3 className="font-sans font-semibold text-heading mb-2">{title}</h3>
                      {body && (
                        <p className="font-sans text-sm text-neutral-600">{body}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Study Tips & Relationship Tips Side by Side */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Study Tips */}
            {studyTips.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen size={24} className="text-heading" />
                  <h2 className="font-heading font-semibold text-2xl text-heading">
                    Study tips
                  </h2>
                </div>
                <div className="space-y-4">
                  {studyTips.map((tip, index) => {
                    const parts = tip.split(":").map(part => part.trim());
                    const title = parts[0] || tip;
                    const body = parts.slice(1).join(": ").trim() || "";
                    return (
                      <div key={index} className="border-b border-neutral-200 pb-4 last:border-b-0">
                        <h3 className="font-sans font-semibold text-heading">{title}</h3>
                        {body && (
                          <p className="font-sans text-sm text-neutral-600 mt-1">{body}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Relationship Tips */}
            {personalityResult.relationshipTips && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Heart size={24} className="text-heading" />
                  <h2 className="font-heading font-semibold text-2xl text-heading">
                    Relationship tips
                  </h2>
                </div>
                <p className="font-sans text-neutral-600 leading-relaxed">
                  {personalityResult.relationshipTips}
                </p>
              </div>
            )}
          </div>

          {/* Recommended Careers */}
          {personalityResult.recommendedCareers && personalityResult.recommendedCareers.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading font-semibold text-2xl text-heading mb-6">
                Recommended Careers
              </h2>
              {personalityResult.recommendedCareersOpening && (
                <p className="font-sans text-neutral-600 mb-6">
                  {personalityResult.recommendedCareersOpening}
                </p>
              )}
              <div className="bg-white rounded-xl overflow-hidden border border-neutral-200">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                  <span className="font-sans font-semibold text-sm text-neutral-700">Career</span>
                  <span className="font-sans font-semibold text-sm text-neutral-700">Description</span>
                </div>
                {/* Career rows */}
                {personalityResult.recommendedCareers.map((career, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-4 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#D8FBDB] flex items-center justify-center">
                        <Star size={20} className="text-heading" />
                      </div>
                      <span className="font-sans font-semibold text-heading">{career.title}</span>
                    </div>
                    <p className="font-sans text-sm text-neutral-600 max-w-md text-right">
                      {career.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Possible Majors */}
          {personalityResult.possibleMajors && personalityResult.possibleMajors.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading font-semibold text-2xl text-heading mb-6">
                Possible Majors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {personalityResult.possibleMajors.map((major, index) => (
                  <div key={index} className="bg-white border border-neutral-200 rounded-xl p-4">
                    <h3 className="font-sans font-semibold text-heading">{major.title}</h3>
                    <p className="font-sans text-sm text-neutral-600 mt-2">{major.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inspirational Quotes */}
          {inspirationalQuotes.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading font-semibold text-2xl text-heading mb-6">
                Inspiration from famous mentors
              </h2>
              <div className="space-y-4">
                {inspirationalQuotes.map((quote, index) => (
                  <div key={index} className="bg-neutral-100 rounded-xl p-6">
                    <p className="font-sans text-lg text-neutral-700 italic mb-6">
                      &ldquo;{quote.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-neutral-300 border-2 border-[#D8FBDB] flex items-center justify-center">
                          <span className="font-sans font-bold text-neutral-600">
                            {quote.name.charAt(0)}
                          </span>
                        </div>
                        <div className="absolute -right-2 top-1 w-8 h-8 rounded-full bg-[#D8FBDB] flex items-center justify-center">
                          <Quotes size={16} className="text-heading" />
                        </div>
                      </div>
                      <div className="ml-2">
                        <p className="font-sans font-semibold text-heading">{quote.name}</p>
                        <p className="font-sans text-sm text-neutral-600">{quote.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Retake Quiz Button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleRetake}
              className="px-8 py-3 bg-[#062F29] hover:bg-[#0A4A42] text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
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
