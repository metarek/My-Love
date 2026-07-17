import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  Sparkles, 
  ChevronRight, 
  BookOpen, 
  CornerDownRight, 
  ArrowRight, 
  Volume2, 
  Info,
  RotateCcw
} from "lucide-react";

import StarryBackground from "./components/StarryBackground";
import FloatingParticles from "./components/FloatingParticles";
import AudioPlayer from "./components/AudioPlayer";
import TypewriterText from "./components/TypewriterText";
import BloomingRose from "./components/BloomingRose";
import Butterfly from "./components/Butterfly";
import Timeline from "./components/Timeline";

// Celebration heart explosion structure
interface ExplodingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
  delay: number;
}

// Complete localized translations dictionary
const translations = {
  en: {
    title: "A Journey to My Heart",
    loadingSubtitle: "Tuning the melody of memories...",
    welcome: "Welcome MAHIRU ❤️",
    gateQuote: "This is not just a website... \nThis is every heartbeat I couldn't explain.",
    openGateBtn: "Open the First Gate",
    p2Quote1: "Every day in class, \nI found another reason to smile.",
    p2Quote2: "I never knew \nsomeone could become so important \nwithout even knowing.",
    p2Quote3: "My happiest moments \nare the ones where you simply smile.",
    continueBtn: "Continue",
    chapter3: "Chapter III",
    feelingsTitle: "The Feelings I Never Said",
    pageOf: (current: number, total: number) => `Page ${current} of ${total}`,
    prev: "Prev",
    next: "Next",
    oneLastGate: "One Last Gate",
    finalTruthBtn: "The Final Truth",
    yesDoBtn: "Yes, I Do!",
    needTimeBtn: "💔 Need Time",
    letterIntro: "MAHIRU... \nI truly love you.",
    letterSub: "Maybe I never had the courage to say it in person...",
    letterBody: "But every heartbeat has always whispered your name. \nWill you accept my heart?",
    letterWithSoul: "With all my soul",
    letterFromTarek: "Will you be my partner for tea ☕ in our old age?",
    thankYou: "Do you know? 🥺",
    happyTarek: "I have waited so many days and nights just to hear this 'yes' from you, today you made me experience the best feeling of my life 🥰",
    foreverBeginning: "This is the beginning of our forever.",
    replayStory: "Replay Our Story",
    understandTitle: "I Understand...",
    respectQuote: "No matter what your answer is, \nI'll always respect you. \nYour happiness will always matter to me.",
    withCareTarek: "With infinite care, Tarek",
    goBack: "Go Back",
    replayShort: "Replay",
    designedBy: "Designed with infinite care for MAHIRU",
    monthYear: "July 2026",
    sentences: [
      "Could you give me just a little bit of your time? I'll take only a minute of yours to talk.",
      "Look, actually... I never wanted to embarrass you or make you feel uncomfortable.",
      "Peeking from afar, whistling at you, or waiting by the roadside to disturb you—I am absolutely not that kind of person.",
      "Chasing you around with a phone just to get your Facebook ID—I am not like that at all.",
      "I just felt this deep inside... that I truly like you and care for you so much.",
      "Not being able to tell you this was making me feel so uneasy. I can't sleep at night, feeling this constant, painful ache.",
      "You have every right to reject me, that is entirely your own choice.",
      "But still, I am saying this because if I don't speak my heart, I feel so restless. It feels like my inside is burning up.",
      "So today, I have finally decided to pour out all my feelings and everything hidden deep within my heart to you.",
      "Now, the rest is entirely up to you. You can take your time and think about it if you wish... just this much.",
      "I hope I could make you understand the true feelings of my heart. ❤️"
    ]
  },
  bn: {
    title: "আমার মনের একটি যাত্রা",
    loadingSubtitle: "স্মৃতির সুর মিলাচ্ছি...",
    welcome: "স্বাগতম মাহিরু ❤️",
    gateQuote: "এটি কেবল একটি ওয়েবসাইট নয়... \nএটি আমার প্রতিটি হৃদস্পন্দন যা আমি কখনো প্রকাশ করতে পারিনি।",
    openGateBtn: "প্রথম দরজাটি খোলো",
    p2Quote1: "ক্লাসের প্রতিটি দিন, \nআমি হাসার আরও একটি নতুন কারণ খুঁজে পেতাম।",
    p2Quote2: "আমি কখনো জানতামই না যে \nকেউ না জেনেই আমার জীবনে \nএতটা গুরুত্বপূর্ণ হয়ে উঠতে পারে।",
    p2Quote3: "আমার জীবনের সবচেয়ে আনন্দের মুহূর্তগুলো \nহলো সেগুলো যখন তুমি কেবল মিষ্টি করে হাসো।",
    continueBtn: "এগিয়ে চলো",
    chapter3: "তৃতীয় অধ্যায়",
    feelingsTitle: "যে অনুভূতিগুলো আমি কখনো বলতে পারিনি",
    pageOf: (current: number, total: number) => `পৃষ্ঠা ${current} / ${total}`,
    prev: "পূর্ববর্তী",
    next: "পরবর্তী",
    oneLastGate: "শেষ দরজাটি",
    finalTruthBtn: "চূড়ান্ত সত্য",
    yesDoBtn: "হ্যাঁ, আমি রাজি!",
    needTimeBtn: "💔 কিছুটা সময় প্রয়োজন",
    letterIntro: "মাহিরু... \nআমি তোমাকে সত্যি অনেক ভালোবাসি।",
    letterSub: "হয়তো সামনাসামনি তা বলার সাহস কখনো হয়ে ওঠেনি...",
    letterBody: "কিন্তু আমার প্রতিটি হৃদস্পন্দন সবসময় কেবল তোমার নামই জপেছে। \nতুমি কি আমার এই মনকে আপন করে নেবে?",
    letterWithSoul: "আমার সমস্ত অনুভূতি দিয়ে",
    letterFromTarek: "তুমি কি আমার বৃদ্ধ বয়সে চা ☕ খাওয়ার সাথী হবা?",
    thankYou: "তুমি কি জানো 🥺",
    happyTarek: "তোমার কাছ থেকে এই হা কথা টা শুনার জন্য আমি কতো গুলা দিন রাত অপেক্ষা করছি , তুমি আজ আমাকে আমার জিবনের সব থেকে সেরা অনুভূতি টা অনুভব করিয়েছ 🥰",
    foreverBeginning: "এটি আমাদের আজীবন একসাথে চলার পথচলা।",
    replayStory: "আমাদের গল্পটি পুনরায় দেখো",
    understandTitle: "আমি বুঝতে পারছি...",
    respectQuote: "তোমার উত্তর যা-ই হোক না কেন, \nআমি সবসময় তোমাকে সম্মান করব। \nতোমার সুখই আমার কাছে সবসময় সবচেয়ে বড়।",
    withCareTarek: "অসীম ভালোবাসা ও যত্নে, তারেক",
    goBack: "পেছনে যাও",
    replayShort: "পুনরায় শুরু",
    designedBy: "মাহিরুর জন্য অসীম যত্নে তৈরি",
    monthYear: "জুলাই ২০২৬",
    sentences: [
      "আমাকে কি একটু সময় দেওয়া যায়? তোমার সাথে কথা বলার জন্য আমি মাত্র ১ মিনিট সময় নেব।",
      "দেখো আসলে... আমি তোমাকে কখনো বিব্রত করতে চাইনি।",
      "ওই যে দূর থেকে উঁকিঝুঁকি মেরে দেখা, তোমাকে দেখে শিষ বাজানো বা পথের পাশে দাঁড়িয়ে ডিস্টার্ব করা—আমি কিন্তু মোটেও ওমন নই।",
      "ফেসবুক আইডির জন্য ফোন নিয়ে পিছু পিছু ঘুরে বেড়ানো, আমি ওসবের মধ্যে নেই।",
      "আমার কেবল মনে হয়েছে যে, তোমাকে আমার ভীষণ ভালো লাগে।",
      "এই কথাটি তোমাকে জানাতে না পেরে আমার ভেতর কেমন যেন একটা অস্বস্তি হচ্ছে। আমি রাতে ঘুমাতে পারছি না, আমার কেমন যেন এক যন্ত্রণা হচ্ছে।",
      "তুমি আমাকে রিজেক্ট করতেই পারো, এটা সম্পূর্ণ তোমার মনের ইচ্ছা।",
      "কিন্তু তাও আমি বলছি, কারণ আমি আমার মনের কথাগুলো না বললে খুব অশান্তি বোধ করছি। আমার ভেতরটা মনে হচ্ছে জ্বলেপুড়ে যাচ্ছে।",
      "তাই আজ তোমাকে আমি আমার মনের সব অনুভূতি, মনের ভেতরে থাকা সব কথা বলেই দিলাম।",
      "এখন বাকিটা তোমার ইচ্ছা। তুমি চাইলে একটু ভেবে দেখতে পারো... এতটুকুই।",
      "আশা করি আমার মনের কথাগুলো তোমাকে বোঝাতে পেরেছি। ❤️"
    ]
  }
};

