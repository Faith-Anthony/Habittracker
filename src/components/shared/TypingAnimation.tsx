"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function TypingAnimation({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    } else if (displayText.length === text.length) {
      setIsComplete(true);
    }
  }, [displayText, text]);

  return (
    <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
      {displayText}
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
