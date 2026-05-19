"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isEmailConfirmed } from "@/lib/auth";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  // Quick check to see if we need to show email verification
  useEffect(() => {
    const checkEmailStatus = async () => {
      try {
        await isEmailConfirmed();
        // If email confirmed but not in dashboard, let login page handle it
      } catch (error) {
        // Silently fail, let form handle errors
      }
    };
    
    checkEmailStatus();
  }, [router]);

  return <LoginForm />;
}
