import React from 'react';
import { Play, Sparkles, CheckCircle2, Clock, Award, BookOpen, Target, Zap, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/sound';

interface WelcomeScreenProps {
  onStart: (mode: 'instant' | 'exam') => void;
  onOpenGuide: () => void;
  onOpenPrintable?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onOpenGuide, onOpenPrintable }) => {
  const [selectedMode, setSelectedMode] = React.useState<'instant' | 'exam'>('instant');

  const handleStart = () => {
    sound.playSelect();
    onStart(selectedMode);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-800/90 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Official Tamil Meta Ads Quiz 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            🚀 Meta Ads <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">Knowledge Test</span>
          </h1>

          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/60 mb-6 max-w-2xl">
            <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed">
              Meta Ads பற்றி உங்களுக்கு எவ்வளவு தெரியும்? 🤔
            </p>
            <p className="text-sm sm:text-base text-slate-300 mt-1 leading-relaxed">
              இந்த short quiz-ஐ complete பண்ணி உங்கள் knowledge-ஐ test பண்ணுங்க!
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Questions</p>
                <p className="text-base font-bold text-white">10 MCQs</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Time Limit</p>
                <p className="text-base font-bold text-white">~3-5 Mins</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Pass Mark</p>
                <p className="text-base font-bold text-white">60% (6/10)</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Certificate</p>
                <p className="text-base font-bold text-white">Verified</p>
              </div>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="mb-8">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Quiz Mode தேர்வு செய்க:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => setSelectedMode('instant')}
                className={`relative flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                  selectedMode === 'instant'
                    ? 'border-blue-500 bg-blue-950/40 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/30'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className={`mt-0.5 rounded-lg p-2 ${selectedMode === 'instant' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <Zap className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-base">Practice Mode (பரிந்துரைக்கப்படுகிறது)</span>
                    {selectedMode === 'instant' && (
                      <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                    ஒவ்வொரு கேள்விக்கும் உடனுக்குடன் சரியான விடை & விரிவான தமிழ் விளக்கம் (Instant explanation) தெரியும்.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode('exam')}
                className={`relative flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                  selectedMode === 'exam'
                    ? 'border-indigo-500 bg-indigo-950/40 shadow-md shadow-indigo-500/10 ring-2 ring-indigo-500/30'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className={`mt-0.5 rounded-lg p-2 ${selectedMode === 'exam' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <Target className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-base">Exam Mode (டெஸ்ட் முறை)</span>
                    {selectedMode === 'exam' && (
                      <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                    அனைத்து 10 கேள்விகளையும் முடித்த பிறகு மட்டுமே மதிப்பெண் மற்றும் விடைகள் காட்டப்படும்.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleStart}
              className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-[0.98]"
            >
              <Play className="h-5 w-5 fill-white" />
              <span>Start Quiz Now</span>
            </button>

            <button
              onClick={() => {
                sound.playSelect();
                onOpenGuide();
              }}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/80 px-6 py-4 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-700/80 hover:text-white"
            >
              <BookOpen className="h-4 w-4 text-blue-400" />
              <span>Study Guide படிக்க</span>
            </button>

            {onOpenPrintable && (
              <button
                onClick={() => {
                  sound.playSelect();
                  onOpenPrintable();
                }}
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4 text-sm font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <span>🖨️ Print Paper</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Syllabus / Topics Included */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
          இந்த Test-ல் உள்ள 10 தலைப்புகள் (Topics Covered)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { num: "01", title: "Campaign Objective", desc: "விளம்பரத்தின் முதன்மை இலக்கு" },
            { num: "02", title: "WhatsApp Direct Messages", desc: "Messaging & Leads Objective" },
            { num: "03", title: "CPM (Cost Per Mille)", desc: "1,000 Impressions செலவு கணக்கீடு" },
            { num: "04", title: "CTR (Click-Through Rate)", desc: "விளம்பர கிளிக் விகிதம்" },
            { num: "05", title: "Meta Pixel Tracking", desc: "Website conversions & retargeting" },
            { num: "06", title: "CBO (Advantage Budget)", desc: "Campaign Budget Optimization" },
            { num: "07", title: "Ad Set Level Settings", desc: "Audience, Placements & Schedules" },
            { num: "08", title: "Meta Auction & Ad Quality", desc: "Winning formula & relevance" },
            { num: "09", title: "Landing Page Views (LPV)", desc: "Page loads vs link clicks" },
            { num: "10", title: "ROAS (Return On Ad Spend)", desc: "விளம்பர வருவாய் அளவீடு" },
          ].map((item) => (
            <div
              key={item.num}
              className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/50 p-3 hover:border-slate-700/80 transition-colors"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-bold text-blue-400 border border-blue-500/20">
                {item.num}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">{item.title}</p>
                <p className="text-[11px] text-slate-400 truncate">{item.desc}</p>
              </div>
              <CheckCircle2 className="h-4 w-4 text-emerald-400/80 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
