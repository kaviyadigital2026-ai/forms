export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  category: 'Campaign Structure' | 'Objectives' | 'Metrics & Formulas' | 'Tracking & Pixel' | 'Auction & Delivery';
  explanationTamil: string;
  conceptNote: string;
  formulaOrTip?: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Meta Ads-ல் Campaign Objective எதற்காக பயன்படுத்தப்படுகிறது?",
    options: [
      { key: "A", text: "Ad design செய்ய" },
      { key: "B", text: "Campaign goal தேர்வு செய்ய" },
      { key: "C", text: "Budget மட்டும் set செய்ய" },
      { key: "D", text: "Audience மட்டும் select செய்ய" },
    ],
    correctAnswer: "B",
    category: "Campaign Structure",
    explanationTamil: "Campaign Objective என்பது உங்கள் விளம்பரத்தின் முதன்மை இலக்கு (Primary Goal). உதாரணத்திற்கு: Leads, Sales, Traffic, அல்லது Brand Awareness போன்ற business goal-களை Meta algorithm-க்கு புரியவைக்க Campaign Level-ல் Objective தேர்வு செய்யப்படுகிறது.",
    conceptNote: "Meta Ads Manager-ல் 6 முக்கிய Simplified Objectives உள்ளன: Sales, Leads, Engagement, Traffic, Awareness, மற்றும் App Promotion. உங்கள் business goal எதுவோ அதற்கேற்ப Meta algorithm சரியான பயனர்களை தேடி கண்டுபிடிக்கும்.",
    formulaOrTip: "Campaign Level = 'WHY' (Goal) | Ad Set Level = 'WHO & WHERE' (Audience & Placements) | Ad Level = 'WHAT' (Creative & Copy)"
  },
  {
    id: 2,
    question: "WhatsApp messages பெற எந்த objective பயன்படுத்தலாம்?",
    options: [
      { key: "A", text: "Awareness" },
      { key: "B", text: "Traffic" },
      { key: "C", text: "Engagement / Leads*" },
      { key: "D", text: "App Promotion" },
    ],
    correctAnswer: "C",
    category: "Objectives",
    explanationTamil: "Engagement அல்லது Leads objective தேர்வு செய்து, Conversion Location-ஆக 'Messaging Apps' (WhatsApp, Messenger, Instagram DM) கொடுக்கலாம். WhatsApp-ல் customer direct chat ஆரம்பிக்க இதுவே சரியான வழி.",
    conceptNote: "Engagement objective-ல் 'Messaging apps' select செய்து WhatsApp destination வைக்கலாம். Leads objective-லும் Instant Forms அல்லது WhatsApp messages-ஐ Conversion channel-ஆக பயன்படுத்த முடியும்.",
    formulaOrTip: "ப்ரோ டிப்: Meta Business Suite-ல் உங்கள் WhatsApp Business Account verified செய்யப்பட்டு Facebook Page உடன் இணைக்கப்பட்டிருக்க வேண்டும்."
  },
  {
    id: 3,
    question: "CPM என்பதன் meaning என்ன?",
    options: [
      { key: "A", text: "Cost Per Message" },
      { key: "B", text: "Cost Per Mille" },
      { key: "C", text: "Cost Per Marketing" },
      { key: "D", text: "Cost Per Month" },
    ],
    correctAnswer: "B",
    category: "Metrics & Formulas",
    explanationTamil: "CPM என்றால் 'Cost Per Mille' (Mille என்பது Latin மொழியில் 1,000-ஐ குறிக்கும்). அதாவது உங்கள் விளம்பரம் 1,000 முறை user screens-ல் தோன்றுவதற்கு (1,000 Impressions) நீங்கள் செலவழிக்கும் சராசரி தொகை.",
    conceptNote: "CPM என்பது Meta Ad inventory-ன் போட்டித்தன்மை (Competition) மற்றும் Audience Demand-ஐ பொறுத்து மாறும். போட்டி அதிகமான Audience/Season (உதா: தீபாவளி) நேரங்களில் CPM அதிகமாகும்.",
    formulaOrTip: "CPM Formula = (Total Spend / Total Impressions) × 1,000"
  },
  {
    id: 4,
    question: "CTR என்ன measure செய்கிறது?",
    options: [
      { key: "A", text: "Click rate" },
      { key: "B", text: "Conversion cost" },
      { key: "C", text: "Ad budget" },
      { key: "D", text: "Audience size" },
    ],
    correctAnswer: "A",
    category: "Metrics & Formulas",
    explanationTamil: "CTR என்பது Click-Through Rate (Click விகிதம்). விளம்பரத்தைப் பார்த்தவர்களில் (Impressions) எத்தனை சதவீதம் பேர் அதில் click செய்தார்கள் என்பதை இது அளவிடுகிறது.",
    conceptNote: "உயர்வான CTR (> 1.5% - 2%) உங்கள் Ad Creative, Thumbnail, Hook, மற்றும் Headline பார்வையாளர்களை பெரிதும் ஈர்த்துள்ளது என்பதைக் குறிக்கிறது.",
    formulaOrTip: "CTR Formula = (Total Clicks / Total Impressions) × 100%"
  },
  {
    id: 5,
    question: "Meta Pixel முக்கியமாக எதற்கு பயன்படுத்தப்படுகிறது?",
    options: [
      { key: "A", text: "Image design" },
      { key: "B", text: "Website tracking & conversions" },
      { key: "C", text: "Video editing" },
      { key: "D", text: "Audience naming" },
    ],
    correctAnswer: "B",
    category: "Tracking & Pixel",
    explanationTamil: "Meta Pixel (மற்றும் Conversions API) என்பது உங்கள் website-ல் பொருத்தப்படும் JavaScript tracking code. பயனர்கள் உங்கள் website-க்கு வந்து என்ன செய்கிறார்கள் (Page View, Add to Cart, Purchase) என்பதை இது track செய்து Meta-விற்கு data அனுப்புகிறது.",
    conceptNote: "Pixel data மூலம் Website Custom Audiences உருவாக்கலாம், கைவிடப்பட்ட கார்டுகளை retarget செய்யலாம், மற்றும் அதிக purchase செய்யக்கூடிய Lookalike Audiences உருவாக்கலாம்.",
    formulaOrTip: "Pixel முக்கிய Events: ViewContent, Search, AddToCart, InitiateCheckout, Purchase, Lead."
  },
  {
    id: 6,
    question: "CBO என்பதன் meaning?",
    options: [
      { key: "A", text: "Campaign Budget Optimization" },
      { key: "B", text: "Creative Budget Option" },
      { key: "C", text: "Customer Business Objective" },
      { key: "D", text: "Campaign Business Order" },
    ],
    correctAnswer: "A",
    category: "Campaign Structure",
    explanationTamil: "CBO என்றால் Campaign Budget Optimization. தற்போது இது 'Advantage Campaign Budget' என அழைக்கப்படுகிறது. இதில் budget-ஐ Campaign level-ல் நிர்ணயித்தால், Meta AI தானாகவே சிறந்த முடிவுகளை தரும் Ad Set-களுக்கு பணத்தை பிரித்து செலவிடும்.",
    conceptNote: "ABO (Ad Set Budget Optimization) vs CBO (Campaign Budget Optimization). ABO-ல் ஒவ்வொரு Ad Set-க்கும் நாமே budget நிர்ணயிப்போம். CBO-ல் Meta AI real-time opportunity பார்த்து budget allocate செய்யும்.",
    formulaOrTip: "CBO = Campaign Budget Optimization (Now known as Meta Advantage Campaign Budget)"
  },
  {
    id: 7,
    question: "Ad Set level-ல் எதை control செய்யலாம்?",
    options: [
      { key: "A", text: "Audience & placements & budget (depending setup)" },
      { key: "B", text: "Logo design" },
      { key: "C", text: "Website domain" },
      { key: "D", text: "Video editing" },
    ],
    correctAnswer: "A",
    category: "Campaign Structure",
    explanationTamil: "Ad Set level-ல் Audience (யார் பார்க்க வேண்டும்: வயது, இடம், ஆர்வங்கள்), Placements (எங்கு தெரிய வேண்டும்: Instagram Feed, Reels, FB Stories), Schedule (நேரம்), மற்றும் Budget (ABO setup-ல்) ஆகியவற்றை கட்டுப்படுத்தலாம்.",
    conceptNote: "Logo, Video, மற்றும் Image design Ad Level-ல் (Creative level) மட்டுமே செய்யப்படுகிறது. Domain verification Business Manager-ல் நடக்கும்.",
    formulaOrTip: "Ad Set Settings = Audience Targeting + Placements (Advantage+ / Manual) + Optimization & Delivery + Budget/Schedule"
  },
  {
    id: 8,
    question: "Meta Ads Auction-ல் முக்கியமான factors-ல் ஒன்று எது?",
    options: [
      { key: "A", text: "Ad quality" },
      { key: "B", text: "Laptop brand" },
      { key: "C", text: "Page followers மட்டும்" },
      { key: "D", text: "Logo size" },
    ],
    correctAnswer: "A",
    category: "Auction & Delivery",
    explanationTamil: "Meta Ads Auction-ல் அதிக பணம் (Bid) மட்டுமே போதாது. விளம்பரத்தின் தரம் (Ad Quality & Relevance) மிக முக்கிய காரணியாகும். சிறந்த Ad Quality இருந்தால் குறைந்த செலவிலும் Auction-ல் ஜெயிக்கலாம்.",
    conceptNote: "Meta Auction Winning Formula: Total Value = [Advertiser Bid] × [Estimated Action Rates] + [User Value / Ad Quality]. இதனால் பயனர்களுக்கு நல்ல அனுபவம் தரும் Ads முன்னுரிமை பெறும்.",
    formulaOrTip: "Total Value = Bid × Estimated Action Rate + Ad Quality (Relevance & Feedback)"
  },
  {
    id: 9,
    question: "Landing Page View (LPV) எதைக் குறிக்கிறது?",
    options: [
      { key: "A", text: "Ad பார்த்தவர்கள்" },
      { key: "B", text: "Landing page successfully loaded/viewed" },
      { key: "C", text: "Likes" },
      { key: "D", text: "Comments" },
    ],
    correctAnswer: "B",
    category: "Tracking & Pixel",
    explanationTamil: "Landing Page View (LPV) என்பது பயனர் விளம்பரத்தை click செய்து, உங்கள் website பக்கம் முழுமையாக load ஆகி Meta Pixel பதிவு செய்த நிகழ்வைக் குறிக்கிறது. வெறும் 'Link Click' செய்து website load ஆவதற்குள் வெளியேறினால் LPV கணக்கில் வராது.",
    conceptNote: "Link Clicks அதிகமாக இருந்து Landing Page Views குறைவாக இருந்தால், உங்கள் website loading speed மிக மெதுவாக உள்ளது என்று எளிதாக கண்டறியலாம் (Drop-off analysis).",
    formulaOrTip: "Drop-off Ratio = Link Clicks - Landing Page Views. சிறந்த ratio-க்கு website loading speed < 3 seconds இருக்க வேண்டும்."
  },
  {
    id: 10,
    question: "ROAS என்ன measure செய்கிறது?",
    options: [
      { key: "A", text: "Ad spend-க்கு கிடைத்த revenue return" },
      { key: "B", text: "Number of followers" },
      { key: "C", text: "CPM" },
      { key: "D", text: "CTR" },
    ],
    correctAnswer: "A",
    category: "Metrics & Formulas",
    explanationTamil: "ROAS என்பது Return On Ad Spend. விளம்பரத்திற்காக செலவழித்த ஒவ்வொரு ரூபாய்க்கும் எவ்வளவு வருவாய் (Revenue) கிடைத்தது என்பதை அளவிடும் மிக முக்கியமான E-commerce & Performance Marketing மெட்ரிக் ஆகும்.",
    conceptNote: "உதாரணத்திற்கு, ₹10,000 விளம்பரத்திற்கு செலவு செய்து ₹40,000 மதிப்பிலான பொருட்கள் விற்பனையானால், ROAS = 40,000 / 10,000 = 4.0 (அல்லது 400%).",
    formulaOrTip: "ROAS Formula = (Total Revenue from Ads / Total Ad Spend). Break-even ROAS = 1 / Profit Margin %."
  }
];

