import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";

export function GameLayout(props: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full pt-6 flex flex-col items-center gap-16">
      {props.children}
    </div>
  );
}

export function GameHead(props: { children: React.ReactNode }) {
  return (
    <div className="w-full h-fit flex flex-col items-center">
      {props.children}
    </div>
  );
}

export function GameHeader(props: { children: React.ReactNode }) {
  return <div className="text-4xl font-bold">{props.children}</div>;
}

export function Gamebody(props: { children: React.ReactNode }) {
  return <div className="w-full h-full">{props.children}</div>;
}

export function GameImageList(props: { children: React.ReactNode }) {
  return (
    <div className="w-[600px] h-[200px] transition-all duration-300 relative">
      <div className="absolute w-fit h-fit flex left-1/2 -translate-x-1/2">
        {props.children}
      </div>
    </div>
  );
}

export function GameImageAbsoluteList(props: {
  children: React.ReactNode;
  single: boolean;
}) {
  return (
    <div className={"w-full h-full flex " + (props.single ? "gap-10" : "")}>
      {props.children}
    </div>
  );
}

export function GameImage(props: {
  children: React.ReactNode;
  single?: boolean;
  right?: boolean;
  zIndex?: number;
}) {
  return (
    <div
      className={
        "w-[300px] h-[200px] transition-all duration-300 " +
        (props.single
          ? props.right
            ? "-translate-x-1/2"
            : "translate-x-1/2"
          : "")
      }
      style={{ zIndex: props.zIndex ?? 0 }}
    >
      {props.children}
    </div>
  );
}

export function BluredImage(props: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full absolute bg-gray-800 blur-sm rounded-lg" />
      <div className="absolute w-fit h-fit top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
        {props.children}
      </div>
    </div>
  );
}

export function GameButtonList(props: { children: React.ReactNode }) {
  return <div className="w-fit h-fit flex gap-10">{props.children}</div>;
}

export function GameButton(props: {
  children: React.ReactNode;
  onClick: () => void;
  locked?: boolean;
}) {
  return (
    <button
      className={
        "w-60 h-fit p-4 text-2xl font-semibold bg-slate-800 rounded-md hover:bg-slate-700 transition-all duration-300 " +
        (props.locked ? "opacity-60" : "")
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export function GameGreenCheckmark() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <div
      className={`w-16 h-16 absolute bottom-0 right-0 transition-all duration-500 delay-300 ease-out z-30 ${
        isAnimating ? "scale-125 opacity-100" : "scale-50 opacity-0"
      }`}
      onAnimationEnd={() => setIsAnimating(false)}
    >
      <MdCheckCircle className="w-full h-full text-green-500" />
    </div>
  );
}

export function GameRedCross() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <div
      className={`w-16 h-16 absolute bottom-0 right-0 transition-all duration-500 delay-300 ease-out z-30 ${
        isAnimating ? "scale-125 opacity-100" : "scale-50 opacity-0"
      }`}
      onAnimationEnd={() => setIsAnimating(false)}
    >
      <FaTimesCircle className="w-full h-full text-red-500" />
    </div>
  );
}

export function StatsHeaderText(props: { children: React.ReactNode }) {
  return <div className="text-4xl font-bold text-white">{props.children}</div>;
}
