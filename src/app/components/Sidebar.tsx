"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaHome, FaTrophy } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdSportsEsports } from "react-icons/md";

export function Sidebar() {
  return null;
}

export function ResponsiveSidebar() {
  const [closed, setClosed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  function onClickSidebarEntree() {
    setClosed(true);
  }

  useEffect(() => {
    setClosed(window.innerWidth < 900);
    window.addEventListener("resize", () => {
      setClosed(window.innerWidth < 900);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setClosed(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {closed && <SidebarOpenButton onClick={() => setClosed(false)} />}
      <SidebarMain closed={closed} reference={sidebarRef}>
        <SidebarEntree
          link={"/"}
          className="w-10 h-10"
          onClick={onClickSidebarEntree}
        >
          <FaHome className="w-full h-full" />
        </SidebarEntree>
        <SidebarEntree
          link={"/game"}
          className="w-10 h-10"
          onClick={onClickSidebarEntree}
        >
          <MdSportsEsports className="w-full h-full" />
        </SidebarEntree>
        <SidebarEntree
          link={"/leaderboard"}
          className="w-10 h-10"
          onClick={onClickSidebarEntree}
        >
          <FaTrophy className="w-full h-full" color="gold" />
        </SidebarEntree>
        <SidebarEntree
          link={"/settings"}
          className="w-10 h-10"
          onClick={onClickSidebarEntree}
        >
          <IoSettingsOutline className="w-full h-full" />
        </SidebarEntree>
      </SidebarMain>
    </>
  );
}

export function SidebarMain(props: {
  children: React.ReactNode;
  closed: boolean;
  reference?: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      className={
        "w-20 h-full fixed bg-slate-800 p-2 flex flex-col items-center pt-10 gap-16 transition-all duration-300 z-30 " +
        (props.closed ? "-translate-x-full" : "")
      }
      ref={props.reference}
    >
      {props.children}
    </div>
  );
}

export function SidebarOpenButton(props: { onClick?: () => void }) {
  return (
    <div
      className="w-10 h-10 absolute top-2 left-2 z-20 cursor-pointer"
      onClick={props.onClick}
    >
      <FaBars className="w-full h-full" />
    </div>
  );
}

export function SidebarEntree(props: {
  children: React.ReactNode;
  link: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={props.link}
      className={
        "opacity-70 hover:opacity-100 transition-all duration-300 mx-auto " +
        props.className
      }
      onClick={props.onClick}
    >
      {props.children}
    </Link>
  );
}
