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
