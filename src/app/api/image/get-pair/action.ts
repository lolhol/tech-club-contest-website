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

export async function getPair(
  userId: number | undefined
): Promise<Pair | null> {
  const folderName = possible[randomInt(possible.length)];

  const imageOneNumber = 0;
  let randomImgTwoNumber = randomInt(1, 10);

  const correctIndex = randomInt(0, 2);

  if (correctIndex == 1) {
    return {
      image1: `/media/${folderName}/${imageOneNumber}.png`,
      image2: `/media/${folderName}/${randomImgTwoNumber}.png`,
      hardness: 1,
      correct: 1,
    };
  }

  return {
    image1: `/media/${folderName}/${randomImgTwoNumber}.png`,
    image2: `/media/${folderName}/${imageOneNumber}.png`,
    hardness: 1,
    correct: 2,
  };
}
