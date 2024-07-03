import { useEffect, type PropsWithChildren } from "react";
import Head from "next/head";
import { useAccount } from "wagmi";
import { signOut, useSession } from "next-auth/react";
import Alerts from "../ui/Alerts";

export default function RootLayout({ children }: PropsWithChildren) {
  const { isConnected } = useAccount();
  const { status } = useSession();

  useEffect(() => {
    if (!isConnected && status === "authenticated") {
      void signOut({
        callbackUrl: "/",
        redirect: true,
      });
    }
  }, [isConnected, status]);

  return (
    <>
      <Head>
        <title>HUB XYZ</title>
      </Head>
      <main style={{ paddingBottom: "38px" }}>{children}</main>
      <Alerts />
    </>
  );
}
