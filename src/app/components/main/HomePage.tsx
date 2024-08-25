import { HiOutlineArrowDown } from "react-icons/hi";
import css from "./HomePage.module.css";

export function HomePageMain(props: { children: React.ReactNode }) {
  return (
    <div className="pl-4 pr-4 w-full h-full sm:pl-20 sm:pr-20">
      {props.children}
    </div>
  );
}

export function HomePageHead(props: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 sm:gap-6">
      {props.children}
    </div>
  );
}

export function HomePageHeadList(props: { children: React.ReactNode }) {
  return (
    <div className="w-full h-fit flex flex-wrap items-center justify-center gap-2 sm:gap-4">
      {props.children}
    </div>
  );
}

export function HomePageBody(props: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col items-center gap-6 mt-20 sm:gap-8 sm:mt-36">
      {props.children}
    </div>
  );
}

export function HomePageHeaderMainText(props: { children: React.ReactNode }) {
  return (
    <div className="text-4xl font-bold text-white sm:text-7xl">
      {props.children}
    </div>
  );
}

export function HomePageHeaderBodyText(props: { children: React.ReactNode }) {
  return (
    <div className="text-2xl font-thin text-white opacity-70 sm:text-5xl">
      {props.children}
    </div>
  );
}

export function HomePageHeaderBodyArrow() {
  return (
    <div className="w-6 h-6 relative sm:w-8 sm:h-8">
      <HiOutlineArrowDown
        className={
          "w-full h-full font-thin absolute " + css["animate-floating"]
        }
      />
    </div>
  );
}

export function HomePageBox(props: { children: React.ReactNode }) {
  return (
    <div className="w-full h-40 py-3 px-3 bg-slate-800 rounded-lg flex items-center justify-between gap-3 sm:w-2/3 sm:h-56 sm:py-4 sm:px-4">
      {props.children}
    </div>
  );
}
