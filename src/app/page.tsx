"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { TypingAnimation } from "@/components/shared/TypingAnimation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { 
  CheckCircle, 
  TrendingUp, 
  Zap, 
  ArrowRight,
  Star,
  Flame,
  Brain,
  Bell,
  BarChart3,
  Calendar,
  Smartphone,
  ChevronDown,
  X,
  Menu
} from "lucide-react";

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startWhen: boolean = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startWhen) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, startWhen]);
  return count;
}

// FAQ accordion item
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-900/50 transition-colors"
      >
        <span className="font-semibold text-white pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-purple-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="px-6 pb-6 text-gray-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Toast component
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border ${
        type === "success"
          ? "bg-gray-900 border-purple-600/50 text-white"
          : "bg-gray-900 border-red-600/50 text-white"
      }`}
    >
      {type === "success" ? (
        <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
      ) : (
        <X className="w-5 h-5 text-red-400 flex-shrink-0" />
      )}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 text-gray-500 hover:text-gray-300 transition">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [waitlistName, setWaitlistName] = useState("");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true });
  const users = useCounter(12400, 2000, statsInView);
  const habits = useCounter(284000, 2200, statsInView);
  const streaks = useCounter(91, 1800, statsInView);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        router.push("/dashboard");
      }
    };
    checkAuth();
  }, [router]);

  async function handleWaitlistSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistLoading(true);
    try {
      const { error } = await supabase
        .from("waitlist")
        .insert([{ email: waitlistEmail, name: waitlistName || null }]);
      if (error) {
        if (error.code === "23505") {
          setToast({ message: "You're already on the waitlist!", type: "error" });
        } else {
          setToast({ message: "Something went wrong. Please try again.", type: "error" });
        }
      } else {
        setToast({ message: "You're on the waitlist! We'll be in touch soon.", type: "success" });
        setWaitlistEmail("");
        setWaitlistName("");
      }
    } catch {
      setToast({ message: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setWaitlistLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white transition-colors duration-300">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-40 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center shadow border border-purple-700">
              <svg className="w-6 h-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.3" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.6" />
                <circle cx="50" cy="50" r="15" fill="#8B5CF6" />
                <path d="M 50 40 L 55 25 L 50 30 L 45 25 Z" fill="#EC4899" />
                <circle cx="70" cy="35" r="2" fill="#F472B6" opacity="0.8" />
                <circle cx="30" cy="35" r="2" fill="#A78BFA" opacity="0.8" />
                <circle cx="75" cy="50" r="1.5" fill="#F472B6" opacity="0.6" />
              </svg>
            </div>
            <span className="font-bold text-xl text-purple-500">HabitFlow</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {["features", "dashboard", "testimonials", "pricing", "faq"].map((s) => (
              <a key={s} href={`#${s}`} className="text-sm font-medium text-gray-400 hover:text-white transition capitalize">
                {s}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium text-gray-300 hover:text-white transition">
              Sign In
            </Link>
            <Link href="/auth/signup" className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-all">
              Get Started
            </Link>
          </div>

          <button className="md:hidden p-2 text-gray-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-800 bg-black/95 backdrop-blur-md"
            >
              <div className="px-4 py-4 space-y-2">
                {["features", "dashboard", "testimonials", "pricing", "faq"].map((s) => (
                  <a key={s} href={`#${s}`} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-300 hover:text-white capitalize">
                    {s}
                  </a>
                ))}
                <div className="pt-4 flex flex-col gap-2">
                  <Link href="/auth/login" className="text-center py-2 text-sm text-gray-300 hover:text-white">Sign In</Link>
                  <Link href="/auth/signup" className="text-center py-3 bg-purple-600 rounded-lg text-sm font-semibold text-white">Get Started</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-800/10 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/10 border border-purple-600/30 text-purple-400 text-sm font-medium mb-8">
              <Flame className="w-4 h-4" />
              <span>The AI-powered habit tracker built for the modern mind</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
              <TypingAnimation segments={[
                { text: "Transform ", color: "purple" },
                { text: "Your Life, ", color: "white" },
                { text: "One Habit At A ", color: "purple" },
                { text: "Time", color: "white" }
              ]} />
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              HabitFlow uses AI insights and beautiful analytics to help you build, track, 
              and maintain the habits that matter most.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/auth/signup"
                className="px-8 py-4 bg-white text-purple-700 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
              >
                Start Free <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#dashboard"
                className="px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all border border-purple-600"
              >
                See Dashboard â†’
              </a>
            </div>
          </motion.div>

          {/* Animated stats */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-16"
          >
            {[
              { value: users.toLocaleString() + "+", label: "Active Users" },
              { value: habits.toLocaleString() + "+", label: "Habits Tracked" },
              { value: streaks + "%", label: "Streak Retention" },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Streak Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-purple-600/20 bg-gray-900/80 backdrop-blur-md shadow-2xl shadow-purple-900/20"
          >
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <span className="text-sm text-gray-400 font-medium">Today's Progress</span>
              <div className="flex items-center gap-2 text-orange-400 text-sm font-bold">
                <Flame className="w-4 h-4" /> 21-day streak
              </div>
            </div>
            <div className="p-6 space-y-3">
              {[
                { name: "Morning Meditation", progress: 100, done: true },
                { name: "30min Exercise", progress: 100, done: true },
                { name: "Read 20 Pages", progress: 60, done: false },
                { name: "Evening Journal", progress: 0, done: false },
              ].map((habit, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${habit.done ? "bg-purple-600" : "border-2 border-gray-600"}`}>
                    {habit.done && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className={habit.done ? "text-gray-300 line-through" : "text-white"}>{habit.name}</span>
                      <span className="text-gray-500">{habit.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full transition-all"
                        style={{ width: `${habit.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Everything You Need</h2>
            <p className="text-xl text-gray-400 max-w-xl mx-auto">
              Powerful features designed to make habit building effortless and rewarding.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: CheckCircle,
                title: "Daily Tracking",
                description: "One-click habit completion with visual progress feedback and satisfying micro-interactions.",
                color: "from-purple-600/20 to-purple-800/10",
                border: "border-purple-600/30",
              },
              {
                icon: Brain,
                title: "AI Insights",
                description: "Smart pattern recognition surfaces your peak performance windows and habit correlations.",
                color: "from-pink-600/20 to-pink-800/10",
                border: "border-pink-600/30",
              },
              {
                icon: Flame,
                title: "Streak System",
                description: "Gamified streaks with visual fire indicators that keep you motivated day after day.",
                color: "from-orange-600/20 to-orange-800/10",
                border: "border-orange-600/30",
              },
              {
                icon: Bell,
                title: "Smart Reminders",
                description: "Context-aware notifications that remind you at the optimal moment without being annoying.",
                color: "from-blue-600/20 to-blue-800/10",
                border: "border-blue-600/30",
              },
              {
                icon: BarChart3,
                title: "Deep Analytics",
                description: "Beautiful charts and heatmaps showing your consistency patterns over weeks and months.",
                color: "from-emerald-600/20 to-emerald-800/10",
                border: "border-emerald-600/30",
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                description: "Fully responsive PWA that works offline. Track habits from anywhere, anytime.",
                color: "from-violet-600/20 to-violet-800/10",
                border: "border-violet-600/30",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <div className={`p-8 rounded-2xl bg-gradient-to-br ${feature.color} border ${feature.border} hover:scale-[1.02] transition-all duration-300 group h-full`}>
                  <div className="w-12 h-12 rounded-xl bg-gray-900/60 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-purple-300" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="dashboard" className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Your Command Center</h2>
            <p className="text-xl text-gray-400 max-w-xl mx-auto">
              A calm, focused dashboard that shows exactly what matters today.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main habit list card */}
            <div className="lg:col-span-2 rounded-2xl bg-gray-900/60 border border-gray-800 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-white">Today's Habits</h3>
                <span className="text-xs text-purple-400 bg-purple-600/10 px-3 py-1 rounded-full border border-purple-600/20">3/6 done</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Morning Run", streak: 14, done: true },
                  { name: "Meditation", streak: 21, done: true },
                  { name: "Cold Shower", streak: 7, done: true },
                  { name: "Read 30 Pages", streak: 5, done: false },
                  { name: "No Social Media", streak: 3, done: false },
                  { name: "Sleep by 11pm", streak: 10, done: false },
                ].map((h, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${h.done ? "bg-purple-600/10 border border-purple-600/20" : "bg-gray-800/50 border border-gray-700/50"}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${h.done ? "bg-purple-600" : "border-2 border-gray-600"}`}>
                      {h.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className={`flex-1 text-sm ${h.done ? "text-gray-400 line-through" : "text-white"}`}>{h.name}</span>
                    <div className="flex items-center gap-1 text-xs text-orange-400">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{h.streak}d</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side widgets */}
            <div className="space-y-6">
              {/* Streak widget */}
              <div className="rounded-2xl bg-gradient-to-br from-purple-900/40 to-gray-900 border border-purple-600/30 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className="text-sm font-medium text-gray-300">Best Streak</span>
                </div>
                <div className="text-5xl font-bold text-white mb-1">21</div>
                <div className="text-xs text-gray-500">days in a row ðŸ”¥</div>
              </div>

              {/* Weekly heatmap preview */}
              <div className="rounded-2xl bg-gray-900/60 border border-gray-800 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium text-gray-300">This Week</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {["M","T","W","T","F","S","S"].map((d, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs text-gray-600 mb-1">{d}</div>
                      <div className={`w-full aspect-square rounded-md ${i < 4 ? "bg-purple-600" : i === 4 ? "bg-purple-600/50" : "bg-gray-800"}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics mini */}
              <div className="rounded-2xl bg-gray-900/60 border border-gray-800 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-medium text-gray-300">Completion Rate</span>
                </div>
                <div className="text-3xl font-bold text-emerald-400 mb-1">84%</div>
                <div className="text-xs text-gray-500 mb-3">+12% from last week</div>
                <div className="space-y-1.5">
                  {[85, 70, 90, 65, 88, 84].map((v, i) => (
                    <div key={i} className="h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500/70 rounded-full" style={{ width: `${v}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Loved by Achievers</h2>
            <p className="text-xl text-gray-400">Real people building real habits.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Morgan",
                role: "Fitness Coach",
                avatar: "AM",
                text: "HabitFlow completely changed how I approach my fitness clients. The streak system is addictively motivating and the AI insights are genuinely useful.",
                rating: 5,
                highlight: "21-day workout streak",
              },
              {
                name: "Sarah Chen",
                role: "PhD Student",
                avatar: "SC",
                text: "I went from inconsistent study sessions to a 90%+ weekly completion rate. The analytics showed me I'm most productive between 8â€“10am.",
                rating: 5,
                highlight: "90% weekly completion",
              },
              {
                name: "James Wilson",
                role: "Startup Founder",
                avatar: "JW",
                text: "Best habit tracker I've tried. The dashboard is calm and focused â€” not overwhelming. Exactly what a busy founder needs.",
                rating: 5,
                highlight: "45-day focus streak",
              },
            ].map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 bg-gray-900/60 rounded-2xl border border-gray-800 hover:border-purple-600/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.08)] transition-all duration-300 flex flex-col"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed flex-1">"{t.text}"</p>
                <div className="pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600/20 border border-purple-600/40 flex items-center justify-center text-xs font-bold text-purple-400">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                    <div className="ml-auto text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {t.highlight}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Simple, Honest Pricing</h2>
            <p className="text-xl text-gray-400">Start free. Upgrade when you're ready.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 items-center">
            {/* Free */}
            <div className="p-8 bg-gray-900/60 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all">
              <h3 className="text-lg font-bold text-white mb-1">Free</h3>
              <p className="text-gray-500 text-sm mb-6">Perfect to get started</p>
              <div className="text-4xl font-bold text-white mb-8">$0</div>
              <ul className="space-y-3 mb-8">
                {["Up to 5 habits", "Daily tracking", "Streak counter", "7-day history"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup" className="block text-center py-3 border border-gray-700 text-gray-300 rounded-xl text-sm font-semibold hover:border-purple-600 hover:text-purple-400 transition">
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="relative p-8 bg-gradient-to-b from-purple-900/60 to-gray-900/80 rounded-2xl border border-purple-600/50 shadow-[0_0_60px_rgba(124,58,237,0.15)] scale-105">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 rounded-full text-xs font-bold text-white">
                Most Popular
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Pro</h3>
              <p className="text-purple-300 text-sm mb-6">For serious habit builders</p>
              <div className="text-4xl font-bold text-white mb-8">$4.99<span className="text-lg text-gray-400">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {["Unlimited habits", "AI-powered insights", "Advanced analytics", "Email reminders", "Habit heatmaps", "Priority support"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-200">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup" className="block text-center py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-bold transition-all">
                Start Pro Trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-8 bg-gray-900/60 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all">
              <h3 className="text-lg font-bold text-white mb-1">Team</h3>
              <p className="text-gray-500 text-sm mb-6">For teams and organizations</p>
              <div className="text-4xl font-bold text-white mb-8">Custom</div>
              <ul className="space-y-3 mb-8">
                {["Everything in Pro", "Team dashboards", "Progress sharing", "API access", "Dedicated support"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 border border-gray-700 text-gray-300 rounded-xl text-sm font-semibold hover:border-purple-600 hover:text-purple-400 transition">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Common Questions</h2>
            <p className="text-xl text-gray-400">Everything you need to know about HabitFlow.</p>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "Is HabitFlow really free to start?",
                a: "Yes! The Free plan includes up to 5 habits with full streak tracking and 7-day history. No credit card required.",
              },
              {
                q: "What makes the AI insights useful?",
                a: "HabitFlow analyzes your completion patterns over time and surfaces insights like your peak performance times, which habits reinforce each other, and early warning signs for streak breaks.",
              },
              {
                q: "Can I use HabitFlow offline?",
                a: "Yes. HabitFlow is a Progressive Web App (PWA) that caches your data locally, so you can check off habits even without internet. Everything syncs automatically when you reconnect.",
              },
              {
                q: "How do I cancel my Pro subscription?",
                a: "You can cancel anytime from your account settings. If you cancel, you'll keep Pro features until the end of your billing period, then seamlessly revert to Free.",
              },
              {
                q: "Is my data private and secure?",
                a: "Absolutely. Your habit data is stored securely with Supabase (SOC 2 Type II compliant), encrypted in transit and at rest. We never sell or share your personal data.",
              },
            ].map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/10 border border-purple-600/30 text-purple-400 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>Pro features launching soon</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Join the Waitlist</h2>
          <p className="text-xl text-gray-400 mb-10">
            Be the first to get AI insights, team features, and exclusive early-bird pricing.
          </p>

          <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={waitlistName}
              onChange={(e) => setWaitlistName(e.target.value)}
              className="w-full px-5 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition text-sm"
            />
            <input
              type="email"
              placeholder="you@example.com"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              required
              className="w-full px-5 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition text-sm"
            />
            <button
              type="submit"
              disabled={waitlistLoading}
              className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white rounded-xl font-semibold transition-all text-sm"
            >
              {waitlistLoading ? "Joining..." : "Join Waitlist â†’"}
            </button>
          </form>
          <p className="text-xs text-gray-600 mt-4">No spam. Unsubscribe anytime. ~2,400 people already on the list.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 text-gray-400 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center border border-purple-700">
                  <div className="w-4 h-4 bg-purple-600 rounded-full" />
                </div>
                <span className="font-bold text-white text-lg">HabitFlow</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">Build better habits with AI insights, beautiful analytics, and a calm focused interface.</p>
              <div className="flex gap-4">
                {["Twitter", "GitHub"].map((s) => (
                  <a key={s} href="#" className="text-xs text-gray-600 hover:text-purple-400 transition">{s}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-white mb-4 text-sm">Product</p>
              <ul className="space-y-2 text-sm">
                {[["Features", "#features"], ["Pricing", "#pricing"], ["Changelog", "#"], ["Roadmap", "#"]].map(([label, href]) => (
                  <li key={label}><a href={href} className="hover:text-white transition">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-4 text-sm">Company</p>
              <ul className="space-y-2 text-sm">
                {[["About", "#"], ["Blog", "#"], ["Contact", "#"]].map(([label, href]) => (
                  <li key={label}><a href={href} className="hover:text-white transition">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-4 text-sm">Legal</p>
              <ul className="space-y-2 text-sm">
                {[["Privacy", "#"], ["Terms", "#"], ["Security", "#"]].map(([label, href]) => (
                  <li key={label}><a href={href} className="hover:text-white transition">{label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <p>&copy; 2026 HabitFlow. All rights reserved.</p>
            <p>Built with Next.js, Supabase, and Framer Motion</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
