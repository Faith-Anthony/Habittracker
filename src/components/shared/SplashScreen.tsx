"use client";

import Link from "next/link";

export default function SplashScreen() {
  return (
    <div
      data-testid="splash-screen"
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-8 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 -z-10 transform -translate-x-1/2"></div>

      <div className="text-center max-w-md w-full">
        {/* Logo - Cool illustration */}
        <div className="mb-12 flex justify-center">
          <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              {/* Target/Growth circles */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.3" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.6" />
              <circle cx="50" cy="50" r="15" fill="#8B5CF6" />
              
              {/* Arrow pointing up - growth indicator */}
              <path d="M 50 40 L 55 25 L 50 30 L 45 25 Z" fill="#EC4899" />
              
              {/* Decorative sparkles */}
              <circle cx="70" cy="35" r="2" fill="#F472B6" opacity="0.8" />
              <circle cx="30" cy="35" r="2" fill="#A78BFA" opacity="0.8" />
              <circle cx="75" cy="50" r="1.5" fill="#F472B6" opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-6xl md:text-7xl font-bold text-black mb-4 leading-tight">
          HabitFlow
        </h1>

        {/* Tagline */}
        <p className="text-gray-600 text-lg md:text-xl mb-16 font-light leading-relaxed">
          Master your routines with mindful precision and quiet discipline
        </p>

        {/* Image Section - People profiles with flower vase */}
        <div className="mb-16 group">
          <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-purple-200 rounded-3xl p-8 shadow-2xl transform group-hover:scale-105 transition-transform duration-300 h-48 flex items-center justify-center relative overflow-hidden">
            {/* Vase with flowers in background */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
              {/* Vase */}
              <ellipse cx="200" cy="140" rx="35" ry="45" fill="#D4A574" opacity="0.3" />
              <path d="M 185 110 Q 175 100 175 80 L 225 80 Q 225 100 215 110 L 215 140 Q 215 150 200 155 Q 185 150 185 140 Z" fill="#E8C9A0" opacity="0.4" />
              
              {/* Flowers in vase */}
              <circle cx="190" cy="70" r="8" fill="#EC4899" opacity="0.6" />
              <circle cx="210" cy="65" r="7" fill="#8B5CF6" opacity="0.6" />
              <circle cx="200" cy="55" r="9" fill="#F472B6" opacity="0.6" />
              <circle cx="185" cy="75" r="6" fill="#A78BFA" opacity="0.5" />
              <circle cx="215" cy="75" r="7" fill="#FB7185" opacity="0.5" />
              
              {/* Stems */}
              <line x1="190" y1="140" x2="190" y2="70" stroke="#B8956A" strokeWidth="2" opacity="0.3" />
              <line x1="210" y1="140" x2="210" y2="65" stroke="#B8956A" strokeWidth="2" opacity="0.3" />
              <line x1="200" y1="140" x2="200" y2="55" stroke="#B8956A" strokeWidth="2" opacity="0.3" />
            </svg>
            
            {/* People profiles in foreground */}
            <div className="relative z-10 flex items-center justify-center gap-0 -space-x-4">
              {/* Person 1 - Female with brown hair */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 shadow-md flex items-center justify-center border-4 border-white text-3xl">👩</div>
              
              {/* Person 2 - Male with dark hair */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 shadow-md flex items-center justify-center border-4 border-white text-3xl">👨</div>
              
              {/* Person 3 - Female with red hair */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 shadow-md flex items-center justify-center border-4 border-white text-3xl">👩‍🦱</div>
            </div>
            
            {/* Label at bottom */}
            <div className="absolute bottom-3 left-0 right-0 text-center z-10">
              <p className="text-xs font-semibold text-gray-600 tracking-widest uppercase">Growing Together</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4 w-full">
          <Link href="/dashboard">
            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-4 rounded-2xl hover:from-purple-700 hover:to-purple-800 hover:shadow-2xl active:scale-95 transition-all duration-200 text-lg">
              Start Journey
            </button>
          </Link>
          <Link href="/login">
            <button className="w-full border-3 border-purple-600 text-purple-600 font-bold py-4 rounded-2xl hover:bg-purple-50 hover:border-purple-700 hover:text-purple-700 active:scale-95 transition-all duration-200 text-lg">
              Sign In
            </button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-12 font-medium">
          Version 2.4.0 • Calm Tech
        </p>
      </div>
    </div>
  );
}
