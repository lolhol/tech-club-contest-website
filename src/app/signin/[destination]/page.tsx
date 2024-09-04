"use client";

import { signIn } from "next-auth/react";
import {
  InputOption,
  InputOptionHiden,
  OptionGroup,
  SignIn,
  SignInBody,
  SignInButton,
  SignInButtonCard,
  SignInButtonDiscord,
  SignInHead,
  SignInMargin,
  SignInTypeGroup,
  TextOption,
} from "../../components/SignIn";
import Image from "next/image";

export default function SignInPage({
  params,
}: {
  params: { destination: string };
}) {
  async function handleGoogleSignIn() {
    await signIn("google", {
      callbackUrl: "/" + params.destination,
    });
  }

  async function handleDiscordSignIn() {
    await signIn("discord", {
      callbackUrl: "/" + params.destination,
    });
  }

  return (
    <main className="pt-10 flex justify-center">
      <SignIn>
        <SignInMargin>
          <SignInHead>
            <a className="text-black">Sign In</a>
            <a className="text-black text-sm opacity-80 font-light">
              Please Sign in to continue
            </a>
          </SignInHead>
          <SignInTypeGroup>
            <OptionGroup className="flex flex-col h-max">
              <SignInButton
                className=""
                onClick={async () => {
                  await handleGoogleSignIn();
                }}
              >
                <SignInButtonCard>
                  <Image
                    src={"/google_logo.png"}
                    alt={"google"}
                    width={60}
                    height={60}
                    className="w-[56px] h-[56px] mt-[2px]"
                  />
                  <a>Sign in with Google</a>
                </SignInButtonCard>
              </SignInButton>
            </OptionGroup>
          </SignInTypeGroup>
        </SignInMargin>
      </SignIn>
    </main>
  );
}

/*
<OptionGroup className="flex flex-col h-max">
              <SignInButtonDiscord
                className=""
                onClick={() => handleDiscordSignIn}
              >
                <SignInButtonCard>
                  <Image
                    src={"/discord_logo_1.png"}
                    alt={"google"}
                    width={60}
                    height={60}
                    className="w-[56px] h-[56px] mt-[4px] ml-[4px]"
                  />
                  <a>Sign in with Discord</a>
                </SignInButtonCard>
              </SignInButtonDiscord>
            </OptionGroup>*/
