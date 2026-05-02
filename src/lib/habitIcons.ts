// Phase 4: Habit icon mapping based on habit name/keywords

import { GiMeditation, GiBed, GiMusicSpell } from "react-icons/gi";
import { FaBrain, FaHeartPulse, FaTree, FaCode, FaDroplet, FaBookOpen, FaDumbbell, FaLungs } from "react-icons/fa6";
import { BiSolidDrink } from "react-icons/bi";
import React from "react";

export interface HabitIcon {
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const iconMap: { [key: string]: HabitIcon } = {
  water: {
    icon: React.createElement(FaDroplet, { className: "w-6 h-6" }),
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  drink: {
    icon: React.createElement(BiSolidDrink, { className: "w-6 h-6" }),
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  meditation: {
    icon: React.createElement(GiMeditation, { className: "w-6 h-6" }),
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  meditate: {
    icon: React.createElement(GiMeditation, { className: "w-6 h-6" }),
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  exercise: {
    icon: React.createElement(FaDumbbell, { className: "w-6 h-6" }),
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  workout: {
    icon: React.createElement(FaHeartPulse, { className: "w-6 h-6" }),
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
  running: {
    icon: React.createElement(FaLungs, { className: "w-6 h-6" }),
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
  reading: {
    icon: React.createElement(FaBookOpen, { className: "w-6 h-6" }),
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  read: {
    icon: React.createElement(FaBookOpen, { className: "w-6 h-6" }),
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  sleep: {
    icon: React.createElement(GiBed, { className: "w-6 h-6" }),
    color: "text-indigo-500",
    bgColor: "bg-indigo-100",
  },
  nutrition: {
    icon: React.createElement(FaHeartPulse, { className: "w-6 h-6" }),
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  healthy: {
    icon: React.createElement(FaHeartPulse, { className: "w-6 h-6" }),
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  music: {
    icon: React.createElement(GiMusicSpell, { className: "w-6 h-6" }),
    color: "text-pink-500",
    bgColor: "bg-pink-100",
  },
  nature: {
    icon: React.createElement(FaTree, { className: "w-6 h-6" }),
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  coding: {
    icon: React.createElement(FaCode, { className: "w-6 h-6" }),
    color: "text-slate-600",
    bgColor: "bg-slate-100",
  },
  learning: {
    icon: React.createElement(FaBrain, { className: "w-6 h-6" }),
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
};

export function getHabitIcon(habitName: string): HabitIcon {
  const lowerName = habitName.toLowerCase();

  // Check for exact matches first
  if (iconMap[lowerName]) {
    return iconMap[lowerName];
  }

  // Check for keyword matches
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerName.includes(key)) {
      return icon;
    }
  }

  // Default icon if no match found
  return {
    icon: React.createElement(FaBrain, { className: "w-6 h-6" }),
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  };
}
