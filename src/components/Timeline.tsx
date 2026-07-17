import React from "react";
import { motion } from "motion/react";
import { BookOpen, Smile, MessageCircle, Heart, Quote } from "lucide-react";

interface TimelineItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  dateText: string;
}

interface TimelineProps {
  lang: "en" | "bn";
}

export default function Timeline({ lang }: TimelineProps) {
  const quotes = lang === "en" ? [
    "If love had a name, it would be Somaiya.",
    "You became my favorite chapter.",
    "You never asked for my heart, yet somehow... you own it."
  ] : [
    "ভালোবাসার যদি কোনো নাম থাকতো, তবে সে নাম হতো সুমাইয়া।",
    "তুমি হয়ে উঠেছো আমার জীবনের সবচেয়ে প্রিয় অধ্যায়।",
    "তুমি কখনো আমার মন চাওনি, তবুও কোনো একভাবে... তুমিই এটার মালিক।"
  ];

  const memories: TimelineItem[] = lang === "en" ? [
    {
      icon: <BookOpen className="text-rose-pink-400" size={22} />,
      title: "Class",
      description: "Where it all began. Every single lecture, my eyes searched the room only to find peace in your presence.",
      dateText: "The Start"
    },
    {
      icon: <Smile className="text-rose-pink-400" size={22} />,
      title: "Smile",
      description: "The moment you smiled, the chaotic world became silent. It was as if everything was designed just to hear you laugh.",
      dateText: "The Magic"
    },
    {
      icon: <MessageCircle className="text-rose-pink-400" size={22} />,
      title: "Conversations",
      description: "Simple talks, light laughter, and sharing notes. Even the shortest words with you felt like the deepest melodies.",
      dateText: "The Connection"
    },
    {
      icon: <Heart className="text-rose-pink-400 animate-pulse" size={22} />,
      title: "Silent Feelings",
      description: "The unspoken words. Watching you from afar, praying for your happiness, and realizing that you have become my entire world.",
      dateText: "The Truth"
    }
  ] : [
    {
      icon: <BookOpen className="text-rose-pink-400" size={22} />,
      title: "ক্লাস",
      description: "যেখান থেকে সব শুরু হয়েছিল। প্রতিটি লেকচারে, আমার চোখ শুধু তোমাকেই খুঁজতো, আর তোমাকে দেখার পরই যেন শান্তি খুঁজে পেতাম।",
      dateText: "শুরুটা"
    },
    {
      icon: <Smile className="text-rose-pink-400" size={22} />,
      title: "হাসি",
      description: "যে মুহূর্তে তুমি হাসতে, এই ব্যস্ত পৃথিবী যেন নিস্তব্ধ হয়ে যেত। মনে হতো সবকিছুই কেবল তোমার হাসি শোনার জন্য তৈরি হয়েছে।",
      dateText: "সেই জাদু"
    },
    {
      icon: <MessageCircle className="text-rose-pink-400" size={22} />,
      title: "কথোপকথন",
      description: "ছোটখাটো কথা, হালকা হাসি আর নোট শেয়ার করা। তোমার সাথে বলা প্রতিটি ছোট কথাও আমার হৃদয়ে গভীর কোনো সুরের মতো শোনাতো।",
      dateText: "বন্ধন"
    },
    {
      icon: <Heart className="text-rose-pink-400 animate-pulse" size={22} />,
      title: "না বলা অনুভূতি",
      description: "ভেতরে লুকিয়ে রাখা না বলা কথাগুলো। দূর থেকে তোমাকে দেখা, তোমার সুখের জন্য প্রার্থনা করা এবং বুঝতে পারা যে তুমিই আমার পুরো পৃথিবী হয়ে উঠেছো।",
      dateText: "সত্যটা"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      {/* Dynamic Quotes Stagger */}
      <div className="mb-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {quotes.map((quote, idx) => (
          <motion.div
            key={`quote-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.3 + 0.2, duration: 0.8 }}
            className="glass-card-pink rounded-2xl p-5 border border-rose-pink-300/30 relative overflow-hidden group hover:border-rose-pink-400/50 transition-all duration-300 shadow-lg"
          >
            <div className="absolute top-2 right-3 text-rose-pink-400/20 group-hover:scale-110 transition-transform duration-300">
              <Quote size={32} />
            </div>
            <p className={`${lang === "en" ? "font-serif text-sm md:text-base" : "font-bengali-serif text-xs md:text-sm"} italic text-rose-pink-100 leading-relaxed text-center relative z-10 pt-2`}>
              "{quote}"
            </p>
            <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-gradient-to-br from-rose-pink-500/20 to-transparent rounded-full blur-md" />
          </motion.div>
        ))}
      </div>

      {/* Love Journey Timeline */}
      <h3 className={`text-center ${lang === "en" ? "font-display text-lg tracking-widest" : "font-bengali-sans text-base md:text-lg"} text-rose-pink-200 uppercase mb-10 text-glow-pink`}>
        {lang === "en" ? "My Unspoken Memories" : "আমার না বলা স্মৃতিগুলো"}
      </h3>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative border-l-2 border-rose-pink-400/30 ml-4 md:ml-32 pl-8 md:pl-12 space-y-12"
      >
        {memories.map((memory, index) => (
          <motion.div
            key={`memory-${index}`}
            variants={itemVariants}
            className="relative"
          >
            {/* Timeline dot / icon */}
            <span className="absolute -left-[45px] md:-left-[61px] top-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#0a051b] border-2 border-rose-pink-400 shadow-[0_0_15px_rgba(255,77,109,0.4)] z-10 transition-all duration-300 hover:scale-110 hover:border-white">
              {memory.icon}
            </span>

            {/* Left date/time stamp for desktop */}
            <span className={`hidden md:block absolute -left-44 top-3 text-right w-28 ${lang === "en" ? "font-display text-xs" : "font-bengali-sans text-[11px]"} tracking-wider text-rose-pink-300/80`}>
              {memory.dateText}
            </span>

            {/* Content Glass Card */}
            <div className="glass-card rounded-2xl p-5 md:p-6 hover:shadow-[0_8px_30px_rgba(255,77,109,0.15)] transition-all duration-500 hover:bg-white/[0.06] group border border-white/5 relative overflow-hidden">
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-rose-pink-400 to-purple-romantic opacity-70" />
              
              <div className="flex justify-between items-center mb-2">
                <h4 className={`${lang === "en" ? "font-serif text-lg md:text-xl" : "font-bengali-serif text-base md:text-lg"} font-semibold text-white group-hover:text-rose-pink-300 transition-colors duration-300`}>
                  ❤️ {memory.title}
                </h4>
                <span className={`md:hidden ${lang === "en" ? "font-sans" : "font-bengali-sans"} text-[10px] tracking-wider uppercase bg-rose-pink-500/20 text-rose-pink-200 px-2.5 py-0.5 rounded-full border border-rose-pink-400/30`}>
                  {memory.dateText}
                </span>
              </div>
              
              <p className={`${lang === "en" ? "font-sans text-xs md:text-sm" : "font-bengali-sans text-xs md:text-sm"} text-white/70 leading-relaxed`}>
                {memory.description}
              </p>

              {/* Glowing accent decor inside card */}
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-r from-rose-pink-500/10 to-purple-romantic/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
