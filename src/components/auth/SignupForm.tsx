"use client";

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { signup, signUpWithGoogle } from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/email";

export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(email, password, fullName);
      
      // Send welcome email (optional - won't block signup if it fails)
      try {
        await sendWelcomeEmail(email);
      } catch (emailError) {
        console.log("Welcome email not sent (Resend not configured):", emailError);
      }

      router.push("/auth/verify-email");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setSocialLoading(true);
    try {
      const { url } = await signUpWithGoogle();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google signup failed");
      setSocialLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-950 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header with Logo */}
        <div className="text-center mb-10">
          <div className="mb-6 flex justify-center">
            <div className="bg-white dark:bg-slate-900 rounded-full w-20 h-20 flex items-center justify-center shadow-lg border-2 border-violet-200 dark:border-violet-700">
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
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Create Account</h1>
          <p className="text-slate-500 dark:text-slate-400">Join thousands building better habits</p>
        </div>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-8 space-y-5 border border-slate-200 dark:border-slate-800"
        >
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {/* Full Name Input */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              At least 8 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition-all hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
          <span className="text-sm text-slate-500 dark:text-slate-400">or</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
        </div>

        {/* Google Signup Button */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={socialLoading}
          className="w-full flex items-center justify-center gap-3 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {socialLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-violet-600"></div>
          ) : (
            <>
              <FcGoogle size={24} />
              <span>Sign up with Google</span>
            </>
          )}
        </button>

        {/* Sign In Link */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-violet-600 dark:text-violet-400 font-semibold hover:text-violet-700 dark:hover:text-violet-300">
            Sign in
          </Link>
        </p>

        {/* Footer Links */}
        <div className="flex justify-center gap-4 mt-6 text-xs text-gray-500 dark:text-gray-400">
          <Link href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            Privacy
          </Link>
          <span>•</span>
          <Link href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </div>
  );
}
