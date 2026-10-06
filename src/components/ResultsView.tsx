import React, { useState } from 'react';
import { QuizQuestion, getRankBadge } from '../data/quizData';
import { Trophy, Clock, CheckCircle2, XCircle, RotateCcw, Award, Share2, Copy, BookOpen, Check, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface ResultsViewProps {
  questions: QuizQuestion[];
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  timeSpentSeconds: number;
  onRetake: () => void;
  onOpenCertificate: () => void;
  onOpenGuide: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  questions,
  userAnswers,
  timeSpentSeconds,
  onRetake,
  onOpenCertificate,
  onOpenGuide,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [copied, setCopied] = useState(false);

  // Calculate score
  let correctCount = 0;
  questions.forEach((q) => {
    if (userAnswers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / questions.length) * 100);
  const badge = getRankBadge(percentage);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const handleCopySummary = () => {
    const text = `🚀 Meta Ads Knowledge Test Result:
🎯 Score: ${correctCount}/${questions.length} (${percentage}%)
🏆 Rank: ${badge.title} (${badge.titleTamil})
⏱️ Time: ${formatTime(timeSpentSeconds)}

Meta Ads பற்றி உங்கள் அறிவை நீங்களும் test பண்ணி பாருங்க!`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    sound.playSelect();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = `🚀 *Meta Ads Knowledge Test Result* 🚀%0A%0A🎯 *Score:* ${correctCount}/${questions.length} (${percentage}%)%0A🏆 *Rank:* ${badge.title} (${badge.titleTamil})%0A⏱️ *Time:* ${formatTime(timeSpentSeconds)}%0A%0AMeta Ads பற்றி உங்களுக்கு எவ்வளவு தெரியும்? இந்த short quiz-ஐ attend பண்ணி உங்க அறிவை test பண்ணுங்க! 👇%0A${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const filteredQuestions = questions.filter((q) => {
    const isCorrect = userAnswers[q.id] === q.correctAnswer;
    if (filter === 'correct') return isCorrect;
    if (filter === 'incorrect') return !isCorrect;
    return true;
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Score Summary Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center">
          {/* Badge Icon */}
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-500/20 via-yellow-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 shadow-xl shadow-amber-500/10">
            <Trophy className="h-10 w-10 animate-bounce" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-3.5 py-1 text-xs font-semibold text-slate-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Test Completed Successfully</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            உங்கள் மதிப்பெண் (Your Score)
          </h1>

          <div className="my-5 flex items-baseline justify-center gap-2">
            <span className="text-5xl sm:text-7xl font-black tracking-tight text-white">
              {correctCount}
            </span>
            <span className="text-2xl sm:text-3xl font-semibold text-slate-500">
              / {questions.length}
            </span>
            <span className="ml-3 rounded-2xl bg-blue-500/20 px-3.5 py-1.5 text-xl sm:text-2xl font-bold text-blue-400 border border-blue-500/30">
              {percentage}%
            </span>
          </div>

          {/* Rank Badge */}
          <div className="mx-auto max-w-md rounded-2xl border border-slate-800 bg-slate-800/50 p-4 mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">விருது / தகுதி நிலை (Status):</p>
            <p className="text-lg sm:text-xl font-extrabold text-white">
              {badge.title}
            </p>
            <p className="text-sm font-medium text-amber-300 mt-0.5">
              ({badge.titleTamil})
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {badge.description}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <p className="text-xs text-slate-400">சரியான விடைகள்</p>
              <p className="text-xl font-bold text-emerald-400">{correctCount}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <p className="text-xs text-slate-400">தவறான விடைகள்</p>
              <p className="text-xl font-bold text-red-400">{questions.length - correctCount}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <p className="text-xs text-slate-400">நேரம் (Time Taken)</p>
              <p className="text-xl font-bold text-white">{formatTime(timeSpentSeconds)}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <p className="text-xs text-slate-400">தேர்ச்சி நிலை</p>
              <p className={`text-xl font-bold ${percentage >= 60 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {percentage >= 60 ? 'PASSED ✅' : 'PRACTICE 📚'}
              </p>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                sound.playSelect();
                onOpenCertificate();
              }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all"
            >
              <Award className="h-4 w-4" />
              <span>சான்றிதழ் பெறுக (Get Certificate)</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-[#20bd5a] transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share to WhatsApp</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied!' : 'Copy Result'}</span>
            </button>

            <button
              onClick={() => {
                sound.playSelect();
                onRetake();
              }}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Question by Question Review Header */}
      <div className="mt-10 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white">
            கேள்வி வாரியான விளக்கங்கள் (Review Answers)
          </h2>
          <p className="text-xs text-slate-400">
            ஒவ்வொரு கேள்விக்கும் சரியான விடை மற்றும் தமிழ் விளக்கத்தை இங்கே விரிவாகப் பாருங்கள்.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-lg px-3 py-1 font-semibold transition-all ${
              filter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            அனைத்தும் ({questions.length})
          </button>
          <button
            onClick={() => setFilter('correct')}
            className={`rounded-lg px-3 py-1 font-semibold transition-all ${
              filter === 'correct' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            சரி ({correctCount})
          </button>
          <button
            onClick={() => setFilter('incorrect')}
            className={`rounded-lg px-3 py-1 font-semibold transition-all ${
              filter === 'incorrect' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            தவறு ({questions.length - correctCount})
          </button>
        </div>
      </div>

      {/* Review Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const userAns = userAnswers[q.id];
          const isCorrect = userAns === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border p-5 transition-all ${
                isCorrect
                  ? 'border-emerald-900/60 bg-slate-900/90'
                  : 'border-red-900/60 bg-slate-900/90'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-300">
                    #{q.id}
                  </span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 text-xs font-medium text-slate-400">
                    {q.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      சரி (Correct)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-semibold text-red-400 border border-red-500/30">
                      <XCircle className="h-3.5 w-3.5" />
                      தவறு (Incorrect)
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                {q.question}
              </h3>

              {/* Options status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {q.options.map((opt) => {
                  const isThisCorrect = opt.key === q.correctAnswer;
                  const isUserSelection = userAns === opt.key;

                  let optClass = "border-slate-800 bg-slate-800/40 text-slate-400";
                  if (isThisCorrect) {
                    optClass = "border-emerald-500/80 bg-emerald-950/40 text-emerald-200 font-semibold ring-1 ring-emerald-500/30";
                  } else if (isUserSelection && !isThisCorrect) {
                    optClass = "border-red-500/80 bg-red-950/40 text-red-200 line-through opacity-80";
                  }

                  return (
                    <div
                      key={opt.key}
                      className={`flex items-center justify-between rounded-xl border p-2.5 text-xs sm:text-sm ${optClass}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{opt.key})</span>
                        <span>{opt.text}</span>
                      </div>
                      {isThisCorrect && (
                        <span className="text-[11px] font-bold text-emerald-400">✅ சரியான விடை</span>
                      )}
                      {isUserSelection && !isThisCorrect && (
                        <span className="text-[11px] font-bold text-red-400">உங்கள் விடை</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation Box */}
              <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-3.5 text-xs sm:text-sm space-y-1.5">
                <p className="font-bold text-blue-300">📖 தமிழ் விளக்கம்:</p>
                <p className="text-slate-200 leading-relaxed">{q.explanationTamil}</p>
                <p className="text-xs text-slate-400 pt-1">
                  <span className="text-sky-300 font-semibold">கருத்து:</span> {q.conceptNote}
                </p>
                {q.formulaOrTip && (
                  <p className="text-[11px] font-mono text-amber-300 bg-amber-950/30 p-1.5 rounded border border-amber-500/20 mt-1">
                    📌 {q.formulaOrTip}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">தொடர்ந்து கற்க வேண்டுமா?</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Meta Ads-ன் முக்கிய மெட்ரிக்குகள் மற்றும் சூத்திரங்களை முழுமையாக அறிய Study Guide-ஐ பார்வையிடுங்கள்.
          </p>
        </div>
        <button
          onClick={() => {
            sound.playSelect();
            onOpenGuide();
          }}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-blue-500 transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          <span>Open Study Guide</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
