export function DeleteAccountBox(props: { children: React.ReactNode }) {
  return (
    <div className="w-fit h-fit py-4 px-4 bg-slate-800 rounded-md flex items-center gap-5">
      {props.children}
    </div>
  );
}

export function DeleteAccountButton(props: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="w-24 h-10 bg-red-500 text-slate-800 rounded-md transition-all duration-300 hover:bg-red-600"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
