import Link from "next/link";
import { ReactNode } from "react";

export function GameOverMainText(props: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col text-4xl items-center justify-center">
      {props.children}
    </div>
  );
}

export function GameOverBodyText(props: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col text-xl opacity-75 items-center justify-center">
      {props.children}
    </div>
  );
}

export function SignOutButton(props: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      className="w-fit h-fit px-10 py-2 bg-slate-400 mt-5 rounded-sm cursor-pointer"
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
