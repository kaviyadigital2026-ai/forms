import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { Printer, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface PrintableViewProps {
  onBackToQuiz?: () => void;
}

export const PrintableView: React.FC<PrintableViewProps> = ({ onBackToQuiz }) => {
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  const handlePrint = () => {
    sound.playSelect();
    window.print();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Controls Bar (hidden during print) */}
      <div className="print:hidden mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
        <div className="flex items-center gap-3">
          {onBackToQuiz && (
            <button
              onClick={() => {
                sound.playSelect();
                onBackToQuiz();
              }}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <span>← Back to Quiz</span>
            </button>
          )}
          <div>
            <h2 className="text-base font-bold text-white">
              🖨️ Printable Question Paper Mode
            </h2>
            <p className="text-xs text-slate-400">
              மாணவர்கள், பயிற்சிகளுக்கு கேள்வித்தாளாக அச்சிட (Print) அல்லது PDF சேமிக்க பயன்படுத்தலாம்.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playSelect();
              setShowAnswerKey(!showAnswerKey);
            }}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
          >
            {showAnswerKey ? <EyeOff className="h-4 w-4 text-amber-400" /> : <Eye className="h-4 w-4 text-emerald-400" />}
            <span>{showAnswerKey ? 'விடைக்குறிப்பை மறைக்க (Hide Answers)' : 'விடைக்குறிப்பைக் காட்டுக (Show Answers)'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 shadow-md shadow-blue-600/20"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 print:border-none print:bg-white print:p-0 print:text-black">
        {/* Paper Header */}
        <div className="border-b-2 border-slate-700 pb-5 mb-6 text-center print:border-black">
          <h1 className="text-2xl sm:text-3xl font-black text-white print:text-black">
            🚀 Meta Ads Knowledge Test
          </h1>
          <p className="text-sm font-medium text-slate-300 print:text-gray-700 mt-1">
            Meta Ads பற்றி உங்களுக்கு எவ்வளவு தெரியும்? இந்த short quiz-ஐ complete பண்ணி உங்கள் knowledge-ஐ test பண்ணுங்க!
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-400 print:border-gray-300 print:text-gray-600">
            <div>
              <span className="font-semibold text-slate-200 print:text-black">பெயர் (Candidate Name):</span> ___________________________
            </div>
            <div>
              <span className="font-semibold text-slate-200 print:text-black">தேதி (Date):</span> _______________
            </div>
            <div>
              <span className="font-semibold text-slate-200 print:text-black">நேரம் (Time):</span> 15 Minutes
            </div>
            <div>
              <span className="font-semibold text-slate-200 print:text-black">மதிப்பெண் (Marks):</span> ___ / 10
            </div>
          </div>
        </div>

        {/* 10 Questions */}
        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q, index) => {
            return (
              <div
                key={q.id}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 print:border-gray-300 print:bg-transparent print:p-2"
              >
                <div className="flex items-start gap-2 mb-3">
                  <span className="font-bold text-white print:text-black text-sm">
                    {index + 1}.
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-white print:text-black text-sm sm:text-base leading-snug">
                      {q.question}
                    </p>
                  </div>
                </div>

                {/* Options 2x2 grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                  {q.options.map((opt) => {
                    const isCorrect = showAnswerKey && opt.key === q.correctAnswer;
                    return (
                      <div
                        key={opt.key}
                        className={`flex items-center gap-2.5 rounded-lg border p-2 text-xs sm:text-sm ${
                          isCorrect
                            ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300 font-semibold print:bg-gray-100 print:text-black print:font-bold'
                            : 'border-slate-800 text-slate-300 print:border-gray-200 print:text-gray-800'
                        }`}
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-600 print:border-black text-xs font-bold">
                          {isCorrect ? '✓' : opt.key}
                        </span>
                        <span>{opt.text}</span>
                        {isCorrect && (
                          <span className="ml-auto text-[11px] font-bold text-emerald-400 print:text-black">
                            ✅ விடை
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Show explanation if answer key enabled */}
                {showAnswerKey && (
                  <div className="mt-3 pl-4 text-xs text-slate-400 print:text-gray-600 border-l-2 border-blue-500 pl-3">
                    <p className="font-semibold text-blue-300 print:text-black">விளக்கம்: {q.explanationTamil}</p>
                    {q.formulaOrTip && (
                      <p className="font-mono text-[11px] text-amber-300 print:text-gray-800 mt-0.5">📌 {q.formulaOrTip}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Answer Key Table at bottom if enabled */}
        {showAnswerKey && (
          <div className="mt-8 border-t-2 border-slate-700 pt-5 print:border-black">
            <h3 className="font-bold text-white print:text-black text-sm mb-2 flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-400 print:text-black" />
              <span>விடைக்குறிப்பு அட்டவணை (Answer Key):</span>
            </h3>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 text-center text-xs font-bold">
              {QUIZ_QUESTIONS.map((q) => (
                <div key={q.id} className="rounded border border-slate-700 p-1.5 bg-slate-800 print:bg-gray-100 print:border-black">
                  <div className="text-[10px] text-slate-400 print:text-gray-600">Q{q.id}</div>
                  <div className="text-emerald-400 print:text-black font-extrabold">{q.correctAnswer}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
