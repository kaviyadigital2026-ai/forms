import React from 'react';
import { X, HelpCircle, Key, CheckCircle, ShieldAlert } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-7 shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
          <HelpCircle className="h-5 w-5 text-blue-400" />
          <span>Meta Ads Quiz வழிமுறைகள் & உதவிகள்</span>
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="rounded-xl bg-slate-800/60 p-3.5 border border-slate-700/60">
            <h4 className="font-semibold text-white mb-1">🎯 தேர்வு முறைகள் (Modes):</h4>
            <p className="text-slate-300">
              <strong className="text-blue-400">Practice Mode:</strong> ஒவ்வொரு கேள்விக்கும் click செய்தவுடன் சரியான விடை மற்றும் விரிவான தமிழ் விளக்கம் தெரியும்.
            </p>
            <p className="text-slate-300 mt-1">
              <strong className="text-indigo-400">Exam Mode:</strong> 10 கேள்விகளையும் முடித்த பிறகே மதிப்பெண்கள் மற்றும் விடைகள் காட்டப்படும்.
            </p>
          </div>

          <div className="rounded-xl bg-slate-800/60 p-3.5 border border-slate-700/60">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <Key className="h-4 w-4 text-amber-400" />
              <span>விசைப்பலகை குறுக்குவழிகள் (Keyboard Shortcuts):</span>
            </h4>
            <ul className="space-y-1 text-slate-300">
              <li><kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">A</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">B</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">C</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">D</kbd> — விருப்பங்களைத் தேர்ந்தெடுக்க</li>
              <li><kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">→</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">←</kbd> — அடுத்த / முந்தைய கேள்விக்குச் செல்ல</li>
            </ul>
          </div>

          <div className="rounded-xl bg-slate-800/60 p-3.5 border border-slate-700/60">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>சான்றிதழ் (Certificate):</span>
            </h4>
            <p className="text-slate-300">
              தேர்வை முடித்ததும் உங்கள் பெயரை உள்ளிட்டால் அழகான வண்ண டிஜிட்டல் சான்றிதழைப் பெறலாம்.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-blue-600 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-blue-500"
        >
          சரி, புரிந்தது (Got it!)
        </button>
      </div>
    </div>
  );
};
