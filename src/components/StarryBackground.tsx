import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
}

interface Firefly {
  id: number;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  swayX: string;
}

export default function StarryBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    // Generate stars statically once on mount to prevent re-render jumps
    const generatedStars: Star[] = Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 75}%`, // Concentrate more on the upper sky
      size: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 3 + 2}s`,
    }));

    // Generate floating fireflies
    const generatedFireflies: Firefly[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 90 + 5}%`,
      top: `${Math.random() * 80 + 10}%`,
      size: `${Math.random() * 3 + 2}px`,
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 5 + 5}s`,
      swayX: `${Math.random() * 60 - 30}px`,
    }));

    setStars(generatedStars);
    setFireflies(generatedFireflies);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a051b] pointer-events-none z-0">
      {/* Aurora Slow Blend Gradient */}
      <div 
        className="absolute inset-0 animate-aurora opacity-40 mix-blend-screen"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, #5a189a 0%, transparent 45%), radial-gradient(circle at 80% 70%, #ff4d6d 0%, transparent 40%), radial-gradient(circle at 50% 40%, #7b2cbf 0%, transparent 50%)"
        }}
      />

      {/* Moon with elegant glowing layers */}
      <div className="absolute top-12 right-12 md:top-20 md:right-24 flex items-center justify-center">
        {/* Outer Halo */}
        <div className="absolute w-36 h-36 bg-[#ffd6e0] opacity-5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: "6s" }} />
        {/* Soft Corona */}
        <div className="absolute w-24 h-24 bg-[#fff0f3] opacity-10 rounded-full blur-xl" />
        {/* Moon Body */}
        <div className="w-16 h-16 bg-gradient-to-br from-white to-[#ffd6e0] rounded-full shadow-[0_0_20px_rgba(255,240,243,0.8)] relative overflow-hidden">
          {/* Moon Crater shadows */}
          <div className="absolute top-4 left-3 w-4 h-4 bg-[#ffd6e0]/40 rounded-full blur-[1px]" />
          <div className="absolute top-8 left-8 w-3 h-3 bg-[#ffd6e0]/40 rounded-full blur-[1px]" />
          <div className="absolute top-10 left-4 w-2 h-2 bg-[#ffd6e0]/40 rounded-full blur-[1px]" />
        </div>
      </div>

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white animate-twinkle shadow-[0_0_8px_#ffffff]"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            "--duration": star.duration,
            animationDelay: star.delay,
          } as React.CSSProperties}
        />
      ))}

      {/* Drifting Fireflies */}
      {fireflies.map((ff) => (
        <div
          key={`firefly-${ff.id}`}
          className="absolute rounded-full bg-yellow-200 animate-firefly shadow-[0_0_12px_#fef08a,0_0_4px_#fef08a]"
          style={{
            left: ff.left,
            top: ff.top,
            width: ff.size,
            height: ff.size,
            "--duration": ff.duration,
            "--sway-x": ff.swayX,
            animationDelay: ff.delay,
          } as React.CSSProperties}
        />
      ))}

      {/* Ground fog / vignette for contrast depth */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050211] to-transparent opacity-80" />
    </div>
  );
}
