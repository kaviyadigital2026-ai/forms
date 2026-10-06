import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from './data/quizData';
import { sound } from './utils/sound';
import { CheckCircle2, XCircle, RotateCcw, Send, Award, Sparkles, AlertTriangle, X, ArrowRight } from 'lucide-react';
import { ConfettiCanvas } from './components/ConfettiCanvas';

export default function App() {
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState<boolean>(false);
  const [unansweredIds, setUnansweredIds] = useState<number[]>([]);

  const handleSelectOption = (questionId: number, optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return; // Locked once submitted until reset
    sound.playSelect();
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = QUIZ_QUESTIONS.filter((q) => !userAnswers[q.id]).map((q) => q.id);

    if (missing.length > 0) {
      setUnansweredIds(missing);
      setShowIncompleteModal(true);
      sound.playWrong();
      return;
    }

    setIsSubmitted(true);

    // Calculate score
    const score = QUIZ_QUESTIONS.reduce((acc, q) => {
      return acc + (userAnswers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);

    if (score >= 6) {
      sound.playVictory();
      setShowConfetti(true);
    } else {
      sound.playCorrect();
    }

    // Smooth scroll to top to see score
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToQuestion = (questionId: number) => {
    setShowIncompleteModal(false);
    setTimeout(() => {
      const element = document.getElementById(`question-${questionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-4', 'ring-amber-400');
        setTimeout(() => {
          element.classList.remove('ring-4', 'ring-amber-400');
        }, 1800);
      }
    }, 100);
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setShowConfetti(false);
    setShowIncompleteModal(false);
    sound.playSelect();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate score
  const totalScore = QUIZ_QUESTIONS.reduce((acc, q) => {
    return acc + (userAnswers[q.id] === q.correctAnswer ? 1 : 0);
  }, 0);
  const percentage = Math.round((totalScore / QUIZ_QUESTIONS.length) * 100);
  const answeredTotal = Object.keys(userAnswers).length;

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-10 px-4 sm:px-6 font-sans text-slate-800 selection:bg-blue-600 selection:text-white">
      {showConfetti && <ConfettiCanvas />}

      <div className="max-w-3xl mx-auto space-y-5">
        {/* Top Header Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Top accent bar */}
          <div className="h-3 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500" />

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
                <Sparkles className="h-3.5 w-3.5" />
                10 Questions
              </span>
              <span className="text-xs text-slate-500">
                Tamil & English
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              🚀 Meta Ads Knowledge Test
            </h1>

            <div className="mt-3 text-sm sm:text-base text-slate-600 space-y-1 leading-relaxed">
              <p className="font-medium text-slate-700">
                Meta Ads பற்றி உங்களுக்கு எவ்வளவு தெரியும்? 🤔
              </p>
              <p>
                இந்த short quiz-ஐ complete பண்ணி உங்கள் knowledge-ஐ test பண்ணுங்க!
              </p>
            </div>

            {/* Score Banner after submission */}
            {isSubmitted && (
              <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/70 p-5 sm:p-6 text-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Award className="h-6 w-6 text-amber-500" />
                      <h2 className="text-lg font-bold text-slate-900">
                        தேர்வு முடிவு (Quiz Result)
                      </h2>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      {percentage >= 80
                        ? "அபாரமான அறிவு! Meta Ads-ல் நீங்கள் மிகச் சிறந்த நிபுணர் 🚀"
                        : percentage >= 60
                        ? "நல்ல செயல்திறன்! வலுவான அடிப்படை அறிவு பெற்றுள்ளீர்கள் 👍"
                        : "நல்ல முயற்சி! கீழே உள்ள விளக்கங்களை படித்து தெரிந்து கொள்ளுங்கள் 💡"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white px-4 py-2 text-center border border-blue-200 shadow-sm">
                      <p className="text-xs text-slate-500 font-semibold">மதிப்பெண்</p>
                      <p className="text-2xl font-black text-blue-600">
                        {totalScore} / {QUIZ_QUESTIONS.length}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 transition-colors shadow-sm"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>மீண்டும் எழுதுக (Retake)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Questions Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {QUIZ_QUESTIONS.map((q, index) => {
            const userChoice = userAnswers[q.id];
            const isCorrect = userChoice === q.correctAnswer;

            let cardBorder = "border-slate-200 bg-white";
            if (isSubmitted) {
              cardBorder = isCorrect
                ? "border-emerald-300 bg-emerald-50/20"
                : "border-red-300 bg-red-50/20";
            }

            return (
              <div
                key={q.id}
                id={`question-${q.id}`}
                className={`rounded-2xl border p-5 sm:p-7 shadow-sm transition-all duration-300 ${cardBorder}`}
              >
                {/* Question Line */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-700">
                      {index + 1}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h2>
                  </div>

                  {/* Submission outcome badge */}
                  {isSubmitted && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          Right ✅
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800">
                          <XCircle className="h-4 w-4 text-red-600" />
                          Wrong ❌
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-2.5 pl-0 sm:pl-9">
                  {q.options.map((opt) => {
                    const isSelected = userChoice === opt.key;
                    const isTheCorrectAnswer = opt.key === q.correctAnswer;

                    let optionStyle = "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 text-slate-700";
                    let radioCircle = "border-slate-300 text-transparent";

                    if (isSubmitted) {
                      if (isTheCorrectAnswer) {
                        optionStyle = "border-emerald-400 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-400";
                        radioCircle = "border-emerald-600 bg-emerald-600 text-white";
                      } else if (isSelected && !isTheCorrectAnswer) {
                        optionStyle = "border-red-400 bg-red-50 text-red-950 line-through opacity-80";
                        radioCircle = "border-red-600 bg-red-600 text-white";
                      } else {
                        optionStyle = "border-slate-200 bg-slate-50/50 text-slate-400 opacity-60";
                      }
                    } else if (isSelected) {
                      optionStyle = "border-blue-600 bg-blue-50/80 text-blue-950 font-semibold ring-1 ring-blue-600 shadow-xs";
                      radioCircle = "border-blue-600 bg-blue-600 text-white";
                    }

                    return (
                      <label
                        key={opt.key}
                        onClick={() => handleSelectOption(q.id, opt.key)}
                        className={`flex items-center justify-between rounded-xl border p-3 sm:p-3.5 cursor-pointer transition-all ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Radio circle */}
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${radioCircle}`}
                          >
                            <span className="h-2 w-2 rounded-full bg-white" />
                          </div>

                          <div className="text-sm sm:text-base leading-normal">
                            <span className="font-bold mr-2 text-slate-900">{opt.key})</span>
                            <span>{opt.text}</span>
                          </div>
                        </div>

                        {/* Status text if submitted */}
                        {isSubmitted && isTheCorrectAnswer && (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                            Right ✅
                          </span>
                        )}
                        {isSubmitted && isSelected && !isTheCorrectAnswer && (
                          <span className="text-xs font-bold text-red-600 bg-red-100/80 px-2 py-0.5 rounded-md">
                            Wrong ❌
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Bottom Action Bar */}
          <div className="sticky bottom-4 z-20 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-slate-600">
              <span className="font-bold text-slate-900">{answeredTotal}</span> of{' '}
              <span className="font-bold text-slate-900">{QUIZ_QUESTIONS.length}</span> questions answered
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {isSubmitted ? (
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>மீண்டும் முயற்சி செய்க (Reset Test)</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 active:scale-[0.98]"
                >
                  <Send className="h-4 w-4" />
                  <span>விடை சமர்ப்பிக்க (Submit Answers)</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Incomplete / Unanswered Questions Popup Modal */}
      {showIncompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-100 text-center animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowIncompleteModal(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Warning Icon */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 border border-amber-200/60 shadow-inner">
              <AlertTriangle className="h-8 w-8 stroke-[2.3]" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              Please fill all questions!
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              நீங்கள் <span className="font-bold text-slate-900">{answeredTotal}</span> / <span className="font-bold text-slate-900">{QUIZ_QUESTIONS.length}</span> கேள்விகளுக்கு மட்டுமே பதிலளித்துள்ளீர்கள். தேர்வைச் சமர்ப்பிக்க அனைத்து கேள்விகளுக்கும் விடையளிக்கவும்.
            </p>

            {/* Missing Questions Badges */}
            <div className="mb-6 rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5">
              <p className="text-xs font-semibold text-slate-500 mb-2 text-left">
                விடுபட்ட கேள்விகள் (Unanswered Questions):
              </p>
              <div className="flex flex-wrap gap-1.5 justify-start">
                {unansweredIds.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleJumpToQuestion(id)}
                    className="flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50/80 px-2.5 py-1 text-xs font-bold text-amber-900 hover:bg-amber-100 transition-colors"
                    title={`Go to Question ${id}`}
                  >
                    <span>Q{id}</span>
                    <ArrowRight className="h-3 w-3 opacity-60" />
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleJumpToQuestion(unansweredIds[0] || 1)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
              >
                <span>சரி, பதிலளிக்கிறேன் (Fill Questions)</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setShowIncompleteModal(false)}
                className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                மூடுக
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
