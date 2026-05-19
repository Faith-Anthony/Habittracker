"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import SplashScreen from "@/components/shared/SplashScreen";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const timer = setTimeout(async () => {
        const authenticated = await isAuthenticated();
        if (authenticated) {
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      }, 1000);

      return () => clearTimeout(timer);
    };

    checkAuth();
  }, [router]);

  return <SplashScreen />;
}
