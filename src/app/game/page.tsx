"use client";

import Image from "next/image";
import {
  BluredImage,
  GameButton,
  GameButtonList,
  GameGreenCheckmark,
  GameHead,
  GameHeader,
  GameImage,
  GameImageAbsoluteList,
  GameImageList,
  GameLayout,
  GameRedCross,
  StatsHeaderText,
} from "../components/game/Game";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getPair, Pair } from "../api/image/get-pair/action";
import { MdCheckCircle } from "react-icons/md";
import { WinstreakAnimation } from "../components/winstreak/WinstreakAnimation";
import { HeartAnimation } from "../components/hearts/HeartAnimation";
import { updateServerWithClientData } from "../api/database/user/update-server/action";
import { getGameDat } from "../api/database/user/get_game_dat/action";
import introJs from "intro.js";
import { activateUser } from "../api/database/user/activate/action";

export default function Game() {
  const { data: session = undefined, status } = useSession();
  const [imageData, setImageData] = useState<Pair | undefined>(undefined);
  const [scored, setScored] = useState(false);
  const [zIndexImageNum, setZIndexImageNum] = useState(0);
  const [scoredImageNumber, setScoredImageNumber] = useState(0);
  const [currentWS, setCurrentWS] = useState(0);
  const router = useRouter();
  const [currentHearts, setCurrentHearts] = useState(3);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session || !session?.user) {
      router.push("/signin/game");
      return;
    }

    getGameDat(session?.user.id ?? -1).then((data) => {
      if (data.lives_left <= 0) {
        router.push("/gameover");
      }

      console.log(JSON.stringify(data) + "??????");

      setCurrentWS(data.score);
      setCurrentHearts(data.lives_left);
      setUserDataLoaded(true);
    });
  }, [session, status, router]);

  useEffect(() => {
    if (userDataLoaded && session?.user.first) {
      const intro = introJs();
      intro.setOptions({
        steps: [
          {
            element: '[data-intro="TopText"]',
            intro:
              "Hello and welcome to the Tech Club contest game! (Created by the Tech Club team)",
          },
          {
            element: '[data-intro="Images"]',
            intro:
              "To score a point you need to click on the image that you think looks better. THE IMAGES ARE NEVER THE SAME!",
          },
          {
            element: '[data-intro="Winstreak"]',
            intro:
              "In order to get the top position on the leaderboard you need to score the most points in a row (get _ images correctly in a row). The score resets once you fail once.",
          },
          {
            element: '[data-intro="Hearts"]',
            intro:
              "These are your hearts! Every time the winstreak resets (when you miss a point) you lose a heart. When you loose all three, YOUR OUT!",
          },
          {
            element: '[data-intro="Main"]',
            intro:
              "To check out the leaderboard, click on the sidebar and select the trophy. The top prize is a 20$ Steam Gift Card!",
          },
        ],
        showStepNumbers: true,
        exitOnOverlayClick: false,
        showBullets: false,
        showButtons: true,
      });
      activateUser(session?.user.id ?? -1).then(() => {});
      intro.start();
    }
  }, [userDataLoaded]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [userDataLoaded]);

  useEffect(() => {
    console.log(JSON.stringify(imageData) + " <- imageData");
    if (session?.user && imageData === undefined) {
      getPair(undefined).then((data) => {
        console.log(JSON.stringify(data) + " <- getPair");
        setImageData(data ?? undefined);
      });
    }
  }, [session, imageData]);

  useEffect(() => {
    if (scored && session?.user) {
      if (imageData?.correct == scoredImageNumber) {
        updateServerWithClientData(
          session.user.id,
          currentWS + 1,
          currentHearts
        );
        updateServerWithClientData(
          session.user.id,
          currentWS + 1,
          currentHearts
        );
        setCurrentWS(currentWS + 1);
      } else {
        setCurrentWS(0);
        updateServerWithClientData(session.user.id, 0, currentHearts - 1);
        if (currentHearts - 1 <= 0) {
          router.push("/gameover");
          return;
        }
        setCurrentHearts(currentHearts - 1);
      }
    }
  }, [scored]);

  return (
    <main data-intro="Main">
      <GameLayout>
        <GameHead>
          <GameHeader data="TopText">
            Select The Better Looking Image
          </GameHeader>
        </GameHead>
        <GameImageList>
          <GameImageAbsoluteList single={scored} data="Images">
            <GameImage
              single={scored}
              right={false}
              zIndex={zIndexImageNum == 1 ? 10 : 0}
              vertical={isSmallScreen}
              up={false}
            >
              {(imageData != undefined && (
                <>
                  <img
                    src={imageData.image1}
                    alt={"1"}
                    width={300}
                    height={300}
                    className={"rounded-lg cursor-pointer"}
                    onClick={() => {
                      if (scored) return;
                      setScored(true);
                      setScoredImageNumber(1);
                      setZIndexImageNum(1);
                    }}
                  />
                  {scored && scoredImageNumber == 1 && (
                    <>
                      {(imageData.correct == scoredImageNumber && (
                        <GameGreenCheckmark />
                      )) || <GameRedCross />}
                    </>
                  )}
                </>
              )) || <BluredImage>Loading...</BluredImage>}
            </GameImage>
            <GameImage
              single={scored}
              right={true}
              zIndex={zIndexImageNum == 2 ? 10 : 0}
              vertical={isSmallScreen}
              up={true}
            >
              {(imageData != undefined && (
                <>
                  <img
                    src={imageData.image2}
                    alt={"1"}
                    width={300}
                    height={300}
                    className={"rounded-lg cursor-pointer"}
                    onClick={() => {
                      if (scored) return;
                      setScored(true);
                      setScoredImageNumber(2);
                      setZIndexImageNum(2);
                    }}
                  />
                  {scored && scoredImageNumber == 2 && (
                    <>
                      {(imageData.correct == scoredImageNumber && (
                        <GameGreenCheckmark />
                      )) || <GameRedCross />}
                    </>
                  )}
                </>
              )) || <BluredImage>Loading...</BluredImage>}
            </GameImage>
          </GameImageAbsoluteList>
        </GameImageList>
        <GameButtonList>
          <GameButton
            locked={false}
            hidden={!scored}
            onClick={function (): void {
              setImageData(undefined);
              setScored(false);
              setScoredImageNumber(0);
            }}
          >
            Next Image
          </GameButton>
        </GameButtonList>

        <div className="bottom-2 flex items-center h-fit w-full justify-center">
          <WinstreakAnimation winstreak={currentWS} data="Winstreak" />
          <HeartAnimation score={currentHearts} data="Hearts"></HeartAnimation>
        </div>
      </GameLayout>
    </main>
  );
}
