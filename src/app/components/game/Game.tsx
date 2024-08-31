import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";

export function GameLayout(props: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full lg:pt-16 pt-16 flex flex-col items-center gap-10 sm:gap-8">
      {props.children}
    </div>
  );
}

export function GameHead(props: { children: React.ReactNode }) {
  return (
    <div className="lg:w-full w-3/4 h-fit flex flex-col items-center text-center">
      {props.children}
    </div>
  );
}

export function GameHeader(props: {
  children: React.ReactNode;
  data?: string;
}) {
  return (
    <div className="text-3xl font-bold sm:text-5xl" data-intro={props.data}>
      {props.children}
    </div>
  );
}

export function Gamebody(props: { children: React.ReactNode }) {
  return <div className="w-full h-full">{props.children}</div>;
}

export function GameImageList(props: { children: React.ReactNode }) {
  return (
    <div className="w-[300px] h-fit sm:w-[300px] sm:h-[200px] transition-all duration-300 relative flex flex-col items-center">
      <div className="w-fit h-fit flex left-1/2 sm:static sm:translate-x-0">
        {props.children}
      </div>
    </div>
  );
}

export function GameImageAbsoluteList(props: {
  children: React.ReactNode;
  single: boolean;
  data?: string;
}) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`transition-all duration-500 w-full h-full flex${
        !props.single ? " gap-4 sm:gap-6" : ""
      } ${isSmallScreen ? "flex-col" : ""}`}
      data-intro={props.data}
    >
      {props.children}
    </div>
  );
}

export function GameImage(props: {
  children: React.ReactNode;
  single?: boolean;
  right?: boolean;
  zIndex?: number;
  vertical?: boolean;
  up?: boolean;
  stay?: boolean;
}) {
  return (
    <div
      className={`w-[300px] h-fit lg:w-[300px] lg:h-[200px] transition-transform duration-300 ${
        props.single
          ? props.vertical
            ? props.up
              ? "translate-y-[-50%]"
              : "translate-y-[50%]"
            : props.right
            ? "-translate-x-[50%]"
            : "translate-x-[50%]"
          : ""
      }`}
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
  return (
    <div className="w-fit h-fit flex gap-2 sm:gap-4">{props.children}</div>
  );
}

export function GameButton(props: {
  children: React.ReactNode;
  onClick: () => void;
  locked?: boolean;
  hidden?: boolean;
}) {
  return (
    <button
      className={
        "w-36 h-fit p-2 text-lg font-semibold bg-slate-800 rounded-md hover:bg-slate-700 transition-all duration-300 " +
        (props.locked ? "opacity-60" : "") +
        (props.hidden ? " opacity-0 cursor-default" : "")
      }
      onClick={() => {
        if (!props.hidden) {
          props.onClick();
        }
      }}
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
      className={`w-10 h-10 absolute bottom-0 right-0 sm:bottom-0 sm:right-0 transition-all duration-500 delay-300 ease-out z-30 ${
        isAnimating ? "scale-150 opacity-100" : "scale-50 opacity-0"
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
      className={`w-10 h-10 absolute bottom-0 right-0 transition-all duration-500 delay-300 ease-out z-30 ${
        isAnimating ? "scale-150 opacity-100" : "scale-50 opacity-0"
      }`}
      onAnimationEnd={() => setIsAnimating(false)}
    >
      <FaTimesCircle className="w-full h-full text-red-500" />
    </div>
  );
}

export function StatsHeaderText(props: { children: React.ReactNode }) {
  return (
    <div className="text-2xl font-bold text-white sm:text-3xl">
      {props.children}
    </div>
  );
}
