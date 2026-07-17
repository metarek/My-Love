import { motion } from "motion/react";

export default function BloomingRose() {
  return (
    <div className="relative w-48 h-48 mx-auto flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(255,77,109,0.5)]">
      {/* Soft Rose Aura */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-28 h-28 bg-gradient-to-r from-rose-pink-500/30 to-rose-pink-300/30 rounded-full blur-xl"
      />

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8fab" />
            <stop offset="50%" stopColor="#ff4d6d" />
            <stop offset="100%" stopColor="#c9184a" />
          </linearGradient>
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2d6a4f" />
            <stop offset="100%" stopColor="#1b4332" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#52b788" />
            <stop offset="100%" stopColor="#2d6a4f" />
          </linearGradient>
        </defs>

        {/* Stem (drawn with pathLength) */}
        <motion.path
          d="M 50 55 C 50 65, 45 75, 48 90"
          stroke="url(#stemGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Left Leaf */}
        <motion.path
          d="M 47 70 C 35 68, 30 75, 46 78 Z"
          fill="url(#leafGrad)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8, type: "spring" }}
          style={{ transformOrigin: "47px 70px" }}
        />

        {/* Right Leaf */}
        <motion.path
          d="M 49 76 C 62 74, 65 81, 48 84 Z"
          fill="url(#leafGrad)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
          style={{ transformOrigin: "49px 76px" }}
        />

        {/* Thorn */}
        <motion.path
          d="M 50 62 L 54 60 L 50 64 Z"
          fill="#1b4332"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        />

        {/* ROSE PETALS - BLOOMING EFFECT (Outer to Inner) */}

        {/* Outer Petals Left & Right */}
        <motion.path
          d="M 50 55 C 28 50, 32 25, 50 35 C 68 25, 72 50, 50 55 Z"
          fill="url(#petalGrad)"
          opacity="0.8"
          initial={{ scale: 0.2, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 0.8 }}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          style={{ transformOrigin: "50px 50px" }}
        />

        {/* Secondary Petals */}
        <motion.path
          d="M 50 55 C 33 45, 38 30, 50 40 C 62 30, 67 45, 50 55 Z"
          fill="url(#petalGrad)"
          opacity="0.9"
          initial={{ scale: 0.1, rotate: 15, opacity: 0 }}
          animate={{ scale: 1.05, rotate: 0, opacity: 0.95 }}
          transition={{ delay: 0.8, duration: 1.1, ease: "easeOut" }}
          style={{ transformOrigin: "50px 50px" }}
        />

        {/* Main Tulip Cup Shape */}
        <motion.path
          d="M 50 52 C 38 48, 40 35, 50 42 C 60 35, 62 48, 50 52 Z"
          fill="url(#petalGrad)"
          initial={{ scale: 0, rotate: -10, opacity: 0 }}
          animate={{ scale: 1.1, rotate: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 1.0, ease: "easeOut" }}
          style={{ transformOrigin: "50px 50px" }}
        />

        {/* Center Bud core */}
        <motion.path
          d="M 50 49 C 43 46, 44 38, 50 43 C 56 38, 57 46, 50 49 Z"
          fill="#c9184a"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.15, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.9, type: "spring" }}
          style={{ transformOrigin: "50px 45px" }}
        />

        {/* Center Fold */}
        <motion.path
          d="M 47 43 C 50 40, 50 40, 53 43"
          stroke="#fff0f3"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        />
      </svg>
    </div>
  );
}
