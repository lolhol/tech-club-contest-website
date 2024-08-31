"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "intro.js/introjs.css";
import "./globals.css";
import {
  ResponsiveSidebar,
  SidebarEntree,
  SidebarMain,
} from "./components/Sidebar";
import Link from "next/link";
import { FaHome, FaTrophy } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdSportsEsports } from "react-icons/md";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-900 text-white"}>
        <ResponsiveSidebar />
        {children}
      </body>
    </html>
  );
}

//<SessionProvider>
