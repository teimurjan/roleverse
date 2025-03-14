import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import AppHeader from "@/components/widgets/app-header";
import AppRightSidebar from "@/components/widgets/app-right-sidebar";
import AppSidebar from "@/components/widgets/app-sidebar";
import MintDialog from "@/components/widgets/mint-dialog";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
              <AuthProvider>
                <SidebarProvider
                  name="left"
                  style={{
                    // @ts-expect-error https://ui.shadcn.com/docs/components/sidebar
                    "--sidebar-width": "18rem",
                    "--sidebar-width-mobile": "100%",
                  }}
                >
                  <SidebarProvider
                    name="right"
                    style={{
                      // @ts-expect-error https://ui.shadcn.com/docs/components/sidebar
                      "--sidebar-width": "18rem",
                      "--sidebar-width-mobile": "100%",
                    }}
                  >
                    <AppSidebar />
                    <main className="w-full flex h-screen bg-background">
                      <div className="h-full flex-1 relative overflow-hidden">
                        <SidebarTrigger className="absolute top-2 left-0" />

                        <AppHeader className="max-w-screen-lg mx-auto px-10 max-md:px-4 h-14" />

                        <div className="h-[calc(100%-3.5rem)] max-w-screen-lg px-10 max-md:px-4 pt-4 mx-auto overflow-auto">
                          {children}
                        </div>
                      </div>

                      <AppRightSidebar className="flex-[18rem] flex-grow-0 border-l" />
                    </main>

                    <MintDialog />
                  </SidebarProvider>
                </SidebarProvider>
              </AuthProvider>
            </DataSdkProvider>
          </AppKitProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
