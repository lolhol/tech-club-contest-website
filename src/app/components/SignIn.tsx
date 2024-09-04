"use client";

import cx from "classnames";
import { SyntheticEvent } from "react";

interface SignInProps {
  children: React.ReactNode;
  className?: string;
}

export function SignIn(props: SignInProps) {
  return (
    <div
      className={cx(
        "w-[500px] rounded-2xl bg-white shadow-2xl",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

export function SignInMargin(props: SignInProps) {
  return (
    <div className={cx("p-10 h-full flex flex-col gap-5", props.className)}>
      {props.children}
    </div>
  );
}

export function SignInBody(props: SignInProps) {
  return (
    <div className={cx("w-full flex flex-col mt-5", props.className)}>
      {props.children}
    </div>
  );
}

export function SignInOption(props: SignInProps) {
  return (
    <div
      className={cx(
        "w-full flex items-center justify-between border-b-2 border-slate-200",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

export function SignInTypeGroup(props: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{props.children}</div>;
}

export function OptionGroup(props: SignInProps) {
  return <div className={cx(props.className)}>{props.children}</div>;
}

export function TextOption(props: SignInProps) {
  return (
    <label
      className={cx(
        "font-sans text-lg text-black font-medium",
        props.className
      )}
    >
      {props.children}
    </label>
  );
}

export function InputOption(props: {
  placeholder: string;
  children?: React.ReactNode;
  className?: string;
  onChange: (e: any) => void;
}) {
  return (
    <input
      className={cx(
        "border-2 border-gray-300 rounded-lg w-full h-10 p-2 text-lg font-sans shadow-sm leading-10",
        props.className
      )}
      placeholder={props.placeholder}
      onChange={(e) => {
        props.onChange(e);
      }}
      type="email"
    >
      {props.children}
    </input>
  );
}

export function InputOptionHiden(props: {
  placeholder: string;
  children?: React.ReactNode;
  className?: string;
  onChange: (e: any) => void;
}) {
  return (
    <input
      className={cx(
        "border-2 border-gray-300 rounded-lg w-full h-10 px-2 py-auto auto text-lg font-sans shadow-sm leading-10",
        props.className
      )}
      placeholder={props.placeholder}
      type="password"
      onChange={(e) => {
        props.onChange(e);
      }}
    >
      {props.children}
    </input>
  );
}

export function SignInFooter(props: SignInProps) {
  return <div className={cx(props.className)}>{props.children}</div>;
}

export function SignInButtonCard(props: {
  children: [React.ReactNode, React.ReactNode];
  className?: string;
}) {
  return (
    <div className="w-full h-full flex">
      <div className="w-1/6 absolute">{props.children[0]}</div>
      <div className="w-full flex justify-center items-center">
        {props.children[1]}
      </div>
    </div>
  );
}

export function SignInButton(props: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={cx(
        "w-full h-16 border-[3px] border-gray-300 hover:bg-slate-300 transition-all duration-300 bg-slate-200 rounded-xl font-sans text-2xl text-gray-700 cursor-pointer",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export function SignInButtonDiscord(props: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={cx(
        "w-full h-16 bg-[#5865F2] rounded-xl flex items-center justify-center gap-4 font-sans text-white text-xl cursor-pointer hover:bg-[#4752C4] active:bg-[#3642A7]",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export function SignInDivider(props: { className?: string }) {
  return (
    <div
      className={cx("w-full h-[2px] bg-gray-200 rounded-md", props.className)}
    />
  );
}

export function SignInDividerWithText(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex w-full items-center", props.className)}>
      <SignInDivider />
      <div className="mx-2">{props.children}</div>
      <SignInDivider />
    </div>
  );
}

export function SignInHead(props: SignInProps) {
  return (
    <div
      className={cx(
        "text-2xl w-full text-center font-semibold font-sans flex flex-col",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
