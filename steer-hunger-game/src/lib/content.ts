export interface Doubt {
  id: string;
  label: string;
  tag: string;
  iconName: "safety" | "muscle" | "regain" | "diabetics" | "fit";
  readoutTitle: string;
  readoutTip: string;
  doctorNote: string;
}

export interface QuizCard {
  id: number;
  statement: string;
  answer: "MYTH" | "FACT";
  headline: string;
  explanation: string;
  doctorTakeaway: string;
  tag: string;
  illustrationType: "diabetic" | "hunger" | "muscle" | "nausea" | "habits" | "tests";
}

export interface GameContent {
  brand: {
    name: string;
    club: string;
    tagline: string;
    disclaimer: string;
  };
  hook: {
    badge: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    subhead: string;
    thaliNote: string;
    ctaButton: string;
    timeToComplete: string;
  };
  doubtsStep: {
    badge: string;
    title: string;
    subtitle: string;
    helperText: string;
    ctaButton: string;
  };
  quizStep: {
    mythButton: string;
    factButton: string;
    swipeHint: string;
    streakLabel: string;
  };
  readoutStep: {
    badge: string;
    title: string;
    subtitle: string;
    indianDietTipTitle: string;
    indianDietTip: string;
    thaliRuleTitle: string;
    thaliRuleDesc: string;
    dexaConceptTitle: string;
    dexaConceptDesc: string;
    ctaButton: string;
  };
  leadStep: {
    badge: string;
    title: string;
    subtitle: string;
    doctorGuarantee: string[];
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    privacyNote: string;
    submitButton: string;
    disclaimer: string;
  };
  thankyouStep: {
    title: string;
    subtitle: string;
    whatsAppNotice: string;
    resetButton: string;
  };
  doubts: Doubt[];
  cards: QuizCard[];
}

