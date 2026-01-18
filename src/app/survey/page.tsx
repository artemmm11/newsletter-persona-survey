'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { questions, TOTAL_QUESTIONS } from '@/config/survey';
import { calculateTraits, determinePersona, encodeResultsToUrl } from '@/lib/scoring';
import { saveProgress, loadProgress, clearProgress, SurveyProgress } from '@/lib/storage';

export default function SurveyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = loadProgress();
    if (saved && !saved.completedAt) {
      setCurrentStep(saved.currentStep);
      setAnswers(saved.answers);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveProgress({ currentStep, answers });
    }
  }, [currentStep, answers, isLoaded]);

  const currentQuestion = questions[currentStep];
  const selectedAnswer = answers[currentQuestion?.id];
  const canGoNext = !!selectedAnswer;
  const canGoBack = currentStep > 0;
  const isLastStep = currentStep === TOTAL_QUESTIONS - 1;

  const handleSelectAnswer = (answerId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answerId }));
  };

  const handleNext = () => {
    if (!canGoNext) return;

    if (isLastStep) {
      const traits = calculateTraits(answers, questions);
      const persona = determinePersona(traits);
      const resultUrl = encodeResultsToUrl(persona, traits);
      
      saveProgress({ currentStep, answers, completedAt: new Date().toISOString() });
      router.push(resultUrl);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (canGoBack) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-500">
              Question {currentStep + 1} of {TOTAL_QUESTIONS}
            </span>
            <span className="text-sm font-medium text-slate-500">
              {Math.round(((currentStep + 1) / TOTAL_QUESTIONS) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / TOTAL_QUESTIONS) * 100}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-tight">
              {currentQuestion.question}
            </h2>

            <div className="grid gap-3">
              {currentQuestion.answers.map((answer, index) => {
                const isSelected = selectedAnswer === answer.id;
                return (
                  <motion.button
                    key={answer.id}
                    onClick={() => handleSelectAnswer(answer.id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      group relative w-full text-left p-5 rounded-xl border-2 transition-all duration-200
                      ${isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                          ${isSelected
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-slate-300 group-hover:border-slate-400'
                          }
                        `}
                      >
                        {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <span
                        className={`text-base md:text-lg font-medium ${
                          isSelected ? 'text-blue-900' : 'text-slate-700'
                        }`}
                      >
                        {answer.text}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-auto pt-8 flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            disabled={!canGoBack}
            className={`
              flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all
              ${canGoBack
                ? 'text-slate-700 hover:bg-slate-100 active:scale-[0.98]'
                : 'text-slate-300 cursor-not-allowed'
              }
            `}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
              ${canGoNext
                ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl active:scale-[0.98]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }
            `}
          >
            {isLastStep ? 'See Results' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
