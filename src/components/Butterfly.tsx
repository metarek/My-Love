import React from "react";

interface ButterflyProps {
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}

export default function Butterfly({ color = "#ff8fab", size = 32, style }: ButterflyProps) {
  return (
    <div 
      className="relative pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        perspective: "400px",
        filter: `drop-shadow(0 0 8px ${color})`,
        ...style
      }}
    >
      {/* Container for 3D rotation */}
      <div 
        className="w-full h-full flex items-center justify-center relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Left Wing */}
        <div 
          className="absolute right-1/2 w-[45%] h-[80%] rounded-[50%_40%_20%_50%]"
          style={{
            backgroundColor: color,
            opacity: 0.85,
            transformOrigin: "right center",
            animation: "flapLeft 0.3s infinite ease-in-out",
            borderRight: "1px solid rgba(255,255,255,0.4)"
          }}
        />
        
        {/* Right Wing */}
        <div 
          className="absolute left-1/2 w-[45%] h-[80%] rounded-[40%_50%_50%_20%]"
          style={{
            backgroundColor: color,
            opacity: 0.85,
            transformOrigin: "left center",
            animation: "flapRight 0.3s infinite ease-in-out",
            borderLeft: "1px solid rgba(255,255,255,0.4)"
          }}
        />

        {/* Butterfly Body */}
        <div className="absolute w-[8%] h-[70%] bg-black/80 rounded-full z-10 shadow-inner" />
        
        {/* Antennae */}
        <div className="absolute top-[-10%] w-[20%] h-[30%] flex justify-between z-0">
          <div className="w-[1px] h-full bg-white/60 origin-bottom -rotate-12" />
          <div className="w-[1px] h-full bg-white/60 origin-bottom rotate-12" />
        </div>
      </div>
    </div>
  );
}
