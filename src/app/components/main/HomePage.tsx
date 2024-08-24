import { HiOutlineArrowDown } from "react-icons/hi";
import css from "./HomePage.module.css";

export function HomePageMain(props: { children: React.ReactNode }) {
  return <div className="pl-20 pr-20 w-full h-full">{props.children}</div>;
}

export function HomePageHead(props: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      {props.children}
    </div>
  );
}

export function HomePageHeadList(props: { children: React.ReactNode }) {
  return (
    <div className="w-full h-fit flex items-center justify-center gap-4">
      {props.children}
    </div>
  );
}

export function HomePageBody(props: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col items-center gap-8 mt-36">
      {props.children}
    </div>
  );
}

export function HomePageHeaderMainText(props: { children: React.ReactNode }) {
  return <div className="text-7xl font-bold text-white">{props.children}</div>;
}

export function HomePageHeaderBodyText(props: { children: React.ReactNode }) {
  return (
    <div className="text-5xl font-thin text-white opacity-70">
      {props.children}
    </div>
  );
}

export function HomePageHeaderBodyArrow() {
  return (
    <div className="w-8 h-8 relative">
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
    <div className="w-2/3 h-56 py-4 px-4 bg-slate-800 rounded-lg flex items-center justify-between gap-5">
      {props.children}
    </div>
  );
}
