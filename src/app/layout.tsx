"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarEntree, SidebarMain } from "./components/Sidebar";
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
        <SessionProvider>
          <SidebarMain>
            <SidebarEntree link={"/"} className="w-10 h-10">
              <FaHome className="w-full h-full" />
            </SidebarEntree>
            <SidebarEntree link={"/game"} className="w-10 h-10">
              <MdSportsEsports className="w-full h-full" />
            </SidebarEntree>
            <SidebarEntree link={"/leaderboard"} className="w-10 h-10">
              <FaTrophy className="w-full h-full" color="gold" />
            </SidebarEntree>
            <SidebarEntree link={"/settings"} className="w-10 h-10">
              <IoSettingsOutline className="w-full h-full" />
            </SidebarEntree>
          </SidebarMain>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
