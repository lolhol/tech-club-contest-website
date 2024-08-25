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

export async function getPair(
  userId: number | undefined
): Promise<Pair | null> {
  console.log("GET PAIR: " + userId);
  if (userId) {
    const db = getDatabase();
    const user_data: User = db
      .prepare("SELECT * FROM account WHERE id = ?;")
      .get(userId) as unknown as User;

    if (!user_data) return null;

    console.log(user_data + "!!!!");
  }

  const folderName = possible[randomInt(possible.length)];
  const difficulty = possibleDifficulty["0"]; //user_data.difficulty];

  const randomImgOneNumber = 0;
  let randomImgTwoNumber = randomInt(difficulty.length);
  while (randomImgOneNumber === randomImgTwoNumber) {
    randomImgTwoNumber = randomInt(difficulty.length);
  }

  // Randomly decide whether the correct image will be image1 or image2
  const correctIndex = randomInt(0, 2); // Generates 1 or 2

  console.log(
    difficulty[randomImgOneNumber] +
      " " +
      difficulty[randomImgTwoNumber] +
      " " +
      correctIndex
  );

  return {
    image1:
      correctIndex == 1
        ? `/media/${folderName}/${difficulty[0]}.png`
        : `/media/${folderName}/${difficulty[randomImgTwoNumber]}.png`,
    image2:
      correctIndex == 0
        ? `/media/${folderName}/${difficulty[0]}.png`
        : `/media/${folderName}/${difficulty[randomImgTwoNumber]}.png`,
    hardness: 1,
    correct: correctIndex == 1 ? 1 : 2, // 1 if image1 is correct, 2 if image2 is correct
  };
}
