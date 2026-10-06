import React, { useState } from 'react';
import { X, Printer, Award, CheckCircle, Sparkles } from 'lucide-react';
import { getRankBadge } from '../data/quizData';
import { sound } from '../utils/sound';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  total: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  score,
  total,
}) => {
  const [userName, setUserName] = useState('');
  const percentage = Math.round((score / total) * 100);
  const badge = getRankBadge(percentage);
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playSelect();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl text-slate-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="h-6 w-6 text-amber-400" />
            <span>டிஜிட்டல் சான்றிதழ் (Certificate of Achievement)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            சான்றிதழில் உங்கள் பெயரைப் பதிவு செய்து பிரிண்ட் அல்லது சேமித்துக் கொள்ளுங்கள்.
          </p>

          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              உங்கள் முழுப் பெயர் (Your Full Name):
            </label>
            <input
              type="text"
              placeholder="e.g. Kaviya / Karthik / Senthil Kumar"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Certificate Preview Card */}
        <div
          id="certificate-print-area"
          className="relative overflow-hidden rounded-2xl border-4 border-amber-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 text-center shadow-inner"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 h-6 w-6 border-t-2 border-l-2 border-amber-400/80" />
          <div className="absolute top-2 right-2 h-6 w-6 border-t-2 border-r-2 border-amber-400/80" />
          <div className="absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-amber-400/80" />
          <div className="absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-amber-400/80" />

          {/* Watermark Logo */}
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 text-white shadow-lg shadow-blue-600/30">
            <Sparkles className="h-7 w-7" />
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
            CERTIFICATE OF COMPLETION
          </p>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Meta Ads Knowledge Mastery
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 italic">
            This is proudly presented to
          </p>

          {/* Name Display */}
          <div className="my-4 border-b border-dashed border-amber-400/30 pb-2">
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-300 capitalize tracking-wide">
              {userName.trim() || 'Your Name Here'}
            </p>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
            for successfully passing the 10-Question <span className="font-semibold text-white">Meta Ads Knowledge Test</span> demonstrating strong knowledge in Campaign Objectives, CBO, CPM, CTR, Pixel, Auction Mechanics, and ROAS.
          </p>

          {/* Score Badge */}
          <div className="my-5 inline-flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Score Achieved</p>
              <p className="text-base font-extrabold text-emerald-400">
                {score} / {total} ({percentage}%)
              </p>
            </div>
            <div className="h-6 w-px bg-slate-700" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Certification Status</p>
              <p className="text-sm font-bold text-amber-300">{badge.title}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-[11px] text-slate-400">
            <div>
              <p className="font-semibold text-slate-300">Date Issued:</p>
              <p>{currentDate}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-300">Verified By:</p>
              <p className="text-blue-400 font-bold">Meta Ads Master Assessment</p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700"
          >
            மூடுக (Close)
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
          >
            <Printer className="h-4 w-4" />
            <span>பிரிண்ட் அல்லது PDF சேமி (Print Certificate)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
