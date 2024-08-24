"use client";

import { HiOutlineArrowDown } from "react-icons/hi";
import {
  HomePageBody,
  HomePageBox,
  HomePageHead,
  HomePageHeaderBodyArrow,
  HomePageHeaderBodyText,
  HomePageHeaderMainText,
  HomePageHeadList,
  HomePageMain,
} from "./components/main/HomePage";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <main>
      <HomePageMain>
        <HomePageHead>
          <HomePageHeaderMainText>Designer Challenge</HomePageHeaderMainText>
          <HomePageHeadList>
            <HomePageHeaderBodyArrow />
            <HomePageHeaderBodyText>
              Test Your Inner Designer
            </HomePageHeaderBodyText>
            <HomePageHeaderBodyArrow />
          </HomePageHeadList>
        </HomePageHead>
        <HomePageBody>
          <HomePageBox>Step 1: Create a new challenge</HomePageBox>
        </HomePageBody>
        <button
          className="text-5xl"
          onClick={() => signOut({ callbackUrl: "/leaderboard" })}
        >
          Sign Out
        </button>
      </HomePageMain>
    </main>
  );
}
