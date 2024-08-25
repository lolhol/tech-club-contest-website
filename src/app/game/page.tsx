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

export default function Game() {
  const { data: session, status } = useSession(undefined);
  const [imageData, setImageData] = useState<Pair>();
  const [scored, setScored] = useState(false);
  const [zIndexImageNum, setZIndexImageNum] = useState(0);
  const [scoredImageNumber, setScoredImageNumber] = useState(0);
  const [currentWS, setCurrentWS] = useState(0);
  const router = useRouter();
  const [currentHearts, setCurrentHearts] = useState(3);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session?.user) {
      router.push("/signin");
    }

    if (session?.user) {
      getGameDat(session.user.id).then((data) => {
        if (data.lives_left <= 0) {
          router.push("/gameover");
        }

        setCurrentWS(data.score);
        setCurrentHearts(data.lives_left);
      });
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session?.user && imageData == undefined) {
      getPair(session.user.id).then((data) => {
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
        updateServerWithClientData(session.user.id, 0, 3);
        setCurrentWS(currentWS + 1);
      } else {
        setCurrentWS(0);
        updateServerWithClientData(session.user.id, 0, 3);
        if (currentHearts - 1 <= 0) {
          router.push("/gameover");
          return;
        }
        setCurrentHearts(currentHearts - 1);
      }
    }
  }, [scored]);

  return (
    <main>
      <GameLayout>
        <GameHead>
          <GameHeader>Select The Better Looking Image</GameHeader>
        </GameHead>
        <GameImageList>
          <GameImageAbsoluteList single={scored}>
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
        {scored && (
          <GameButtonList>
            <GameButton
              locked={false}
              onClick={function (): void {
                setImageData(undefined);
                setScored(false);
                setScoredImageNumber(0);
              }}
            >
              Next Image
            </GameButton>
          </GameButtonList>
        )}

        <div className="absolute bottom-2 flex items-center h-fit">
          <WinstreakAnimation winstreak={currentWS}></WinstreakAnimation>
          <HeartAnimation score={currentHearts}></HeartAnimation>
        </div>
      </GameLayout>
    </main>
  );
}