export default function App() {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [gateOpened, setGateOpened] = useState<boolean>(false);
  const [p3Sentence, setP3Sentence] = useState<number>(0);
  const [proposalAnswer, setProposalAnswer] = useState<"yes" | "need_time" | null>(null);
  const [yesExplosions, setYesExplosions] = useState<ExplodingHeart[]>([]);
  const [proposalState, setProposalState] = useState<number>(0); // 0: Name, 1: I Love You, 2: Full proposal letter
  const [lang, setLang] = useState<"en" | "bn">("en");

  const t = translations[lang];

  // Simulating beautiful intro loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Sequence state changer for the Final Proposal Card
  useEffect(() => {
    if (page === 5) {
      setProposalState(0);
      const timer1 = setTimeout(() => setProposalState(1), 3200);
      const timer2 = setTimeout(() => setProposalState(2), 6500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [page]);

  // Handle Opening the Gate on Page 1
  const handleOpenGate = () => {
    setGateOpened(true);
    // Smooth transition delay to Page 2
    setTimeout(() => {
      setPage(2);
    }, 1200);
  };

  // Trigger celebration explosion when YES is clicked
  const triggerCelebration = () => {
    setProposalAnswer("yes");
    const colors = ["#ff4d6d", "#ff8fab", "#ffc2d1", "#ffd6e0", "#fff0f3", "#7b2cbf", "#c9184a"];
    
    // Spawn 80 hearts flying out in different directions
    const newExplosions: ExplodingHeart[] = Array.from({ length: 80 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 250 + 100; // velocity
      return {
        id: i,
        x: 0,
        y: 0,
        size: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: angle,
        speed: speed,
        delay: Math.random() * 0.2
      };
    });
    setYesExplosions(newExplosions);
  };

  return (
    <div className="relative w-full min-h-screen select-none overflow-x-hidden text-white flex flex-col justify-between font-sans bg-[#050211]">
      
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading-screen"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#060314] z-[999] flex flex-col items-center justify-center"
          >
            {/* Spinning/Pulsing Heart Container */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-6">
              {/* Spinning Glow Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-rose-pink-400/40 animate-spin" style={{ animationDuration: "12s" }} />
              {/* Outer soft breathing circle */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-28 h-28 bg-rose-pink-500/25 rounded-full blur-xl"
              />
              {/* Heart itself */}
              <Heart size={54} className="text-rose-pink-500 animate-spin-heart drop-shadow-[0_0_15px_#ff4d6d]" />
            </div>

            {/* Custom load captions */}
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-display tracking-[0.25em] text-sm md:text-base text-rose-pink-200 uppercase text-center text-glow-pink px-4"
            >
              {t.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.0 }}
              className="font-cursive text-2xl text-rose-pink-300 mt-2"
            >
              {t.loadingSubtitle}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Starry/Nebula Atmosphere Backdrop */}
      <StarryBackground />

      {/* Ambient Hearts and Falling Rose Petals (Enabled after opening Gate 1) */}
      {page > 1 && <FloatingParticles />}

      {/* Audio Engine floating widget */}
      <AudioPlayer />

      {/* Header Overlay (branding & page navigation track & language switcher) */}
      <header className="relative w-full z-20 px-6 py-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Heart size={18} className="text-rose-pink-500 fill-current animate-pulse" />
          <span className="font-display tracking-widest text-[11px] md:text-xs text-rose-pink-100 uppercase text-glow-pink font-semibold">
            Tarek ❤️ MAHIRU
          </span>
        </motion.div>

        {/* Action Controls Side: Language switch and navigation track */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Gorgeous Glassmorphism Language Switcher */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="pointer-events-auto flex items-center gap-1.5 bg-black/40 hover:bg-rose-pink-500/25 px-4 py-1.5 rounded-full border border-white/10 hover:border-rose-pink-400/40 transition-all duration-300 text-[10px] md:text-xs font-semibold tracking-wider text-rose-pink-100 shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
            id="language-toggle-btn"
            title="Toggle Language / ভাষা পরিবর্তন করুন"
          >
            <span className={lang === "en" ? "text-white font-bold" : "opacity-50"}>EN</span>
            <span className="text-white/20">|</span>
            <span className={lang === "bn" ? "text-rose-pink-300 font-bold" : "opacity-50"}>বাংলা</span>
          </motion.button>

          {/* Page counter bar */}
          {page > 1 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5 md:gap-2 bg-black/30 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-sm pointer-events-auto shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
            >
              {Array.from({ length: 5 }).map((_, idx) => (
                <button
                  key={`page-dot-${idx}`}
                  onClick={() => {
                    // Only allow jumping back if gate was already opened
                    if (gateOpened) {
                      setPage(idx + 1);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    page === idx + 1 
                      ? "w-6 bg-gradient-to-r from-rose-pink-500 to-rose-pink-300 shadow-[0_0_8px_#ff4d6d]" 
                      : idx + 1 < page 
                        ? "w-2 bg-rose-pink-400/60 hover:bg-rose-pink-300" 
                        : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  title={`Chapter ${idx + 1}`}
                  id={`dot-btn-${idx}`}
                />
              ))}
            </motion.div>
          )}
        </div>
      </header>

      {/* MAIN STORY CONTENT CARDS */}
      <main className="relative w-full z-20 flex-grow flex items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          
          {/* ========================================================= */}
          {/* PAGE 1 – The Magic Gate */}
          {/* ========================================================= */}
          {page === 1 && (
            <motion.div
              key="page-1"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-lg text-center flex flex-col items-center justify-center"
            >
              {/* Giant Glowing Golden Heart-shaped Gate */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-8 perspective-1000">
                {/* Outer Ring Glows */}
                <div className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full border border-yellow-400/20 animate-pulse" style={{ animationDuration: "4s" }} />
                
                {/* 3D Gate Panels container */}
                <div className="absolute w-52 h-52 md:w-64 md:h-64 flex items-center justify-center">
                  
                  {/* Left Gate Wing */}
                  <motion.div
                    animate={gateOpened ? { rotateY: -110, opacity: 0, scale: 0.95 } : { rotateY: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute right-1/2 w-1/2 h-full origin-right flex items-center justify-end overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <svg className="w-[200%] h-full text-yellow-400/80 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.7)]" viewBox="0 0 100 100" fill="currentColor">
                      {/* Left wing of Heart */}
                      <path d="M50 85 C25 65 10 45 10 25 C10 10 25 10 35 15 C45 20 50 30 50 35 Z" />
                      {/* Romantic Left Filigree lines */}
                      <path d="M 30 25 Q 25 35 40 38" stroke="#050211" strokeWidth="1.5" fill="none" />
                      <path d="M 20 40 Q 30 50 45 48" stroke="#050211" strokeWidth="1.5" fill="none" />
                      <circle cx="35" cy="30" r="2" fill="#050211" />
                    </svg>
                  </motion.div>

                  {/* Right Gate Wing */}
                  <motion.div
                    animate={gateOpened ? { rotateY: 110, opacity: 0, scale: 0.95 } : { rotateY: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute left-1/2 w-1/2 h-full origin-left flex items-center justify-start overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <svg className="w-[200%] h-full text-yellow-400/80 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.7)] -scale-x-100" viewBox="0 0 100 100" fill="currentColor">
                      {/* Right wing of Heart (mirrored) */}
                      <path d="M50 85 C25 65 10 45 10 25 C10 10 25 10 35 15 C45 20 50 30 50 35 Z" />
                      <path d="M 30 25 Q 25 35 40 38" stroke="#050211" strokeWidth="1.5" fill="none" />
                      <path d="M 20 40 Q 30 50 45 48" stroke="#050211" strokeWidth="1.5" fill="none" />
                      <circle cx="35" cy="30" r="2" fill="#050211" />
                    </svg>
                  </motion.div>

                  {/* Absolute Center Glowing Golden Light Keyhole */}
                  <AnimatePresence>
                    {!gateOpened && (
                      <motion.div
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 z-30 shadow-[0_0_20px_rgba(234,179,8,0.9)] flex items-center justify-center border-2 border-white/40 animate-pulse"
                      >
                        <Heart size={18} className="text-[#511a05] fill-current" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Title & Sentimental Headers */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4 px-4"
              >
                <h1 className={`${lang === "en" ? "font-cursive text-5xl md:text-6xl" : "font-bengali-serif text-4xl md:text-5xl"} text-rose-pink-300 text-glow-pink`}>
                  {t.welcome}
                </h1>
                
                <p className="font-serif italic text-base md:text-xl text-rose-pink-100/90 leading-relaxed max-w-md mx-auto whitespace-pre-line">
                  {t.gateQuote}
                </p>

                {/* Opening Button */}
                <div className="pt-6">
                  <button
                    onClick={handleOpenGate}
                    disabled={gateOpened}
                    className="group relative px-8 py-3.5 rounded-full overflow-hidden font-display text-xs tracking-[0.2em] uppercase font-semibold text-white bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 border border-yellow-300/40 shadow-[0_0_25px_rgba(234,179,8,0.4)] hover:shadow-[0_0_35px_rgba(234,179,8,0.7)] transition-all duration-500 hover:scale-105 active:scale-95 disabled:opacity-50 clickable"
                    id="gate-open-btn"
                  >
                    {/* Hover Glow Slide */}
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    
                    <span className="relative flex items-center justify-center gap-2 text-glow-white">
                      {t.openGateBtn} <ChevronRight size={16} />
                    </span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* PAGE 2 – The Beginning */}
          {/* ========================================================= */}
          {page === 2 && (
            <motion.div
              key="page-2"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -30 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-xl text-center px-4"
            >
              {/* Premium Glass Card */}
              <div className="glass-card rounded-3xl p-6 md:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
                {/* Subtle soft gradient background zoom */}
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-pink-500/5 to-purple-romantic/5 animate-pulse" style={{ animationDuration: "8s" }} />

                {/* Vector Blooming Rose animation */}
                <div className="mb-4">
                  <BloomingRose />
                </div>

                {/* Quote details */}
                <div className="space-y-6 md:space-y-8 my-6 text-center max-w-md mx-auto">
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1.2 }}
                    className="font-serif italic text-base md:text-lg text-rose-pink-100 leading-relaxed whitespace-pre-line"
                  >
                    {t.p2Quote1}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 1.2 }}
                    className="font-serif italic text-base md:text-lg text-rose-pink-200/90 leading-relaxed whitespace-pre-line"
                  >
                    {t.p2Quote2}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.0, duration: 1.2 }}
                    className="font-serif italic text-lg md:text-xl text-white font-medium text-glow-pink leading-relaxed whitespace-pre-line"
                  >
                    {t.p2Quote3}
                  </motion.p>
                </div>

                {/* Page Action */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4.2 }}
                  className="pt-6 relative z-10"
                >
                  <button
                    onClick={() => setPage(3)}
                    className="group relative px-10 py-3.5 rounded-full overflow-hidden font-display text-xs tracking-widest uppercase font-semibold text-white bg-gradient-to-r from-rose-pink-600 to-purple-romantic border border-rose-pink-400/40 shadow-[0_0_20px_rgba(255,77,109,0.3)] hover:shadow-[0_0_30px_rgba(255,77,109,0.6)] transition-all duration-500 hover:scale-105 active:scale-95 clickable"
                    id="continue-to-p3-btn"
                  >
                    <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative flex items-center justify-center gap-2">
                      {t.continueBtn} <ArrowRight size={14} />
                    </span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* PAGE 3 – The Feelings I Never Said */}
          {/* ========================================================= */}
          {page === 3 && (
            <motion.div
              key="page-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-xl px-4 relative"
            >
              {/* Fluttering Butterflies on edges */}
              <div className="absolute -top-10 -left-6 z-20 animate-pulse" style={{ animation: "flightPath 20s infinite linear" }}>
                <Butterfly color="#ff8fab" size={38} />
              </div>
              <div className="absolute -bottom-6 -right-6 z-20 animate-pulse" style={{ animation: "flightPath 14s infinite linear reverse" }}>
                <Butterfly color="#ffc2d1" size={34} />
              </div>

              {/* Romantic Letter/Journal Glass Card */}
              <div className="glass-card rounded-3xl p-6 md:p-10 border border-rose-pink-300/10 shadow-2xl relative">
                {/* Journal binding decor */}
                <div className="absolute top-0 bottom-0 left-4 w-[1px] bg-white/10" />
                <div className="absolute top-0 bottom-0 left-5 w-[1px] bg-white/5" />

                {/* Headings */}
                <div className="text-center mb-8 pl-4">
                  <span className="font-display text-[10px] tracking-[0.3em] text-rose-pink-300 uppercase font-bold text-glow-pink">
                    {t.chapter3}
                  </span>
                  <h2 className="font-serif italic text-2xl text-white mt-1">
                    {t.feelingsTitle}
                  </h2>
                </div>

                {/* Handwritten typing text area */}
                <div className="min-h-[210px] md:min-h-[230px] flex items-center justify-center bg-black/25 rounded-2xl p-6 border border-white/5 relative shadow-inner overflow-hidden">
                  <div className="absolute top-3 left-4 text-[9px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-1">
                    <BookOpen size={10} /> {t.pageOf(p3Sentence + 1, t.sentences.length)}
                  </div>

                  <div className="w-full text-center py-4">
                    {/* Animated Typing Text */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`sentence-${p3Sentence}-${lang}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className={`${lang === "en" ? "font-cursive text-3xl md:text-4xl" : "font-bengali-serif text-2xl md:text-3xl"} text-rose-pink-200 leading-relaxed px-2 min-h-[70px] flex items-center justify-center text-glow-pink`}
                      >
                        <TypewriterText 
                          text={t.sentences[p3Sentence]} 
                          speed={0.035}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Diary controls */}
                <div className="flex justify-between items-center mt-8 pl-4">
                  {/* Previous sentence button */}
                  <button
                    onClick={() => setP3Sentence((prev) => Math.max(0, prev - 1))}
                    disabled={p3Sentence === 0}
                    className={`text-xs font-display uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                      p3Sentence === 0 
                        ? "border-white/5 text-white/20 cursor-not-allowed" 
                        : "border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
                    } clickable`}
                    id="prev-p3-sentence-btn"
                  >
                    {t.prev}
                  </button>

                  {/* Step dots */}
                  <div className="flex gap-1.5">
                    {t.sentences.map((_, idx) => (
                      <div
                        key={`step-${idx}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === p3Sentence 
                            ? "w-4 bg-rose-pink-500 shadow-[0_0_8px_#ff4d6d]" 
                            : "w-1.5 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Next / One Last Gate trigger */}
                  {p3Sentence < t.sentences.length - 1 ? (
                    <button
                      onClick={() => setP3Sentence((prev) => prev + 1)}
                      className="text-xs font-display uppercase tracking-widest px-5 py-2 rounded-full bg-rose-pink-500/20 text-rose-pink-200 border border-rose-pink-400/30 hover:bg-rose-pink-500/40 hover:text-white transition-all flex items-center gap-1.5 shadow-sm clickable animate-pulse"
                      id="next-p3-sentence-btn"
                    >
                      {t.next} <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setPage(4)}
                      className="text-xs font-display uppercase tracking-widest px-5 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-[#511a05] font-semibold border border-yellow-300/40 shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] hover:scale-105 transition-all flex items-center gap-1 clickable"
                      id="continue-to-p4-btn"
                    >
                      {t.oneLastGate} <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* PAGE 4 – My Heart (Timeline) */}
          {/* ========================================================= */}
          {page === 4 && (
            <motion.div
              key="page-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center"
            >
              {/* Embed structural timeline with language code */}
              <Timeline lang={lang} />

              {/* Progress to final Page */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="pt-10 pb-6 relative z-10"
              >
                <button
                  onClick={() => setPage(5)}
                  className="group relative px-12 py-4 rounded-full overflow-hidden font-display text-xs tracking-widest uppercase font-bold text-white bg-gradient-to-r from-rose-pink-600 via-rose-pink-500 to-purple-romantic border border-rose-pink-400/40 shadow-[0_0_25px_rgba(255,77,109,0.4)] hover:shadow-[0_0_40px_rgba(255,77,109,0.8)] transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-2 clickable"
                  id="go-to-proposal-btn"
                >
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Heart size={16} className="text-white fill-current animate-pulse" />
                  {t.finalTruthBtn}
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* PAGE 5 – Proposal (Breathtaking) */}
          {/* ========================================================= */}
          {page === 5 && (
            <motion.div
              key="page-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="w-full max-w-2xl px-4 relative flex flex-col items-center justify-center text-center"
            >
              {/* YES Exploding Hearts / fireworks canvas simulation */}
              {proposalAnswer === "yes" && (
                <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
                  {yesExplosions.map((heart) => (
                    <motion.svg
                      key={`yes-h-${heart.id}`}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                      animate={{
                        x: Math.cos(heart.angle) * heart.speed,
                        y: Math.sin(heart.angle) * heart.speed - 120, // drift up
                        scale: [0, 1.2, 0.8, 0],
                        opacity: [1, 0.9, 0.4, 0],
                        rotate: heart.angle * 45
                      }}
                      transition={{
                        duration: 2.2,
                        delay: heart.delay,
                        ease: "easeOut"
                      }}
                      className="absolute left-1/2 top-1/2 fill-current"
                      style={{
                        color: heart.color,
                        width: `${heart.size}px`,
                        height: `${heart.size}px`,
                      }}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </motion.svg>
                  ))}
                </div>
              )}

              {/* Proposal State machine rendering */}
              <AnimatePresence mode="wait">
                
                {/* 1. INITIAL REVEAL: "Somaiya" inside Crystal Heart */}
                {proposalAnswer === null && proposalState === 0 && (
                  <motion.div
                    key="prop-state-0"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 1.5, type: "spring" }}
                    className="relative w-72 h-72 flex items-center justify-center"
                  >
                    {/* Pulsing Crystal Heart border */}
                    <div className="absolute inset-0 animate-heartbeat flex items-center justify-center">
                      <svg className="w-full h-full text-rose-pink-500/10 fill-current filter drop-shadow-[0_0_20px_rgba(255,77,109,0.4)]" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                    {/* Glowing golden keyhole center */}
                    <span className={`${lang === "en" ? "font-cursive text-5xl md:text-6xl" : "font-bengali-serif text-4xl md:text-5xl"} text-white relative z-10 text-glow-pink`}>
                      {lang === "en" ? "MAHIRU" : "মাহিরু"}
                    </span>
                  </motion.div>
                )}

                {/* 2. SECOND REVEAL: "I Love You" */}
                {proposalAnswer === null && proposalState === 1 && (
                  <motion.div
                    key="prop-state-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 1.2 }}
                    className="relative w-80 h-80 flex flex-col items-center justify-center"
                  >
                    <div className="absolute inset-0 animate-heartbeat flex items-center justify-center">
                      <svg className="w-full h-full text-rose-pink-500/20 fill-current filter drop-shadow-[0_0_30px_rgba(255,77,109,0.6)]" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                    <span className={`${lang === "en" ? "font-cursive text-3xl md:text-4xl" : "font-bengali-serif text-2xl md:text-3xl"} text-rose-pink-100 relative z-10 uppercase tracking-widest block`}>
                      {lang === "en" ? "MAHIRU" : "মাহিরু"}
                    </span>
                    <span className={`${lang === "en" ? "font-serif text-4xl md:text-5xl" : "font-bengali-serif text-3xl md:text-4xl"} font-bold text-white relative z-10 text-glow-pink uppercase tracking-wider mt-3`}>
                      {lang === "en" ? "I Love You" : "আমি তোমাকে ভালোবাসি"}
                    </span>
                  </motion.div>
                )}

                {/* 3. FINAL REVEAL: Full Emotional Proposal Letter */}
                {proposalAnswer === null && proposalState === 2 && (
                  <motion.div
                    key="prop-state-2"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="glass-card rounded-3xl p-6 md:p-10 border border-rose-pink-300/20 shadow-2xl relative w-full overflow-hidden"
                  >
                    {/* Subtle spinning heart watermark inside */}
                    <div className="absolute -right-12 -bottom-12 text-rose-pink-500/5 rotate-12">
                      <Heart size={200} fill="currentColor" />
                    </div>

                    {/* Letter Headers */}
                    <div className="relative z-10 text-center mb-6">
                      <Heart size={36} className="text-rose-pink-500 fill-current animate-bounce mx-auto mb-2" />
                      <h2 className={`${lang === "en" ? "font-cursive text-5xl" : "font-bengali-serif text-4xl"} text-rose-pink-300 text-glow-pink`}>
                        {lang === "en" ? "MAHIRU" : "মাহিরু"}
                      </h2>
                    </div>

                    {/* Emotional Text */}
                    <div className="space-y-4 max-w-lg mx-auto relative z-10">
                      <p className={`${lang === "en" ? "font-serif text-base md:text-lg" : "font-bengali-serif text-sm md:text-base"} italic text-rose-pink-100 leading-relaxed whitespace-pre-line`}>
                        {t.letterIntro}
                      </p>
                      
                      <p className={`${lang === "en" ? "font-sans" : "font-bengali-sans"} text-xs md:text-sm text-white/85 leading-relaxed tracking-wide`}>
                        {t.letterSub}
                      </p>
                      
                      <p className={`${lang === "en" ? "font-serif text-lg md:text-xl" : "font-bengali-serif text-base md:text-lg"} italic text-white font-medium text-glow-pink leading-relaxed whitespace-pre-line`}>
                        {t.letterBody}
                      </p>
                    </div>

                    {/* From Tarek tag */}
                    <div className="mt-6 flex flex-col items-center justify-center font-display relative z-10">
                      <div className="h-[1px] w-16 bg-rose-pink-300/30 mb-2" />
                      <span className={`${lang === "en" ? "font-display" : "font-bengali-sans"} text-[10px] tracking-widest text-rose-pink-400 uppercase`}>{t.letterWithSoul}</span>
                      <span className={`${lang === "en" ? "font-cursive text-2xl md:text-3xl" : "font-bengali-serif text-xl md:text-2xl"} text-white mt-1 text-glow-white text-center px-4`}>❤️ {t.letterFromTarek}</span>
                    </div>

                    {/* Action buttons side-by-side */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-4 relative z-10">
                      {/* YES BUTTON */}
                      <button
                        onClick={triggerCelebration}
                        className="w-full sm:w-auto min-w-[160px] group relative px-8 py-3.5 rounded-full overflow-hidden font-display text-xs tracking-widest uppercase font-bold text-white bg-gradient-to-r from-rose-pink-600 via-rose-pink-500 to-rose-pink-600 border border-rose-pink-400/50 shadow-[0_0_20px_rgba(255,77,109,0.4)] hover:shadow-[0_0_35px_rgba(255,77,109,0.8)] transition-all duration-500 hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 clickable"
                        id="proposal-yes-btn"
                      >
                        <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <Heart size={14} className="text-white fill-current animate-pulse" />
                        {t.yesDoBtn}
                      </button>

                      {/* NEED TIME BUTTON */}
                      <button
                        onClick={() => setProposalAnswer("need_time")}
                        className="w-full sm:w-auto min-w-[150px] group px-8 py-3.5 rounded-full border border-white/20 bg-black/40 text-white/80 hover:bg-black/60 hover:text-white hover:border-white/40 transition-all duration-300 text-xs font-display tracking-widest uppercase flex items-center justify-center gap-1.5 clickable"
                        id="proposal-maybe-btn"
                      >
                        {t.needTimeBtn}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 4. RESPONSE: YES */}
                {proposalAnswer === "yes" && (
                  <motion.div
                    key="prop-response-yes"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.0 }}
                    className="glass-card-pink rounded-3xl p-8 md:p-12 border border-rose-pink-400/40 shadow-2xl relative max-w-xl w-full"
                  >
                    {/* Glowing floating hearts surrounding */}
                    <div className="absolute top-4 left-6 text-rose-pink-300/30 animate-bounce">
                      <Heart size={32} fill="currentColor" />
                    </div>
                    <div className="absolute bottom-6 right-6 text-rose-pink-300/30 animate-pulse">
                      <Heart size={44} fill="currentColor" />
                    </div>

                    <div className="text-center space-y-6 relative z-10">
                      <Heart size={64} className="text-rose-pink-500 fill-current animate-pulse mx-auto shadow-rose-pink-500/20" />
                      
                      <h2 className={`${lang === "en" ? "font-cursive text-5xl md:text-6xl" : "font-bengali-serif text-4xl md:text-5xl"} text-white text-glow-pink`}>
                        {t.thankYou}
                      </h2>
                      
                      <p className={`${lang === "en" ? "font-serif text-lg md:text-2xl" : "font-bengali-serif text-base md:text-xl"} italic text-rose-pink-100 leading-relaxed max-w-md mx-auto whitespace-pre-line`}>
                        {t.happyTarek}
                      </p>

                      <p className={`${lang === "en" ? "font-sans" : "font-bengali-sans"} text-xs text-white/60 tracking-wider uppercase`}>
                        {t.foreverBeginning}
                      </p>

                      {/* Replay journey */}
                      <div className="pt-4">
                        <button
                          onClick={() => {
                            setProposalAnswer(null);
                            setPage(1);
                            setGateOpened(false);
                            setP3Sentence(0);
                          }}
                          className="px-6 py-2.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-[11px] uppercase tracking-widest flex items-center gap-1.5 mx-auto clickable"
                          id="restart-journey-btn"
                        >
                          <RotateCcw size={12} /> {t.replayStory}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 5. RESPONSE: NEED TIME */}
                {proposalAnswer === "need_time" && (
                  <motion.div
                    key="prop-response-need-time"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.0 }}
                    className="glass-card rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl relative max-w-xl w-full"
                  >
                    <div className="text-center space-y-6 relative z-10">
                      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-rose-pink-300">
                        <Heart size={28} className="opacity-80" />
                      </div>

                      <h2 className={`${lang === "en" ? "font-serif text-2xl" : "font-bengali-serif text-xl"} text-white font-medium text-glow-white`}>
                        {t.understandTitle}
                      </h2>

                      <p className={`${lang === "en" ? "font-sans text-sm md:text-base" : "font-bengali-sans text-xs md:text-sm"} text-white/80 leading-relaxed max-w-md mx-auto whitespace-pre-line`}>
                        {t.respectQuote}
                      </p>

                      <div className="pt-2">
                        <span className={`${lang === "en" ? "font-cursive text-3xl" : "font-bengali-serif text-2xl"} text-rose-pink-300 block text-glow-pink`}>
                          {t.withCareTarek}
                        </span>
                      </div>

                      {/* Controls to reconsider/go back */}
                      <div className="flex justify-center gap-4 pt-6">
                        <button
                          onClick={() => setProposalAnswer(null)}
                          className="px-6 py-2.5 rounded-full bg-rose-pink-500/20 text-rose-pink-200 border border-rose-pink-400/30 hover:bg-rose-pink-500/40 hover:text-white transition-all text-xs font-display tracking-wider uppercase clickable"
                          id="proposal-back-btn"
                        >
                          {t.goBack}
                        </button>

                        <button
                          onClick={() => {
                            setProposalAnswer(null);
                            setPage(1);
                            setGateOpened(false);
                            setP3Sentence(0);
                          }}
                          className="px-6 py-2.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-xs font-display tracking-wider uppercase flex items-center gap-1.5 clickable"
                          id="restart-journey-need-time-btn"
                        >
                          <RotateCcw size={12} /> {t.replayShort}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer / Copyright bar */}
      <footer className="relative w-full z-20 px-6 py-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-white/40 text-[10px] uppercase tracking-widest gap-4">
        <p className="text-center md:text-left">
          {t.designedBy}
        </p>
        <div className="flex items-center gap-2 text-center md:text-right">
          <span>{t.title}</span>
          <span>•</span>
          <span>{t.monthYear}</span>
        </div>
      </footer>
    </div>
  );
}
