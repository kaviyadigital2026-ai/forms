import React, { useEffect } from 'react';
import { QuizQuestion } from '../data/quizData';
import { Check, X, ArrowLeft, ArrowRight, Flag, HelpCircle, CheckCircle, Lightbulb, Clock } from 'lucide-react';
import { sound } from '../utils/sound';

interface QuizCardProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer?: 'A' | 'B' | 'C' | 'D';
  onSelectAnswer: (answer: 'A' | 'B' | 'C' | 'D') => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmitQuiz: () => void;
  isFlagged: boolean;
  onToggleFlag: () => void;
  mode: 'instant' | 'exam';
  timerSeconds: number;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onPrev,
  onSubmitQuiz,
  isFlagged,
  onToggleFlag,
  mode,
  timerSeconds,
}) => {
  const isAnswered = selectedAnswer !== undefined;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  // Format time mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        handleOptionClick(key as 'A' | 'B' | 'C' | 'D');
      } else if (e.key === 'ArrowRight' && !isLastQuestion) {
        onNext();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isLastQuestion, selectedAnswer, mode]);

  const handleOptionClick = (key: 'A' | 'B' | 'C' | 'D') => {
    if (mode === 'instant' && isAnswered) {
      // In instant mode, once answered, keep it to preserve the learning feedback
      return;
    }

    onSelectAnswer(key);

    if (mode === 'instant') {
      if (key === question.correctAnswer) {
        sound.playCorrect();
      } else {
        sound.playWrong();
      }
    } else {
      sound.playSelect();
    }
  };

  return (
    <div className="relative rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-8 shadow-2xl backdrop-blur-md">
      {/* Top Meta info row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-xs font-bold text-blue-400 border border-blue-500/30">
            #{question.id}
          </span>
          <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300">
            {question.category}
          </span>
          <span className="text-xs text-slate-400">
            கேள்வி {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Timer */}
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 px-2.5 py-1 text-xs font-mono font-medium text-slate-300 border border-slate-700/60">
            <Clock className="h-3.5 w-3.5 text-blue-400" />
            <span>{formatTime(timerSeconds)}</span>
          </div>

          {/* Flag button */}
          <button
            type="button"
            onClick={() => {
              sound.playSelect();
              onToggleFlag();
            }}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium border transition-colors ${
              isFlagged
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700/60 hover:text-slate-200'
            }`}
            title="Mark this question to review later"
          >
            <Flag className={`h-3.5 w-3.5 ${isFlagged ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span className="hidden sm:inline">{isFlagged ? 'Flagged' : 'Flag'}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed text-white">
          {question.question}
        </h2>
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.key;
          const isCorrect = option.key === question.correctAnswer;
          const showInstantFeedback = mode === 'instant' && isAnswered;

          let buttonStyle = 'border-slate-800 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-700 text-slate-200';
          let badgeStyle = 'bg-slate-800 text-slate-300 border-slate-700';

          if (showInstantFeedback) {
            if (isCorrect) {
              buttonStyle = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 ring-2 ring-emerald-500/30';
              badgeStyle = 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold';
            } else if (isSelected) {
              buttonStyle = 'border-red-500/80 bg-red-950/40 text-red-200 ring-2 ring-red-500/30';
              badgeStyle = 'bg-red-500 text-white border-red-400 font-bold';
            } else {
              buttonStyle = 'border-slate-800/60 bg-slate-900/30 opacity-60 text-slate-400';
            }
          } else if (isSelected) {
            buttonStyle = 'border-blue-500 bg-blue-950/40 text-white ring-2 ring-blue-500/30 shadow-md shadow-blue-500/10';
            badgeStyle = 'bg-blue-500 text-white border-blue-400 font-bold';
          }

          return (
            <button
              key={option.key}
              type="button"
              onClick={() => handleOptionClick(option.key)}
              className={`group flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-200 ${buttonStyle}`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-sm font-semibold transition-all ${badgeStyle}`}
                >
                  {showInstantFeedback && isCorrect ? (
                    <Check className="h-5 w-5 stroke-[2.5]" />
                  ) : showInstantFeedback && isSelected ? (
                    <X className="h-5 w-5 stroke-[2.5]" />
                  ) : (
                    option.key
                  )}
                </span>
                <span className="text-sm sm:text-base font-medium leading-normal">
                  {option.text}
                </span>
              </div>

              {/* Status indicator on the right */}
              {showInstantFeedback && isCorrect && (
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                  <CheckCircle className="h-3.5 w-3.5" />
                  சரி (Correct)
                </span>
              )}
              {showInstantFeedback && isSelected && !isCorrect && (
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-semibold text-red-400 border border-red-500/30">
                  தவறு (Wrong)
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Instant Explanation in Practice Mode */}
      {mode === 'instant' && isAnswered && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900/60 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-blue-500/20 p-2 text-blue-400 shrink-0">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  சரியான விடை விளக்கம் (Explanation)
                </span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/30">
                  Option {question.correctAnswer}
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {question.explanationTamil}
              </p>
              <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-800 text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-sky-300">💡 முக்கிய குறிப்பு (Concept Note):</p>
                <p>{question.conceptNote}</p>
                {question.formulaOrTip && (
                  <p className="mt-1 font-mono text-[11px] text-amber-300 bg-amber-950/30 p-1.5 rounded border border-amber-500/20">
                    📌 {question.formulaOrTip}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={() => {
            sound.playSelect();
            onPrev();
          }}
          disabled={currentIndex === 0}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-800/60 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>முந்தைய கேள்வி (Previous)</span>
        </button>

        <div className="text-[11px] text-slate-500 hidden sm:block">
          Use keyboard keys: <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">A</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">B</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">C</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">D</kbd>
        </div>

        {isLastQuestion ? (
          <button
            type="button"
            onClick={() => {
              sound.playSelect();
              onSubmitQuiz();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/30"
          >
            <span>முடிவு செய்க (Finish Test)</span>
            <CheckCircle className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              sound.playSelect();
              onNext();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] hover:shadow-blue-500/30"
          >
            <span>அடுத்த கேள்வி (Next)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
