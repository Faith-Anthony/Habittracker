"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TextSegment {
  text: string;
  color: 'white' | 'purple';
}

export function TypingAnimation({ 
  segments = [] 
}: { 
  segments?: TextSegment[]
}) {
  const [displayIndex, setDisplayIndex] = useState(0);
  const totalLength = segments.reduce((sum, seg) => sum + seg.text.length, 0);
  const isComplete = displayIndex === totalLength;

  useEffect(() => {
    if (displayIndex < totalLength) {
      const timer = setTimeout(() => {
        setDisplayIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [displayIndex, totalLength]);

  let currentPos = 0;
  const renderedSegments = segments.map((segment, idx) => {
    const segmentStart = currentPos;
    const segmentEnd = currentPos + segment.text.length;
    const displayLength = Math.max(0, Math.min(displayIndex - segmentStart, segment.text.length));
    currentPos = segmentEnd;

    return (
      <span
        key={idx}
        className={segment.color === 'purple' ? 'text-purple-600' : 'text-white'}
      >
        {segment.text.slice(0, displayLength)}
      </span>
    );
  });

  return (
    <span>
      {renderedSegments}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="ml-1 inline-block w-[3px] h-[1em] bg-purple-600"
        />
      )}
    </span>
  );
}
