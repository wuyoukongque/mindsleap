import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MindsLeap 心智悦动",
  description: "AI Transformation Accelerator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
