import Link from "next/link";

export function Sidebar() {
  return null;
}

export function SidebarMain(props: { children: React.ReactNode }) {
  return (
    <div className="w-20 h-full fixed bg-slate-800 p-2 flex flex-col items-center pt-10 gap-16">
      {props.children}
    </div>
  );
}

export function SidebarEntree(props: {
  children: React.ReactNode;
  link: string;
  className?: string;
}) {
  return (
    <Link
      href={props.link}
      className={
        "opacity-70 hover:opacity-100 transition-all duration-300 mx-auto " +
        props.className
      }
    >
      {props.children}
    </Link>
  );
}
