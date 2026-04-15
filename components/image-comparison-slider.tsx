"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface ImageComparisonSliderProps {
  leftImage: string;
  rightImage: string;
  leftLabel?: string;
  rightLabel?: string;
  leftAlt?: string;
  rightAlt?: string;
}

export function ImageComparisonSlider({
  leftImage,
  rightImage,
  leftLabel = "Overgrad",
  rightLabel = "Willow",
  leftAlt = "Overgrad screenshot",
  rightAlt = "Willow screenshot",
}: ImageComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(percent);
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-video rounded-card overflow-hidden select-none touch-none cursor-col-resize"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Right side background + image (Willow) — full container, sits behind */}
      <div className="absolute inset-0 bg-[#062F29] p-6">
        <div className="relative w-full h-full">
          <Image
            src={rightImage}
            alt={rightAlt}
            fill
            className="object-contain object-center rounded-md"
            draggable={false}
          />
        </div>
      </div>

      {/* Left side background + image (Overgrad) — clipped by slider position */}
      <div
        className="absolute inset-0 bg-[#D1D5DB] p-6"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="relative w-full h-full">
          <Image
            src={leftImage}
            alt={leftAlt}
            fill
            className="object-contain object-center rounded-md"
            draggable={false}
          />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 px-2.5 py-1 rounded-full pointer-events-none z-10">
        {leftLabel}
      </div>
      <div className="absolute top-3 right-3 bg-[#062F29]/90 backdrop-blur-sm text-xs font-medium text-white px-2.5 py-1 rounded-full pointer-events-none z-10">
        {rightLabel}
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white z-20 pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 z-30 pointer-events-none"
        style={{
          left: `${position}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 3L1 8L4.5 13M11.5 3L15 8L11.5 13"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
