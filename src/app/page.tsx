"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LazyLoad } from "@/components/shared/LazyLoad";
import { TypingAnimation } from "@/components/shared/TypingAnimation";
import { 
  CheckCircle, 
  TrendingUp, 
  Zap, 
  Shield, 
  Users, 
  ArrowRight,
  Star,
  Flame
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        router.push("/dashboard");
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-40 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center shadow border border-purple-700">
              <svg className="w-6 h-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              HabitFlow
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-purple-400 transition">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-purple-400 transition">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-purple-400 transition">
              Testimonials
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <TypingAnimation text="Transform Your Life, One Habit at a Time" />
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            HabitFlow helps you build, track, and maintain the habits that matter most. 
            Join thousands of mindful trackers achieving their goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/auth/signup"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
            >
              Start Free <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="px-8 py-4 border-2 border-gray-700 text-white rounded-lg font-semibold hover:bg-gray-900 transition-all">
              Watch Demo
            </button>
          </div>

          {/* Hero Image */}
          <LazyLoad className="rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-purple-900 to-gray-900 aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Flame className="w-10 h-10 text-white" />
                </div>
                <p className="text-gray-300">Beautiful Dashboard Coming Soon</p>
              </div>
            </div>
          </LazyLoad>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <LazyLoad className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-400">
              Everything you need to build and maintain better habits
            </p>
          </LazyLoad>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Daily Tracking",
                description: "Simple one-click completion tracking for all your habits"
              },
              {
                icon: TrendingUp,
                title: "Visual Progress",
                description: "See your growth with beautiful charts and statistics"
              },
              {
                icon: Flame,
                title: "Streak Counter",
                description: "Motivate yourself with visible habit streaks"
              },
              {
                icon: Zap,
                title: "Instant Sync",
                description: "Real-time synchronization across all your devices"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your data is encrypted and stored securely"
              },
              {
                icon: Users,
                title: "Community",
                description: "Share progress and inspire others in the community"
              }
            ].map((feature, idx) => (
              <LazyLoad key={idx}>
                <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-purple-700">
                  <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </LazyLoad>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <LazyLoad className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Loved by Users</h2>
            <p className="text-xl text-gray-400">
              See what our community says about HabitFlow
            </p>
          </LazyLoad>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Morgan",
                role: "Fitness Enthusiast",
                text: "HabitFlow helped me stick to my workout routine. The streak counter is incredibly motivating!",
                rating: 5
              },
              {
                name: "Sarah Chen",
                role: "Student",
                text: "I use it to track my study habits and productivity. The visual progress is amazing!",
                rating: 5
              },
              {
                name: "James Wilson",
                role: "Entrepreneur",
                text: "Simple, clean, and exactly what I needed. Best habit tracker I've tried.",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <LazyLoad key={idx}>
                <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-purple-700 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </LazyLoad>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <LazyLoad className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-400">
              Start free, upgrade anytime
            </p>
          </LazyLoad>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <LazyLoad>
              <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-purple-700 transition-colors">
                <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
                <p className="text-gray-400 mb-6">Perfect to start</p>
                <div className="text-4xl font-bold mb-6 text-white">$0</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Unlimited habits</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Daily tracking</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Streak counter</span>
                  </li>
                </ul>
                <Link href="/auth/signup" className="w-full block text-center py-3 border-2 border-purple-600 text-purple-400 rounded-lg font-semibold hover:bg-purple-900/20 transition">
                  Get Started
                </Link>
              </div>
            </LazyLoad>

            <LazyLoad>
              <div className="p-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl border-2 border-purple-600 transform scale-105 shadow-2xl">
                <div className="mb-4 inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-purple-100 mb-6">For serious trackers</p>
                <div className="text-4xl font-bold mb-6">$4.99<span className="text-lg">/mo</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Email reminders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Start Free Trial
                </button>
              </div>
            </LazyLoad>

            <LazyLoad>
              <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-purple-700 transition-colors">
                <h3 className="text-2xl font-bold mb-2 text-white">Enterprise</h3>
                <p className="text-gray-400 mb-6">For teams & organizations</p>
                <div className="text-4xl font-bold mb-6 text-white">Custom</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
                <button className="w-full py-3 border-2 border-purple-600 text-purple-400 rounded-lg font-semibold hover:bg-purple-900/20 transition">
                  Contact Sales
                </button>
              </div>
            </LazyLoad>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <LazyLoad className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Transform Your Habits?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of people building better habits today.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:shadow-xl transition-all hover:scale-105"
          >
            Get Started for Free →
          </Link>
        </div>
      </LazyLoad>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold text-white mb-4">HabitFlow</p>
              <p className="text-sm">Build better habits, one day at a time.</p>
            </div>
            <div>
              <p className="font-bold text-white mb-4">Product</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-white mb-4">Company</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-white mb-4">Legal</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 HabitFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
