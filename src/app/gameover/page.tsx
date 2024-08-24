"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getGameDat,
  getHighScore,
} from "../api/database/user/get_game_dat/action";
import {
  GameOverBodyText,
  GameOverMainText,
} from "../components/game-over/GameOver";

export default function GameOverPage() {
  const { data: session, status } = useSession();
  const [highScore, setHighScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status == "unauthenticated") {
      router.push("/leaderboard");
    } else if (session?.user) {
      getHighScore(session.user.id).then((data) => {
        setHighScore(data.best_score);
      });
    }
  }, [session, status]);

  return (
    <main className="pt-10 flex flex-col justify-center gap-2">
      <GameOverMainText>Game Over!</GameOverMainText>
      <GameOverBodyText>Your score: {highScore}</GameOverBodyText>
    </main>
  );
}