export interface QuizResultSummary {
  score: number;
  total: number;
  percentage: number;
  timeSpentSeconds: number;
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  categoryBreakdown: Record<string, { total: number; correct: number }>;
}

export const getRankBadge = (percentage: number) => {
  if (percentage === 100) {
    return {
      title: "Meta Ads Grandmaster 👑",
      titleTamil: "மெட்டா விளம்பர சூப்பர் மாஸ்டர்",
      color: "from-amber-500 to-yellow-400 text-slate-950",
      description: "அபாரமான அறிவு! Meta Ads-ன் Campaign Structure, Pixel, Auction மற்றும் Metrics அனைத்திலும் 100% தேர்ச்சி பெற்றுள்ளீர்கள்.",
      level: "Grandmaster"
    };
  } else if (percentage >= 80) {
    return {
      title: "Media Buyer Pro 🚀",
      titleTamil: "மீடியா பையர் நிபுணர்",
      color: "from-emerald-500 to-teal-400 text-slate-950",
      description: "சிறந்த செயல்திறன்! நீங்கள் Meta Ads-ஐ திறம்பட நிர்வகிக்கும் அளவிற்கு வலுவான அறிவை பெற்றுள்ளீர்கள்.",
      level: "Pro"
    };
  } else if (percentage >= 60) {
    return {
      title: "Digital Marketer 💡",
      titleTamil: "வளர்ந்து வரும் டிஜிட்டல் மார்க்கெட்டர்",
      color: "from-blue-500 to-cyan-400 text-slate-950",
      description: "நல்ல அடிப்படை அறிவு! சில Metrics மற்றும் Auction நுணுக்கங்களை இன்னும் கொஞ்சம் படித்து மெருகேற்றினால் நீங்கள் ஒரு Pro ஆகிவிடலாம்.",
      level: "Intermediate"
    };
  } else {
    return {
      title: "Beginner Marketer 🌱",
      titleTamil: "ஆரம்பநிலை விளம்பர ஆர்வலர்",
      color: "from-purple-500 to-indigo-400 text-white",
      description: "நல்ல முயற்சி! கீழே உள்ள விரிவான விளக்கங்கள் மற்றும் Study Guide-ஐ படித்து உங்கள் திறமையை வளர்த்துக் கொள்ளுங்கள்.",
      level: "Beginner"
    };
  }
};
