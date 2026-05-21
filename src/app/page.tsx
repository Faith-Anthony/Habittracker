"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { TypingAnimation } from "@/components/shared/TypingAnimation";
import { ThemeToggle } from "@/components/shared/ThemeProvider";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
  CheckCircle, TrendingUp, Zap, ArrowRight, Star, Flame,
  Brain, Bell, BarChart3, Calendar, Smartphone, ChevronDown, X, Menu,
} from "lucide-react";

function useCounter(end: number, duration = 2000, active = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, active]);
  return count;
}

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <button onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
        <span className="font-medium text-slate-900 dark:text-slate-100 pr-4 text-sm sm:text-base">{q}</span>
        <ChevronDown className={`w-4 h-4 text-violet-500 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
            <p className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-900">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Toast({ message, type, onClose }: { message: string; type: string; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl border text-sm font-medium ${
        type === "success" ? "bg-white dark:bg-slate-900 border-green-200 dark:border-green-800 text-slate-900 dark:text-white" : "bg-white dark:bg-slate-900 border-red-200 dark:border-red-800 text-slate-900 dark:text-white"
      }`}>
      {type === "success" ? <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> : <X className="w-4 h-4 text-red-500 flex-shrink-0" />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-1 text-slate-400 hover:text-slate-600 transition-colors"><X className="w-3.5 h-3.5" /></button>
    </motion.div>
  );
}

function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.3" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.6" />
      <circle cx="50" cy="50" r="15" fill="#8B5CF6" />
      <path d="M 50 40 L 55 25 L 50 30 L 45 25 Z" fill="#EC4899" />
      <circle cx="70" cy="35" r="2" fill="#F472B6" opacity="0.8" />
      <circle cx="30" cy="35" r="2" fill="#A78BFA" opacity="0.8" />
    </svg>
  );
}

const TESTIMONIALS = [
  { name: "Alex Morgan", role: "Fitness coach", avatar: "AM", text: "HabitFlow transformed how I work with clients. The streak system is addictively motivating and the AI insights actually help.", badge: "21-day streak" },
  { name: "Sarah Chen", role: "PhD student", avatar: "SC", text: "I went from scattered study sessions to 90%+ weekly completion. The analytics showed I'm sharpest between 8-10am.", badge: "90% completion" },
  { name: "James Wilson", role: "Startup founder", avatar: "JW", text: "The dashboard is calm and focused — not overwhelming. It doesn't get in the way. Exactly what a busy person needs.", badge: "45-day streak" },
  { name: "Priya Sharma", role: "Product designer", avatar: "PS", text: "I've tried every habit app out there. HabitFlow is the only one I've stuck with past the first week. The UI just gets out of your way.", badge: "30-day streak" },
  { name: "Daniel Kim", role: "Software engineer", avatar: "DK", text: "The heatmap view is incredible. Seeing my consistency visually over months is exactly the long-term motivation I needed.", badge: "60-day streak" },
];

