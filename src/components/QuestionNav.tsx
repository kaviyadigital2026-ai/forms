import React from 'react';
import { Flag, Check } from 'lucide-react';
import { sound } from '../utils/sound';

interface QuestionNavProps {
  totalQuestions: number;
  currentIndex: number;
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  flaggedQuestions: Record<number, boolean>;
  onSelectQuestion: (index: number) => void;
}

export const QuestionNav: React.FC<QuestionNavProps> = ({
  totalQuestions,
  currentIndex,
  userAnswers,
  flaggedQuestions,
  onSelectQuestion,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
      {Array.from({ length: totalQuestions }).map((_, index) => {
        const questionNumber = index + 1;
        const isCurrent = currentIndex === index;
        const isAnswered = userAnswers[questionNumber] !== undefined;
        const isFlagged = flaggedQuestions[questionNumber];

        let stateClasses = "bg-slate-800/80 text-slate-400 border-slate-700/60 hover:bg-slate-700";

        if (isCurrent) {
          stateClasses = "bg-blue-600 text-white font-bold ring-2 ring-blue-400 shadow-md shadow-blue-600/30 border-blue-500";
        } else if (isAnswered) {
          stateClasses = "bg-emerald-950/40 text-emerald-300 border-emerald-600/50 hover:bg-emerald-900/50";
        }

        return (
          <button
            key={index}
            onClick={() => {
              sound.playSelect();
              onSelectQuestion(index);
            }}
            className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border text-xs sm:text-sm font-semibold transition-all ${stateClasses}`}
            title={`Question ${questionNumber}${isAnswered ? ' (Answered)' : ''}${isFlagged ? ' (Flagged)' : ''}`}
          >
            <span>{questionNumber}</span>

            {/* Answered check mark small dot */}
            {isAnswered && !isCurrent && (
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
            )}

            {/* Flag indicator */}
            {isFlagged && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-sm">
                <Flag className="h-2 w-2 fill-slate-950" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
