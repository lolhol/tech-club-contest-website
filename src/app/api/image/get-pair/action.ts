"use server";

import { getDatabase } from "@/internal/core";
import { randomInt } from "crypto";

export interface Pair {
  image1: string;
  image2: string;
  hardness: number;
  correct: number;
}

//name, email, lives_left, difficulty
interface User {
  id: number;
  name: string;
  email: string | null;
  lives_left: number;
  difficulty: number;
}

const possible = ["call", "chatting", "guitar", "invite", "msg"];
const possibleDifficulty: Record<number, number[]> = {
  0: [0, 1, 2, 3],
  1: [4, 5, 6],
  2: [7, 8, 9],
};

export async function getPair(userId: number): Promise<Pair | null> {
  const db = getDatabase();
  const user_data: User = db
    .prepare("SELECT * FROM account WHERE id = ?;")
    .get(userId) as unknown as User;

  if (!user_data) return null;

  console.log(user_data);

  const folderName = possible[randomInt(possible.length)];
  const difficulty = possibleDifficulty[user_data.difficulty];

  const randomImgOneNumber = randomInt(difficulty.length);
  let randomImgTwoNumber = randomInt(difficulty.length);
  while (randomImgOneNumber === randomImgTwoNumber) {
    randomImgTwoNumber = randomInt(difficulty.length);
  }

  // Randomly decide whether the correct image will be image1 or image2
  const correctIndex = randomInt(2) + 1; // Generates 1 or 2

  return {
    image1: `/media/${folderName}/${
      difficulty[correctIndex === 1 ? randomImgOneNumber : randomImgTwoNumber]
    }.png`,
    image2: `/media/${folderName}/${
      difficulty[correctIndex === 2 ? randomImgOneNumber : randomImgTwoNumber]
    }.png`,
    hardness: user_data.difficulty,
    correct: correctIndex, // 1 if image1 is correct, 2 if image2 is correct
  };
}
