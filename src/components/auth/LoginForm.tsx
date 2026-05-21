"use client";

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { login, signInWithGoogle } from "@/lib/auth";

export default function LoginForm() {
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
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSocialLoading(true);
    try {
      const { url } = await signInWithGoogle();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google login failed");
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
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-slate-500 dark:text-slate-400">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-8 space-y-6 border border-slate-200 dark:border-slate-800"
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
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3"
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
                className="w-full px-5 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium"
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
              className="w-full px-5 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            data-testid="auth-login-submit"
            disabled={loading}
            className="w-full bg-violet-600 text-white font-semibold py-3.5 rounded-xl hover:bg-violet-700 hover:shadow-lg active:scale-95 transition-all duration-200 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wide">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="pt-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={socialLoading}
            className="w-full flex items-center justify-center gap-3 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium py-3.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {socialLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-violet-600"></div>
            ) : (
              <>
                <FcGoogle size={24} />
                <span>Sign in with Google</span>
              </>
            )}
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-violet-600 dark:text-violet-400 font-semibold hover:text-violet-700 dark:hover:text-violet-300">
            Sign up
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
