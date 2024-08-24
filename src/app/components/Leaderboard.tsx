import { motion, AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";

interface LeaderboardProps {
  children?: React.ReactNode;
}

export interface Person {
  name: string;
  score: number;
}

/**
 * Leaderboard component to display rankings
 */
export function Leaderboard(props: {
  people: Person[];
  leaderboardTitle?: string;
  onRefresh?: () => void;
}) {
  return (
    <LeaderboardWithProps>
      <LeaderboardMain>
        <LeaderboardRefresh onRefresh={props.onRefresh} />
        <LeaderboardTitle>{props.leaderboardTitle}</LeaderboardTitle>
        <LeaderboardBody>
          <AnimatePresence>
            {props.people.map((person, key) =>
              key === 0 ? (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: -1 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <LeaderboardEntreeNumberCombo>
                    <LeaderboardFirstNumber>1</LeaderboardFirstNumber>
                    <LeaderboardFirstPlaceEntree>
                      <LeaderboardFirstPersonName>
                        {person.name}
                      </LeaderboardFirstPersonName>
                      <LeaderboardFirstPersonScore>
                        {person.score}
                      </LeaderboardFirstPersonScore>
                    </LeaderboardFirstPlaceEntree>
                  </LeaderboardEntreeNumberCombo>
                </motion.div>
              ) : (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: -20 - key * 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 + key }}
                  transition={{ duration: 0.3 + key * 0.1 }}
                >
                  <LeaderboardEntreeNumberCombo>
                    <LeaderboardDefaultNumber>
                      {key + 1}
                    </LeaderboardDefaultNumber>
                    <LeaderboardPlaceEntree>
                      <LeaderboardDefaultPersonName>
                        {person.name}
                      </LeaderboardDefaultPersonName>
                      <LeaderboardDefaultPersonScore>
                        {person.score}
                      </LeaderboardDefaultPersonScore>
                    </LeaderboardPlaceEntree>
                  </LeaderboardEntreeNumberCombo>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </LeaderboardBody>
      </LeaderboardMain>
    </LeaderboardWithProps>
  );
}

export function LeaderboardRefresh(props: { onRefresh?: () => void }) {
  const [rotation, setRotation] = React.useState(0);
  const [rotating, setRotating] = React.useState(false);

  useEffect(() => {
    if (rotating) return;
    setRotating(true);
    setTimeout(() => {
      setRotating(false);
    }, 500);
  }, [rotation]);

  return (
    <button
      className={
        "w-8 h-8 absolute right-2 top-2 transition-transform duration-500 ease-in-out hover:opacity-100" +
        (rotating ? " opacity-100" : " opacity-20")
      }
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      onClick={() => {
        if (props.onRefresh) props.onRefresh();
        setRotation(rotation + 360);
      }}
    >
      <RefreshIcon className="w-full h-full" />
    </button>
  );
}

export function LeaderboardTitle(props: LeaderboardProps) {
  return (
    <div className="w-full h-fit text-center text-5xl font-semibold">
      {props.children}
    </div>
  );
}

export function LeaderboardWithProps(props: LeaderboardProps) {
  return (
    <div className="w-full h-full flex items-center">{props.children}</div>
  );
}

export function LeaderboardMain(props: LeaderboardProps) {
  const [shake, setShake] = useState(false);
  const leaderboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500); // Stop shaking after 500ms
      return () => clearTimeout(timer);
    }
  }, [shake]);

  const handleScroll = () => {
    if (leaderboardRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = leaderboardRef.current;
      if (scrollTop === 0 || scrollTop + clientHeight >= scrollHeight) {
        // User is trying to scroll past the limits
        setShake(true);
      }
    }
  };

  return (
    <motion.div
      ref={leaderboardRef}
      onScroll={handleScroll}
      className="w-full h-full mx-96 bg-slate-800 flex flex-col p-4 px-12 rounded-md gap-10 relative overflow-y-auto"
      animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {props.children}
    </motion.div>
  );
}

export function LeaderboardBody(props: LeaderboardProps) {
  return (
    <div className="w-full h-full flex flex-col gap-4">{props.children}</div>
  );
}

export function LeaderboardDefaultNumber(props: LeaderboardProps) {
  return <div className="w-7 h-fit text-2xl text-center">{props.children}</div>;
}

export function LeaderboardFirstNumber(props: LeaderboardProps) {
  return (
    <div className="w-7 h-fit text-5xl font-bold text-cyan-500 text-center">
      {props.children}
    </div>
  );
}

export function LeaderboardEntreeNumberCombo(props: LeaderboardProps) {
  return (
    <div className="w-full h-fit flex justify-center gap-5">
      {props.children}
    </div>
  );
}

export function LeaderboardFirstPlaceEntree(props: LeaderboardProps) {
  return (
    <div className="relative w-full h-12 pr-4 justify-between bg-slate-700 flex items-center px-2 rounded-md border-[1px] border-slate-500 text-xl mb-3 overflow-hidden">
      {props.children}
    </div>
  );
}

export function LeaderboardPlaceEntree(props: LeaderboardProps) {
  return (
    <div className="w-full h-9 bg-slate-700 flex items-center justify-between pr-4 px-2 rounded-md border-[1px] border-slate-500 text-md opacity-55">
      {props.children}
    </div>
  );
}

export function LeaderboardFirstPersonName(props: LeaderboardProps) {
  return <div className="h-fit text-2xl">{props.children}</div>;
}

export function LeaderboardFirstPersonScore(props: LeaderboardProps) {
  return (
    <div className="h-fit text-2xl text-amber-500">{props.children} pts</div>
  );
}

export function LeaderboardDefaultPersonName(props: LeaderboardProps) {
  return <div className="h-fit text-xl">{props.children}</div>;
}

export function LeaderboardDefaultPersonScore(props: LeaderboardProps) {
  return (
    <div className="h-fit text-xl text-amber-600">{props.children} pts</div>
  );
}
