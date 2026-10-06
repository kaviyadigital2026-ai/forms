import React from 'react';
import { Volume2, VolumeX, BookOpen, Sparkles, Printer, RotateCcw, Share2, HelpCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  currentTab: 'quiz' | 'guide' | 'printable';
  setCurrentTab: (tab: 'quiz' | 'guide' | 'printable') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  onReset: () => void;
  isQuizActive: boolean;
  onOpenQuickHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  soundEnabled,
  setSoundEnabled,
  onReset,
  isQuizActive,
  onOpenQuickHelp,
}) => {
  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sound.enabled = nextState;
    if (nextState) {
      sound.playSelect();
    }
  };

  const handleShare = async () => {
    const shareText = "🚀 Meta Ads Knowledge Test: Meta Ads பற்றி உங்களுக்கு எவ்வளவு தெரியும்? இந்த short quiz-ஐ attend பண்ணி உங்க மார்க்கை test பண்ணுங்க!";
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Meta Ads Knowledge Test",
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      alert("Quiz link copied to clipboard!");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 shadow-lg shadow-blue-500/20">
            {/* Meta-style infinity / loop icon */}
            <svg
              className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 12c-2-2.5-4-4-6.5-4A4.5 4.5 0 0 0 1 12.5a4.5 4.5 0 0 0 4.5 4.5c2.5 0 4.5-1.5 6.5-4Z" />
              <path d="M12 12c2 2.5 4 4 6.5 4a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0-4.5-4.5c-2.5 0-4.5 1.5-6.5 4Z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Meta Ads <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">Knowledge Test</span>
              </h1>
              <span className="hidden sm:inline-flex rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
                10 Questions
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Meta Ads பற்றி உங்கள் அறிவை பரிசோதிக்க ஒரு எளிய Quiz
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <nav className="flex rounded-lg bg-slate-800/80 p-1 border border-slate-700/60 text-xs font-medium">
            <button
              onClick={() => {
                sound.playSelect();
                setCurrentTab('quiz');
              }}
              className={`flex items-center gap-1.5 rounded-md px-2.5 sm:px-3 py-1.5 transition-all ${
                currentTab === 'quiz'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Quiz</span>
            </button>
            <button
              onClick={() => {
                sound.playSelect();
                setCurrentTab('guide');
              }}
              className={`flex items-center gap-1.5 rounded-md px-2.5 sm:px-3 py-1.5 transition-all ${
                currentTab === 'guide'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">Study Guide</span>
              <span className="xs:hidden">Guide</span>
            </button>
            <button
              onClick={() => {
                sound.playSelect();
                setCurrentTab('printable');
              }}
              className={`flex items-center gap-1.5 rounded-md px-2.5 sm:px-3 py-1.5 transition-all ${
                currentTab === 'printable'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
          </nav>

          {/* Action icons */}
          <div className="flex items-center gap-1 ml-1 sm:ml-2">
            <button
              onClick={toggleSound}
              title={soundEnabled ? "Sound Effects On (Click to Mute)" : "Sound Effects Muted (Click to Unmute)"}
              className={`rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 ${
                soundEnabled ? 'text-blue-400' : 'text-slate-500'
              }`}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            <button
              onClick={handleShare}
              title="Share Quiz"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
              aria-label="Share Quiz"
            >
              <Share2 className="h-4 w-4" />
            </button>

            <button
              onClick={onOpenQuickHelp}
              title="Quiz Info & Instructions"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
              aria-label="Help"
            >
              <HelpCircle className="h-4 w-4" />
            </button>

            {isQuizActive && (
              <button
                onClick={onReset}
                title="Restart Quiz"
                className="hidden md:flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors border border-transparent hover:border-red-900/40"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Restart</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
