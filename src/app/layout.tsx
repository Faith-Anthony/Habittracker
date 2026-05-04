import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7c3aed",
};

export const metadata: Metadata = {
  title: "HabitFlow - Habit Tracker",
  description: "Master your routines with mindful precision and quiet discipline",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HabitFlow",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