export const GAME_CONTENT: GameContent = {
  brand: {
    name: "Steer",
    club: "India's doctor-led metabolic health club",
    tagline: "Science, diagnostics & habit change for lasting metabolic health.",
    disclaimer: "Educational game only. Not medical advice. Steer doctors evaluate each individual using blood tests, DEXA scans and clinical protocols before any medical decision."
  },
  hook: {
    badge: "60-Second Metabolic Health Quiz",
    headlinePart1: "Why does hunger hit hard at",
    headlineHighlight: "4:00 PM,",
    headlinePart2: "even after a full lunch thali?",
    subhead: "Most Indian adults think 4pm cravings are weak willpower. Metabolic science tells a completely different story.",
    thaliNote: "Dal, 2 rotis, sabzi, curd... yet by 4pm, your brain demands chai and namkeen.",
    ctaButton: "Find Out in 60 Seconds",
    timeToComplete: "6 interactive cards • 0 spam • Instant doctor readout"
  },
  doubtsStep: {
    badge: "Step 1 of 2",
    title: "What's your biggest question about modern metabolic treatments?",
    subtitle: "Select up to 2 doubts. We'll tailor your personalized clinical readout to address them directly.",
    helperText: "Choose 1 or 2 to unlock your quiz",
    ctaButton: "Begin the 4pm Quiz"
  },
  doubts: [
    {
      id: "safety",
      label: "Is it really safe?",
      tag: "Clinical Safety",
      iconName: "safety",
      readoutTitle: "Safety & Medical Oversight",
      readoutTip: "Safety is never a DIY guessing game. At Steer, doctors perform comprehensive liver, kidney, and endocrine blood panels before approving any therapy, with weekly monitoring to prevent acute side effects.",
      doctorNote: "Doctor-led dosing prevents sudden gastrointestinal distress."
    },
    {
      id: "muscle",
      label: "Will I lose muscle?",
      tag: "Body Composition",
      iconName: "muscle",
      readoutTitle: "Protecting Skeletal Muscle Mass",
      readoutTip: "Rapid weight loss without clinical guidance strips lean muscle. Steer tracks DEXA body composition and sets targeted protein intake (paneer, dal, sprouts, eggs) alongside resistance routines to ensure weight dropped is purely visceral fat.",
      doctorNote: "DEXA scans verify fat loss vs muscle retention."
    },
    {
      id: "regain",
      label: "Will the weight come back?",
      tag: "Long-term Sustain",
      iconName: "regain",
      readoutTitle: "Sustained Metabolic Reset",
      readoutTip: "Stopping medication without rewriting metabolic cues often brings weight back. Steer pairs medical support with gut microbiome rebalancing, sleep architecture, and sustainable Indian meal structures so your body maintains its new set point.",
      doctorNote: "Habit scaffolding prevents post-treatment rebound."
    },
    {
      id: "diabetics",
      label: "Is it only for diabetics?",
      tag: "Eligibility & Science",
      iconName: "diabetics",
      readoutTitle: "Beyond Diabetes Care",
      readoutTip: "While GLP-1 treatments originated in glycemic management for type 2 diabetes, international and Indian clinical guidelines approve specific formulations for non-diabetic adults with metabolic dysregulation, insulin resistance, or elevated BMI.",
      doctorNote: "Prescribed solely based on clinical indication, not fads."
    },
    {
      id: "fit",
      label: "Is it even for me?",
      tag: "Personal Suitability",
      iconName: "fit",
      readoutTitle: "Individual Suitability Check",
      readoutTip: "If you've cycled through multiple diets, battle persistent hunger signals, or struggle with insulin resistance, your metabolic set-point may be locked. A doctor evaluates your biochemistry rather than blaming your effort.",
      doctorNote: "Metabolic hurdles are biological, not moral failures."
    }
  ],
  quizStep: {
    mythButton: "MYTH",
    factButton: "FACT",
    swipeHint: "Swipe Left for Myth • Swipe Right for Fact (or tap buttons)",
    streakLabel: "Streak"
  },
  cards: [
    {
      id: 1,
      statement: "GLP-1 medicines are only for diabetics.",
      answer: "MYTH",
      headline: "MYTH: Approved for metabolic health & weight management.",
      explanation: "While they originated in type 2 diabetes care, doctors also prescribe them for weight management in adults who meet clinical criteria, strictly after blood tests.",
      doctorTakeaway: "Steer doctors evaluate full metabolic profiles, not just fasting glucose.",
      tag: "Eligibility & Medical Use",
      illustrationType: "diabetic"
    },
    {
      id: 2,
      statement: "Hunger at 4pm, even after a full thali, is just weak willpower.",
      answer: "MYTH",
      headline: "MYTH: It's biology, not willpower.",
      explanation: "Appetite is driven by complex neuro-hormonal cascades between your gut and brain. GLP-1 is a natural satiety hormone that regulates stomach emptying and cravings.",
      doctorTakeaway: "When gut satiety signals drop or insulin spikes crash, your brain sends urgent hunger signals regardless of discipline.",
      tag: "Hormonal Science",
      illustrationType: "hunger"
    },
    {
      id: 3,
      statement: "Losing weight fast means you lose only fat.",
      answer: "MYTH",
      headline: "MYTH: Without clinical care, muscle gets burned too.",
      explanation: "Without targeted protein pacing and strength work, up to 25-40% of rapid weight lost can be skeletal muscle. A clinical DEXA scan differentiates visceral fat from lean tissue.",
      doctorTakeaway: "Preserving muscle is essential to maintain your resting metabolic rate.",
      tag: "Body Composition & DEXA",
      illustrationType: "muscle"
    },
    {
      id: 4,
      statement: "Nausea and an upset stomach are the most commonly reported side effects early on.",
      answer: "FACT",
      headline: "FACT: Mild GI symptoms can occur early on.",
      explanation: "Because these therapies slow gastric emptying, early nausea or reflux can occur. Steer physicians manage this through gentle dose titration and specific meal adjustments.",
      doctorTakeaway: "Doctor supervision ensures unsuitable individuals are screened out early.",
      tag: "Safety & Side Effects",
      illustrationType: "nausea"
    },
    {
      id: 5,
      statement: "Stop the medicine and keep the same habits, and weight tends to creep back.",
      answer: "FACT",
      headline: "FACT: Lasting results need root-cause lifestyle resets.",
      explanation: "Medicines create a therapeutic window of calm appetite, but lasting health requires retraining food choices, sleep, stress, and gut microbiome diversity during that window.",
      doctorTakeaway: "Steer combines medicine with clinical coaches so you stay healthy long after.",
      tag: "Long-term Sustain",
      illustrationType: "habits"
    },
    {
      id: 6,
      statement: "Anyone can start without tests, as long as they feel ready.",
      answer: "MYTH",
      headline: "MYTH: Diagnostics and doctor review are mandatory first steps.",
      explanation: "Comprehensive blood tests, medical history, family risk factors, and vital screening must be completed first. Prescription is never automatic.",
      doctorTakeaway: "True doctor-led care puts your cardiovascular, thyroid, and renal safety first.",
      tag: "Clinical Protocol",
      illustrationType: "tests"
    }
  ],
  readoutStep: {
    badge: "Personalized Metabolic Profile",
    title: "Your 4pm Metabolic Scorecard",
    subtitle: "Here is what your choices reveal about your metabolic journey and practical steps for your Indian routine.",
    indianDietTipTitle: "The Indian 4pm Thali Rule",
    indianDietTip: "Pair high-glycemic carbs with protein and soluble fibre. At lunch, ensure dal + curd + sabzi are eaten before or alongside rice/roti. At 4pm, swap biscuits and chai for roasted chana, sprouts chaat, paneer cubes, or unflavoured lassi to prevent the insulin crash.",
    thaliRuleTitle: "Why the 4pm Crash Happens",
    thaliRuleDesc: "A carbohydrate-heavy lunch triggers an insulin spike. By 4pm, blood sugar drops sharply, releasing ghrelin (the hunger hormone) that compels you to search for office snacks.",
    dexaConceptTitle: "Muscle Protection in Indian Bodies",
    dexaConceptDesc: "South Asians naturally carry a higher percentage of visceral fat at lower body weights ('thin-fat phenotype'). Steer uses gold-standard DEXA scans to protect your metabolic engine: lean muscle.",
    ctaButton: "See If the Steer Programme Fits You"
  },
  leadStep: {
    badge: "Doctor-Led Consultation",
    title: "See if the Steer Programme Fits You",
    subtitle: "Take the next step with Steer's medical team. No generic diet sheets—just diagnostic science and compassionate doctor guidance.",
    doctorGuarantee: [
      "No obligation: 15-minute diagnostic clarity call with a Steer health guide",
      "Full transparency: We only recommend GLP-1 pathways if blood tests and DEXA justify it",
      "Confidential & spam-free: Direct WhatsApp and phone contact only"
    ],
    nameLabel: "Your Full Name",
    namePlaceholder: "e.g. Rahul Sharma or Priya Nair",
    phoneLabel: "WhatsApp / Mobile Number",
    phonePlaceholder: "10-digit Indian mobile (starts with 6-9)",
    privacyNote: "Draft for review: By submitting, you agree to receive medical game insights & programme fit details from Steer. We do not sell your data.",
    submitButton: "Request Doctor-Led Fit Assessment",
    disclaimer: "Educational and informational only. GLP-1 medicines require in-person or telemedicine clinical evaluation by a licensed doctor following diagnostic blood panels."
  },
  thankyouStep: {
    title: "You're on the Path to Smarter Metabolic Health",
    subtitle: "A Steer medical advisor has received your quiz answers and selected doubts. We will reach out via WhatsApp with your customized diagnostic summary.",
    whatsAppNotice: "Expect a message on WhatsApp within 15-30 minutes during clinic hours (9 AM - 8 PM IST).",
    resetButton: "Play Quiz Again"
  }
};
