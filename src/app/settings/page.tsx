"use client";

import { signOut, useSession } from "next-auth/react";
import { queueUserForDeletion } from "../api/database/user/delete/action";
import {
  DeleteAccountBox,
  DeleteAccountButton,
} from "../components/DeleteAccount";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Settings() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session || !session?.user) {
      router.push("/signin");
    }

    console.log(session?.user);
  }, [session, status, router]);

  return (
    <main className="ml-20 p-10">
      <DeleteAccountBox>
        <a className="text-center">Delete Account</a>
        <DeleteAccountButton
          onClick={async () => {
            await queueUserForDeletion(session?.user.id ?? 0);
            signOut({ callbackUrl: "/" });
          }}
        >
          Delete
        </DeleteAccountButton>
      </DeleteAccountBox>
    </main>
  );
}
