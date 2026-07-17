import React, { useEffect, useState } from "react";

interface HeartParticle {
  id: number;
  left: string;
  size: number;
  delay: string;
  duration: string;
  swayX: string;
  opacity: number;
  scale: number;
}

interface PetalParticle {
  id: number;
  left: string;
  delay: string;
  duration: string;
  swayX: string;
  rotate: string;
  size: number;
  color: string;
}

export default function FloatingParticles() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const [petals, setPetals] = useState<PetalParticle[]>([]);

  useEffect(() => {
    // Generate floating hearts
    const generatedHearts: HeartParticle[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 95}%`,
      size: Math.random() * 16 + 10, // 10px to 26px
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 6 + 7}s`, // 7s to 13s
      swayX: `${Math.random() * 80 + 20}px`,
      opacity: Math.random() * 0.4 + 0.3, // 0.3 to 0.7
      scale: Math.random() * 0.5 + 0.7,
    }));

    // Generate falling rose petals
    const petalColors = ["#ff4d6d", "#ff8fab", "#ffc2d1", "#ffd6e0"];
    const generatedPetals: PetalParticle[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 95}%`,
      size: Math.random() * 12 + 12, // 12px to 24px
      delay: `${Math.random() * 8}s`,
      duration: `${Math.random() * 8 + 8}s`, // 8s to 16s
      swayX: `${Math.random() * 120 + 40}px`,
      rotate: `${Math.random() * 360 + 180}deg`,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    setHearts(generatedHearts);
    setPetals(generatedPetals);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <svg
          key={`heart-p-${heart.id}`}
          className="absolute text-rose-pink-400/40 animate-float-up fill-current"
          style={{
            left: heart.left,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            bottom: "-30px",
            opacity: heart.opacity,
            "--duration": heart.duration,
            "--sway-x": heart.swayX,
            "--scale": heart.scale,
            animationDelay: heart.delay,
          } as React.CSSProperties}
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}

      {/* Falling Rose Petals */}
      {petals.map((petal) => (
        <div
          key={`petal-p-${petal.id}`}
          className="absolute animate-fall-sway shadow-[0_4px_10px_rgba(255,77,109,0.15)]"
          style={{
            left: petal.left,
            width: `${petal.size}px`,
            height: `${petal.size * 0.85}px`,
            backgroundColor: petal.color,
            borderRadius: "50% 0 50% 50%", // Elegant rose petal shape
            transformOrigin: "center",
            opacity: 0.8,
            "--duration": petal.duration,
            "--sway-x": petal.swayX,
            "--rotate": petal.rotate,
            animationDelay: petal.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
