import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { AppKitProvider } from "@/providers/appkit";
import { AuthProvider } from "@/providers/auth";
import { DataSdkProvider } from "@/providers/data-sdk";
import { ThemeProvider } from "@/providers/theme";

import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roleverse",
  description:
    "Roleverse is a social platform for roleplaying games. Create characters, join games, and tell stories with your friends.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Toaster />
          <AppKitProvider>
            <DataSdkProvider>
              <AuthProvider>{children}</AuthProvider>
            </DataSdkProvider>
          </AppKitProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
