"use client";

import { HiOutlineArrowDown } from "react-icons/hi";
import {
  HomePageBody,
  HomePageBox,
  HomePageBoxBody,
  HomePageBoxHeader,
  HomePageBoxImage,
  HomePageBoxTextGroup,
  HomePageHead,
  HomePageHeaderBodyArrow,
  HomePageHeaderBodyText,
  HomePageHeaderMainText,
  HomePageHeadList,
  HomePageMain,
  HomePagePlayButton,
} from "./components/main/HomePage";
import { signOut } from "next-auth/react";

/**
 * TODO: put the lives on the top right corner, and the ws in format: "streak: <ws>"
 * make the pictures bigger
 */
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
          <HomePagePlayButton href={"/game"}>Play!</HomePagePlayButton>
        </HomePageHead>
        <HomePageBody>
          <HomePageBox>
            <HomePageBoxTextGroup>
              <HomePageBoxHeader>
                A Pinewood Techclub™ Affiliated Challenge
              </HomePageBoxHeader>
              <HomePageBoxBody>
                The Pinewood TechClub is seeking new designers as it takes a
                modernizing turn this year, creating a dynamic environment for
                creative minds. Through this game, the club can easily connect
                with designers, fostering collaboration and innovation.
              </HomePageBoxBody>
            </HomePageBoxTextGroup>
            <HomePageBoxImage>
              <img
                src="/graphic_designer.png"
                alt="Designer Challenge"
                className="w-full h-full object-cover"
              />
            </HomePageBoxImage>
          </HomePageBox>
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
