"use client";

import Image from "next/image";
import { getPair } from "../api/image/get-pair/action";
import { useSession } from "next-auth/react";
import { Leaderboard, Person } from "../components/Leaderboard";
import React, { useEffect } from "react";
import { getLeaderboard } from "../api/database/user/leaderboard/action";

export default function Home() {
  const [leaderboardData, setLeaderboardData] = React.useState<Person[]>([
    { name: "Loading...", score: 0 },
    { name: "Loading...", score: 0 },
  ]);

  function handleRefresh() {
    getLeaderboard().then((data) => {
      let tmp = [];
      for (let i = 0; i < data.length; i++) {
        tmp.push({ name: data[i].name, score: data[i].best_score });
      }

      setLeaderboardData(tmp);
    });
  }

  /*useEffect(() => {
    handleRefresh();
  }, []);*/

  return (
    <main className="h-screen w-screen">
      <div className="p-4 w-full h-full">
        <Leaderboard
          people={leaderboardData}
          onRefresh={() => {
            handleRefresh();
          }}
          leaderboardTitle="Leaderboard"
        />
      </div>
    </main>
  );
}
