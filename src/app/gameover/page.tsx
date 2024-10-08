"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getGameDat,
  getHighScore,
} from "../api/database/user/get_game_dat/action";
import {
  GameOverBodyText,
  GameOverMainText,
  SignOutButton,
} from "../components/game-over/GameOver";

export default function GameOverPage() {
  const { data: session = undefined, status } = useSession();
  const [highScore, setHighScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status == "unauthenticated") {
      router.push("/leaderboard");
      return;
    } else if (session && session?.user) {
      getHighScore(session.user.id).then((data) => {
        setHighScore(data.best_score);
      });
    }
  }, [session, status]);

  return (
    <main className="pt-10 flex flex-col justify-center gap-2">
      <GameOverMainText>Game Over!</GameOverMainText>
      <GameOverBodyText>Your score: {highScore}</GameOverBodyText>
      <div className="w-full h-full flex items-center justify-center">
        <SignOutButton
          onClick={function (): void {
            signOut({ callbackUrl: "/" });
          }}
        >
          Sign Out
        </SignOutButton>
      </div>
    </main>
  );
}