function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <div className="relative overflow-hidden" style={{ minHeight: 220 }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col"
        >
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1 mb-6">"{t.text}"</p>
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="w-9 h-9 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-xs font-bold text-violet-600 dark:text-violet-400 flex-shrink-0">{t.avatar}</div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
              <p className="text-xs text-slate-500">{t.role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-5">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-violet-500" : "w-1.5 bg-slate-300 dark:bg-slate-700"}`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [waitlistName, setWaitlistName] = useState("");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const users = useCounter(1240, 2000, statsInView);
  const habits = useCounter(18600, 2200, statsInView);
  const retention = useCounter(91, 1800, statsInView);

  useEffect(() => {
    isAuthenticated().then((ok) => { if (ok) router.push("/dashboard"); });
  }, [router]);

  async function handleWaitlist(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistLoading(true);
    try {
      const { error } = await supabase.from("waitlist").insert([{ email: waitlistEmail, name: waitlistName || null }]);
      if (error) {
        setToast({ message: error.code === "23505" ? "You\'re already on the list!" : "Something went wrong.", type: "error" });
      } else {
        setToast({ message: "You\'re on the waitlist! We\'ll be in touch.", type: "success" });
        setWaitlistEmail(""); setWaitlistName("");
      }
    } catch { setToast({ message: "Something went wrong.", type: "error" }); }
    finally { setWaitlistLoading(false); }
  }

  const navLinks = ["Features", "Dashboard", "Testimonials", "Pricing", "FAQ"];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0e17] text-slate-900 dark:text-slate-100">
      <AnimatePresence>{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>

      {/* NAV */}
      <nav className="fixed top-0 w-full z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <Logo size={28} />
            <span className="font-bold text-slate-900 dark:text-white">HabitFlow</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{s}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link href="/auth/login" className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Sign in</Link>
            <Link href="/auth/signup" className="px-4 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors">Get started</Link>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white" aria-label="Menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((s) => (
                  <a key={s} href={`#${s.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">{s}</a>
                ))}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                  <Link href="/auth/login" className="text-center py-2.5 text-sm text-slate-600 dark:text-slate-300">Sign in</Link>
                  <Link href="/auth/signup" className="text-center py-2.5 bg-violet-600 rounded-lg text-sm font-medium text-white">Get started free</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO — dark slate */}
      <section className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/8 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-8">
              <Flame className="w-3.5 h-3.5" />
              AI-powered habit tracking for focused people
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight tracking-tight">
              <TypingAnimation segments={[
                { text: "Transform ", color: "purple" },
                { text: "your life, ", color: "white" },
                { text: "one habit", color: "purple" },
                { text: " at a time", color: "white" },
              ]} />
            </h1>
            <p className="text-base sm:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              HabitFlow combines AI insights with beautiful analytics to help you build and maintain the habits that compound into lasting change.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
              <Link href="/auth/signup" className="w-full sm:w-auto px-7 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                Start for free <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#dashboard" className="w-full sm:w-auto px-7 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold text-sm transition-colors text-center">
                See the dashboard
              </a>
            </div>
          </motion.div>

          <motion.div ref={statsRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-14">
            {[
              { v: users.toLocaleString() + "+", l: "Active users" },
              { v: Math.floor(habits / 1000) + "K+", l: "Habits tracked" },
              { v: retention + "%", l: "Streak retention" },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
                <div className="text-xl sm:text-2xl font-bold text-violet-400">{s.v}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.l}</div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            className="max-w-lg mx-auto rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-sm overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Today's habits</span>
              <div className="flex items-center gap-1.5 text-orange-400 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5" />21-day streak
              </div>
            </div>
            <div className="p-5 space-y-3">
              {[
                { name: "Morning meditation", done: true, pct: 100 },
                { name: "30 min exercise", done: true, pct: 100 },
                { name: "Read 20 pages", done: false, pct: 60 },
                { name: "Evening journal", done: false, pct: 0 },
              ].map((h, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${h.done ? "bg-violet-600 border-violet-600" : "border-slate-600"}`}>
                    {h.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs mb-1">
                      <span className={h.done ? "text-slate-500 line-through" : "text-slate-200"}>{h.name}</span>
                      <span className="text-slate-600">{h.pct}%</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-600 rounded-full" style={{ width: `${h.pct}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES — light */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">Everything you need</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">Powerful features designed to make habit building effortless and rewarding.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: CheckCircle, title: "Daily tracking", desc: "One-click completion with visual progress feedback and satisfying micro-interactions." },
              { icon: Brain, title: "AI insights", desc: "Smart pattern recognition that surfaces your peak performance windows and habit correlations." },
              { icon: Flame, title: "Streak system", desc: "Gamified streaks with daily fire indicators that keep motivation high." },
              { icon: Bell, title: "Smart reminders", desc: "Context-aware notifications that reach you at the optimal moment." },
              { icon: BarChart3, title: "Deep analytics", desc: "Beautiful charts and heatmaps showing your consistency across weeks and months." },
              { icon: Smartphone, title: "Mobile first", desc: "Full PWA with offline support. Track habits anywhere, even without internet." },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}>
                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-200 h-full group">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 dark:bg-slate-700 flex items-center justify-center mb-4 group-hover:bg-slate-700 dark:group-hover:bg-slate-600 transition-colors">
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1.5">{f.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW — dark */}
      <section id="dashboard" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">Your command center</h2>
            <p className="text-slate-400 max-w-lg mx-auto">A calm, focused dashboard that shows exactly what matters today.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 p-5">
              <div className="flex items-center justify-between mb-5">
                <span className="font-medium text-slate-200 text-sm">Today's habits</span>
                <span className="text-xs text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-full">3 / 6 done</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { name: "Morning run", streak: 14, done: true },
                  { name: "Meditation", streak: 21, done: true },
                  { name: "Cold shower", streak: 7, done: true },
                  { name: "Read 30 pages", streak: 5, done: false },
                  { name: "No social media", streak: 3, done: false },
                  { name: "Sleep by 11pm", streak: 10, done: false },
                ].map((h, i) => (
                  <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${h.done ? "bg-violet-500/10 border-violet-500/20" : "bg-slate-800/50 border-slate-700/50"}`}>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${h.done ? "bg-violet-600 border-violet-600" : "border-slate-600"}`}>
                      {h.done && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`flex-1 text-sm ${h.done ? "text-slate-500 line-through" : "text-slate-200"}`}>{h.name}</span>
                    <div className="flex items-center gap-1 text-xs text-orange-400/80">
                      <Flame className="w-3 h-3" />{h.streak}d
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
                <div className="flex items-center gap-2 mb-3"><Flame className="w-4 h-4 text-orange-400" /><span className="text-xs font-medium text-slate-400">Best streak</span></div>
                <div className="text-4xl font-bold text-white">21</div>
                <div className="text-xs text-slate-600 mt-1">days in a row</div>
              </div>
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
                <div className="flex items-center gap-2 mb-4"><Calendar className="w-4 h-4 text-violet-400" /><span className="text-xs font-medium text-slate-400">This week</span></div>
                <div className="grid grid-cols-7 gap-1.5">
                  {["M","T","W","T","F","S","S"].map((d, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs text-slate-700 mb-1">{d}</div>
                      <div className={`w-full aspect-square rounded ${i < 4 ? "bg-violet-600" : i === 4 ? "bg-violet-600/40" : "bg-slate-800"}`} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
                <div className="flex items-center gap-2 mb-3"><TrendingUp className="w-4 h-4 text-emerald-400" /><span className="text-xs font-medium text-slate-400">Completion rate</span></div>
                <div className="text-2xl font-bold text-emerald-400 mb-0.5">84%</div>
                <div className="text-xs text-slate-600 mb-3">+12% from last week</div>
                <div className="space-y-1">
                  {[85, 70, 90, 65, 88, 84].map((v, i) => (
                    <div key={i} className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500/60 rounded-full" style={{ width: `${v}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — light, auto-rotating carousel */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0d1220] overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">Loved by achievers</h2>
            <p className="text-slate-500 dark:text-slate-400">Real people building real habits, day by day.</p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* PRICING — white */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">Plans & pricing</h2>
            <p className="text-slate-500 dark:text-slate-400">Start free. Upgrade when you're ready.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 items-center">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <p className="font-semibold text-slate-900 dark:text-white mb-1">Free</p>
              <p className="text-xs text-slate-500 mb-5">Perfect to start</p>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-7">$0</div>
              <ul className="space-y-2.5 mb-7">
                {["Up to 5 habits", "Daily tracking", "Streak counter", "7-day history"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="/auth/signup" className="block text-center py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:border-violet-400 hover:text-violet-600 dark:hover:border-violet-600 dark:hover:text-violet-400 transition-colors">
                Get started
              </Link>
            </div>
            <div className="relative p-6 rounded-2xl border border-violet-500/50 bg-gradient-to-b from-violet-50 to-white dark:from-violet-950/40 dark:to-slate-900 scale-[1.03] shadow-card-md dark:shadow-none">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-violet-600 rounded-full text-xs font-semibold text-white">Most popular</div>
              <p className="font-semibold text-slate-900 dark:text-white mb-1">Pro</p>
              <p className="text-xs text-violet-600 dark:text-violet-400 mb-5">For serious builders</p>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-7">$4.99<span className="text-base font-normal text-slate-400">/mo</span></div>
              <ul className="space-y-2.5 mb-7">
                {["Unlimited habits", "AI-powered insights", "Advanced analytics", "Smart reminders", "Habit heatmaps", "Priority support"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="/auth/signup" className="block text-center py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors">Start Pro trial</Link>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <p className="font-semibold text-slate-900 dark:text-white mb-1">Team</p>
              <p className="text-xs text-slate-500 mb-5">For organizations</p>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-7">Custom</div>
              <ul className="space-y-2.5 mb-7">
                {["Everything in Pro", "Team dashboards", "Progress sharing", "API access", "Dedicated support"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <button className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:border-violet-400 hover:text-violet-600 dark:hover:border-violet-600 dark:hover:text-violet-400 transition-colors">
                Contact sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — light-gray */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0d1220]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">Common questions</h2>
            <p className="text-slate-500 dark:text-slate-400">Everything you need to know about HabitFlow.</p>
          </div>
          <div className="space-y-2">
            {[
              { q: "Is HabitFlow really free?", a: "Yes. The Free plan includes up to 5 habits with full streak tracking and 7-day history. No credit card required." },
              { q: "What do the AI insights actually do?", a: "HabitFlow analyzes your completion patterns and surfaces insights like peak performance windows, which habits reinforce each other, and early warning signs for streak breaks." },
              { q: "Does it work offline?", a: "Yes. HabitFlow is a Progressive Web App with local caching. You can log habits offline and everything syncs automatically when you reconnect." },
              { q: "How do I cancel Pro?", a: "Cancel any time from your account settings. You keep Pro features until the end of your billing period, then revert to Free." },
              { q: "Is my data private?", a: "Your data is stored securely via Supabase (SOC 2 Type II compliant), encrypted in transit and at rest. We never sell or share your personal data." },
            ].map((item, i) => {
              const [openFaq, setOpenFaq] = [openFaqIndex === i, () => setOpenFaqIndex(openFaqIndex === i ? null : i)];
              return <FAQItem key={i} q={item.q} a={item.a} open={openFaq} onToggle={setOpenFaq} />;
            })}
          </div>
        </div>
      </section>

      {/* WAITLIST — dark */}
      <section id="waitlist" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-8">
            <Zap className="w-3.5 h-3.5" />Pro features launching soon
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">Join the waitlist</h2>
          <p className="text-slate-400 mb-10">Be the first to get AI insights, team features, and early-bird pricing.</p>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleWaitlist} className="flex flex-col gap-3">
              <input type="text" placeholder="Your name (optional)" value={waitlistName} onChange={(e) => setWaitlistName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm transition-colors" />
              <input type="email" placeholder="you@example.com" value={waitlistEmail} onChange={(e) => setWaitlistEmail(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm transition-colors" />
              <button type="submit" disabled={waitlistLoading}
                className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white rounded-xl font-semibold text-sm transition-colors">
                {waitlistLoading ? "Joining..." : "Join waitlist"}
              </button>
            </form>
            <p className="text-xs text-slate-600 mt-4">No spam. Unsubscribe any time.</p>
          </div>
        </div>
      </section>

      {/* FOOTER — dark */}
      <footer className="bg-slate-950 border-t border-slate-800/60 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4"><Logo size={24} /><span className="font-bold text-white">HabitFlow</span></div>
              <p className="text-sm text-slate-500 leading-relaxed">Build better habits with AI insights, beautiful analytics, and a calm focused interface.</p>
            </div>
            {[
              { title: "Product", links: [["Features", "#features"], ["Pricing", "#pricing"], ["Changelog", "#"], ["Roadmap", "#"]] },
              { title: "Company", links: [["About", "#"], ["Blog", "#"], ["Contact", "#"]] },
              { title: "Legal", links: [["Privacy", "#"], ["Terms", "#"], ["Security", "#"]] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map(([label, href]) => (
                    <li key={label}><a href={href} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <p>&#169; 2026 HabitFlow. All rights reserved.</p>
            <p>Built with Next.js, Supabase &amp; Framer Motion</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
