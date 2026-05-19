"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [status, setStatus] = useState<"loading" | "success" | "error" | "waiting">("waiting");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkEmailVerification = async () => {
      const maxAttempts = 60; // Check for 5 minutes (60 * 5 sec)
      let attempts = 0;

      while (attempts < maxAttempts) {
        try {
          const user = await getCurrentUser();
          if (user?.emailConfirmed) {
            setStatus("success");
            setMessage("Email verified! Redirecting to dashboard...");
            setTimeout(() => router.push("/dashboard"), 2000);
            return;
          }
        } catch (error) {
          console.error("Error checking email verification:", error);
        }

        // Wait 5 seconds before checking again
        await new Promise((resolve) => setTimeout(resolve, 5000));
        attempts++;
      }

      setStatus("error");
      setMessage("Email verification timeout. Please check your email and try again.");
    };

    checkEmailVerification();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mb-6 flex justify-center">
            <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
              <Mail className="w-10 h-10 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Verify Your Email</h1>
          <p className="text-gray-600">We sent a confirmation link to:</p>
          <p className="text-lg font-semibold text-purple-600 mt-2">{email}</p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-purple-100">
          {status === "waiting" && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="animate-spin">
                  <div className="h-12 w-12 border-4 border-purple-200 border-t-purple-600 rounded-full"></div>
                </div>
              </div>
              <p className="text-center text-gray-700">
                Checking for email confirmation... 👀
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  📧 Check your email for a confirmation link from Supabase. Click the link to verify your email.
                </p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <p className="text-center text-gray-700 text-lg font-semibold">
                ✅ Email verified successfully!
              </p>
              <p className="text-center text-gray-600 text-sm">
                Redirecting to your dashboard...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <AlertCircle className="w-16 h-16 text-red-500" />
              </div>
              <p className="text-center text-red-700 font-semibold">
                {message}
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  💡 Tips:
                </p>
                <ul className="text-sm text-yellow-800 mt-2 space-y-1 list-disc list-inside">
                  <li>Check your spam/junk folder</li>
                  <li>Wait a few minutes and refresh this page</li>
                  <li>Try signing in directly to dashboard</li>
                </ul>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/login"
                  className="flex-1 text-center px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Go to Login
                </Link>
                <button
                  onClick={() => setStatus("waiting")}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                  Check Again
                </button>
              </div>
            </div>
          )}

          {/* Footer Help */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Already verified?{" "}
              <Link href="/login" className="text-purple-600 hover:underline font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading verification page...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
