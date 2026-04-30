"use client";

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mb-6 flex justify-center">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-3">HabitFlow</h1>
          <p className="text-gray-600 text-lg">Step into your mindful routine.</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg p-8 space-y-6 border border-purple-100"
        >
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-3"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                data-testid="auth-login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <Link
                href="#"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              data-testid="auth-login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            data-testid="auth-login-submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3.5 rounded-xl hover:from-purple-700 hover:to-purple-800 hover:shadow-lg active:scale-95 transition-all duration-200 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-500 font-semibold tracking-wide">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-3 border-2 border-gray-200 text-gray-700 font-medium py-3.5 rounded-xl hover:border-purple-300 hover:bg-purple-50 active:scale-95 transition-all duration-200"
          >
            <FcGoogle size={24} />
            <span className="hidden sm:inline">Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-3 border-2 border-gray-200 text-gray-700 font-medium py-3.5 rounded-xl hover:border-purple-300 hover:bg-purple-50 active:scale-95 transition-all duration-200"
          >
            <FaApple size={24} />
            <span className="hidden sm:inline">Apple</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-8">
          New to HabitFlow?{" "}
          <Link href="/signup" className="text-purple-600 font-semibold hover:text-purple-700">
            Create an account
          </Link>
        </p>

        {/* Footer Links */}
        <div className="flex justify-center gap-4 mt-8 text-xs text-gray-500">
          <Link href="#" className="hover:text-gray-700 transition-colors">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="#" className="hover:text-gray-700 transition-colors">
            Terms of Service
          </Link>
        </div>

        {/* Daily Insight */}
        <div className="mt-10 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 flex gap-4 items-start border border-blue-100">
          <span className="text-2xl flex-shrink-0">💡</span>
          <div>
            <p className="text-xs font-semibold text-gray-700">Daily Insight</p>
            <p className="text-xs text-gray-600 mt-2">
              "Consistency is the companion of success."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
