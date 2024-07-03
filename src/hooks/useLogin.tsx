"use client";

import { signIn } from "next-auth/react";
import { useAccount, useSignMessage, useChainId } from "wagmi";
import { SiweMessage } from "siwe";
import { useGetNounce } from "./useGetNounce";

export const useLogin = () => {
  const { signMessageAsync } = useSignMessage();
  const { address } = useAccount();
  const chainId = useChainId();
  const getNounce = useGetNounce();

  const handleLogin = async () => {
    const { nonce } = await getNounce.mutateAsync();
    try {
      const callbackUrl = "/dashboard";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chainId,
        nonce,
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      await signIn("credentials", {
        message: JSON.stringify(message),
        signature,
        callbackUrl,
      });
    } catch (error) {
      window.alert(error);
    }
  };
  return { handleLogin };
};
