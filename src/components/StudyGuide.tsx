import React, { useState } from 'react';
import { BookOpen, Calculator, Search, ExternalLink, Zap, Lightbulb, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface StudyGuideProps {
  onBackToQuiz?: () => void;
}

export const StudyGuide: React.FC<StudyGuideProps> = ({ onBackToQuiz }) => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'calculator'>('concepts');
  const [searchTerm, setSearchTerm] = useState('');

  // Interactive Calculators state
  const [calcSpend, setCalcSpend] = useState<number>(5000);
  const [calcImpressions, setCalcImpressions] = useState<number>(100000);
  const [calcClicks, setCalcClicks] = useState<number>(2000);
  const [calcRevenue, setCalcRevenue] = useState<number>(20000);

  // Computed metrics
  const cpm = calcImpressions > 0 ? ((calcSpend / calcImpressions) * 1000).toFixed(2) : '0';
  const ctr = calcImpressions > 0 ? ((calcClicks / calcImpressions) * 100).toFixed(2) : '0';
  const roas = calcSpend > 0 ? (calcRevenue / calcSpend).toFixed(2) : '0';
  const cpc = calcClicks > 0 ? (calcSpend / calcClicks).toFixed(2) : '0';

  const concepts = [
    {
      id: 1,
      title: "1. Campaign Objective (விளம்பர இலக்கு)",
      badge: "Structure",
      tamilSummary: "Meta Ads-ன் முதல் படி Campaign Objective தேர்வு செய்வது. உங்கள் நிறுவனத்திற்கு என்ன முடிவு தேவை என்பதை Meta-வின் AI Algorithm-க்கு தெரிவிக்கும் முதன்மை இலக்கு இதுவாகும்.",
      points: [
        "Sales: Website purchases, Catalog sales பெற.",
        "Leads: Form submissions, Calls, WhatsApp leads பெற.",
        "Engagement: Post likes, Video views, Messaging conversations.",
        "Traffic: Website அல்லது Blog-க்கு visitors அனுப்ப.",
        "Awareness: அதிகபட்ச நபர்களுக்கு Brand-ஐ அறிமுகப்படுத்த (Reach).",
        "App Promotion: Mobile application install செய்ய வைக்க."
      ],
      rule: "Golden Rule: நீங்கள் எதை Objective ஆக வைக்கிறீர்களோ அதை மட்டுமே Meta AI optimize செய்யும். Sales வேண்டுமென்றால் Traffic வைக்காதீர்கள்!"
    },
    {
      id: 2,
      title: "2. WhatsApp Messages & Engagement",
      badge: "Messaging",
      tamilSummary: "WhatsApp-ல் நேரடி வாடிக்கையாளர் தொடர்புகளை (Click to WhatsApp Ads) பெற Engagement அல்லது Leads Objective பயன்படுத்தப்படுகிறது.",
      points: [
        "Conversion Location-ல் 'Messaging Apps' என்பதைத் தேர்வு செய்யவும்.",
        "WhatsApp Business எண்ணை Facebook Page Settings-ல் Verify செய்து இணைத்திருக்க வேண்டும்.",
        "Greeting message அல்லது Icebreaker questions அமைப்பதன் மூலம் வாடிக்கையாளர்கள் ஒரே கிளிக்கில் கேள்வி கேட்க வைக்கலாம்."
      ],
      rule: "உள்ளூர் வியாபாரங்கள் (Local Businesses), Real Estate, Services & B2B-க்கு WhatsApp Ads மிகச் சிறந்த Conversion விகிதத்தை தரும்."
    },
    {
      id: 3,
      title: "3. CPM (Cost Per Mille) - 1,000 Impressions செலவு",
      badge: "Metric",
      tamilSummary: "CPM என்பது 'Cost Per Mille' (Mille = 1,000 in Latin). உங்கள் விளம்பரம் திரையில் 1,000 முறை தெரிவதற்கு ஆகும் சராசரி செலவு.",
      points: [
        "Formula: CPM = (Total Ad Spend / Total Impressions) × 1,000",
        "CPM-ஐ நிர்ணயிக்கும் காரணிகள்: Audience Size, Seasonality (பண்டிகை காலம்), போட்டி (Competition), மற்றும் Placement.",
        "பொதுவான இந்திய CPM: ₹40 முதல் ₹250 வரை இருக்கும் (Audience niche பொறுத்து)."
      ],
      rule: "CPM அதிகமானால்: Ad Creative-ஐ மாற்றவும், அல்லது Audience-ஐ Broad-ஆக மாற்ற முயற்சி செய்யவும்."
    },
    {
      id: 4,
      title: "4. CTR (Click-Through Rate) - கிளிக் விகிதம்",
      badge: "Metric",
      tamilSummary: "CTR என்பது உங்கள் விளம்பரத்தை பார்த்தவர்களில் எத்தனை சதவீதம் பேர் ஆர்வமாக கிளிக் செய்தார்கள் என்பதை அளவிடுகிறது.",
      points: [
        "Formula: CTR = (Total Clicks / Total Impressions) × 100%",
        "நல்ல CTR பெஞ்ச்மார்க்: 1.5% முதல் 3%+ வரை மிக நன்று.",
        "CTR Link Click vs CTR All: எப்போதும் CTR (Link Click)-ஐ முதன்மையாக கவனிக்க வேண்டும்."
      ],
      rule: "குறைந்த CTR என்றால் உங்கள் Hook, Video First 3 Seconds, அல்லது Image Thumbnail பார்வையாளர்களை ஈர்க்கவில்லை என்று பொருள்."
    },
    {
      id: 5,
      title: "5. Meta Pixel & Conversions API (CAPI)",
      badge: "Tracking",
      tamilSummary: "Meta Pixel என்பது உங்கள் இணையதளத்தில் நிறுவப்படும் tracking snippet. பயனர் செய்யும் அனைத்து செயல்களையும் Meta-விற்கு தெரிவிக்கிறது.",
      points: [
        "Standard Events: PageView, ViewContent, AddToCart, InitiateCheckout, Purchase, Lead.",
        "Retargeting: கார்ட்டில் பொருளை சேர்த்துவிட்டு வாங்காமல் சென்றவர்களை மீண்டும் துரத்தி விளம்பரம் காட்ட உதவும்.",
        "Lookalike Audience: ஏற்கனவே வாங்கியவர்களைப் போன்ற 1% ஒத்த புதிய பயனர்களை கண்டுபிடிக்க உதவும்."
      ],
      rule: "iOS 14+ பாதுகாப்பு மாற்றங்களுக்குப் பிறகு, Browser Pixel உடன் சேர்த்து Conversions API (CAPI) சர்வர் வழியிலும் இணைப்பது கட்டாயம்."
    },
    {
      id: 6,
      title: "6. CBO (Campaign Budget Optimization)",
      badge: "Budgeting",
      tamilSummary: "CBO (தற்போது Advantage Campaign Budget) முறையில், மொத்த பட்ஜெட்டையும் Campaign Level-ல் நிர்ணயிப்போம்.",
      points: [
        "ABO (Ad Set Budget Optimization): ஒவ்வொரு Ad Set-க்கும் நாமே ₹500, ₹1000 என தனித்தனியாக பட்ஜெட் நிர்ணயிப்பது.",
        "CBO (Advantage Campaign Budget): Campaign level-ல் ₹3,000 வைத்தால், அன்றைய நாளில் எந்த Ad Set சிறப்பாக வேலை செய்கிறதோ அதற்கு Meta AI தானாகவே அதிக பணத்தை ஒதுக்கும்.",
        "Scaling செய்யும் போது CBO முறை சிறந்த முடிவுகளைத் தரும்."
      ],
      rule: "Testing கட்டத்தில் ABO முறையும், Winning Ad Sets கிடைத்த பிறகு Scaling செய்ய CBO முறையும் பயன்படுத்தவும்."
    },
    {
      id: 7,
      title: "7. Ad Set Level Controls",
      badge: "Structure",
      tamilSummary: "Meta Ads-ன் மூளை Ad Set ஆகும். யார் பார்க்க வேண்டும், எங்கு பார்க்க வேண்டும் என்பதை இங்குதான் தீர்மானிக்கிறோம்.",
      points: [
        "Audience: வயது, பாலினம், இருப்பிடம் (Locations), மொழிகள், ஆர்வங்கள் (Interests).",
        "Placements: Advantage+ Placements (Meta decides) அல்லது Manual Placements (Instagram Reels, Facebook Feed மட்டும்).",
        "Schedule & Budget: விளம்பரம் தொடங்கும் நாள், நேரம், மற்றும் தினசரி பட்ஜெட்."
      ],
      rule: "Creative, Video, Headline, மற்றும் Primary Text ஆகியவை Ad Level-ல் (Creatives) மட்டுமே இருக்கும்."
    },
    {
      id: 8,
      title: "8. Meta Ads Auction Formula & Ad Quality",
      badge: "Auction",
      tamilSummary: "Meta Ads என்பது வெறும் அதிக காசு கொடுப்பவருக்கு மட்டும் முன்னுரிமை தரும் ஏலம் அல்ல. பயனர்களின் அனுபவத்திற்கும் சம முக்கியத்துவம் உண்டு.",
      points: [
        "முக்கிய சூத்திரம்: Total Value = [Advertiser Bid] × [Estimated Action Rates] + [User Value / Ad Quality]",
        "Ad Quality Score: பயனர் விளம்பரத்தை மறைக்கிறார்களா (Hide Ad), அல்லது லைக் செய்து பார்க்கிறார்களா என்பதைப் பொறுத்து தீர்மானிக்கப்படும்.",
        "சிறந்த Ad Quality இருந்தால், போட்டியாளர்களை விட குறைந்த Bid-லும் நீங்கள் முதலிடம் பிடிக்கலாம்."
      ],
      rule: "உயர்தரமான Creatives தயாரிப்பதே Meta Ads-ல் குறைந்த செலவில் அதிக விற்பனை பெறுவதற்கான ரகசியம்."
    },
    {
      id: 9,
      title: "9. Landing Page Views (LPV) vs Link Clicks",
      badge: "Analytics",
      tamilSummary: "Link Click என்பது வெறும் விளம்பர லிங்கை தொடுவது. LPV என்பது இணையதளம் முழுமையாக லோட் ஆகி பயனர் உள்ளே வந்ததை உறுதி செய்வது.",
      points: [
        "Drop-off Gap = Link Clicks - Landing Page Views.",
        "100 Link Clicks வந்து, 40 Landing Page Views மட்டுமே வந்தால் 60% பேர் லோடிங் தாமதத்தால் வெளியேறிவிட்டனர்.",
        "இணையதள லோடிங் வேகம் 2 முதல் 3 விநாடிகளுக்குள் இருக்க வேண்டும்."
      ],
      rule: "Traffic Campaign நடத்தும் போது optimization goal-ஐ 'Link Clicks' என்பதற்குப் பதிலாக 'Landing Page Views' என வைக்கவும்."
    },
    {
      id: 10,
      title: "10. ROAS (Return On Ad Spend)",
      badge: "Profitability",
      tamilSummary: "விளம்பரத்திற்கு செலவிட்ட ஒவ்வொரு ரூபாய்க்கும் எவ்வளவு விற்பனை வருவாய் கிடைத்தது என்பதை அளவிடும் பிரதான மெட்ரிக்.",
      points: [
        "Formula: ROAS = Total Revenue Generated / Total Ad Spend",
        "உதாரணம்: செலவு ₹10,000, விற்பனை ₹50,000 எனில் ROAS = 5.0X (500%).",
        "Break-even ROAS Formula = 1 / Product Gross Margin %."
      ],
      rule: "உங்கள் பொருளின் லாப வரம்பு (Margin) 50% என்றால், உங்கள் Break-even ROAS = 2.0X. இதற்கு மேல் வரும் போது மட்டுமே தொழில் லாபம் ஈட்டும்."
    }
  ];

  const filtered = concepts.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tamilSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.points.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-0.5 text-xs font-semibold text-blue-400 mb-2">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Official Revision Guide (Tamil & English)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Meta Ads Complete Study Guide & Formulas
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            தேர்வுக்குத் தேவையான 10 முக்கிய கோட்பாடுகள் மற்றும் ஊடாடும் கால்குலேட்டர் (Interactive Calculators).
          </p>
        </div>

        {/* View Switcher & Back button */}
        <div className="flex flex-wrap items-center gap-2">
          {onBackToQuiz && (
            <button
              onClick={() => {
                sound.playSelect();
                onBackToQuiz();
              }}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <span>← Back to Quiz</span>
            </button>
          )}

          <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs">
            <button
              onClick={() => {
                sound.playSelect();
                setActiveTab('concepts');
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-semibold transition-all ${
                activeTab === 'concepts' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>10 Concepts</span>
            </button>
            <button
              onClick={() => {
                sound.playSelect();
                setActiveTab('calculator');
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-semibold transition-all ${
                activeTab === 'calculator' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Live ROI Calculator</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'calculator' ? (
        /* Interactive Metrics Calculator */
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-400" />
              <span>Meta Ads Performance & ROI Calculator</span>
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              உங்கள் Ad Spend, Impressions, Clicks மற்றும் Revenue-ஐ கீழே உள்ளீடு செய்து உடனடி ROAS, CPM, CTR கணக்கிடுங்கள்.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Total Ad Spend (₹)
                </label>
                <input
                  type="number"
                  value={calcSpend}
                  onChange={(e) => setCalcSpend(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Total Impressions
                </label>
                <input
                  type="number"
                  value={calcImpressions}
                  onChange={(e) => setCalcImpressions(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Total Clicks
                </label>
                <input
                  type="number"
                  value={calcClicks}
                  onChange={(e) => setCalcClicks(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Generated Revenue (₹)
                </label>
                <input
                  type="number"
                  value={calcRevenue}
                  onChange={(e) => setCalcRevenue(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Calculated Output Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-xl border border-blue-500/30 bg-blue-950/30 p-4">
                <p className="text-xs text-blue-300 font-semibold">CPM (Cost / 1k)</p>
                <p className="text-2xl font-black text-white mt-1">₹{cpm}</p>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">(Spend / Impr) × 1000</p>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4">
                <p className="text-xs text-emerald-300 font-semibold">CTR (Click Rate)</p>
                <p className="text-2xl font-black text-emerald-400 mt-1">{ctr}%</p>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">(Clicks / Impr) × 100</p>
              </div>

              <div className="rounded-xl border border-purple-500/30 bg-purple-950/30 p-4">
                <p className="text-xs text-purple-300 font-semibold">ROAS (Return On Spend)</p>
                <p className="text-2xl font-black text-purple-400 mt-1">{roas}X</p>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">Revenue / Spend</p>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-4">
                <p className="text-xs text-amber-300 font-semibold">CPC (Cost Per Click)</p>
                <p className="text-2xl font-black text-amber-400 mt-1">₹{cpc}</p>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">Spend / Clicks</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Concepts List */
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search concepts by keywords (e.g., CPM, ROAS, Pixel, Auction, CBO)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-5">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 transition-all hover:border-slate-700 hover:bg-slate-900"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
                    {item.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4 font-medium">
                  {item.tamilSummary}
                </p>

                <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-3.5 mb-3 space-y-2">
                  <p className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    முக்கிய குறிப்புகள் (Key Takeaways):
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                    {item.points.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3 text-xs text-amber-200 flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item.rule}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
