import { useQuery } from "@tanstack/react-query";
import { useChainId } from "wagmi";
import { type TokenType, type UserToken } from "../schemas/tokens.schema";
import { useSession } from "next-auth/react";
import { API_URL } from "../utils/constants";

export const useGetUserTokens = (type: TokenType) => {
  const chainId = useChainId();
  const { data } = useSession();

  return useQuery({
    queryKey: ["getUserNFTType", data?.user.id],
    enabled: !!chainId && !!data?.user.id,
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/token/getUserTokens?${new URLSearchParams({
          user: data?.user.id ?? "",
          type: type,
        }).toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data?.user.access_token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = (await response.json()) as UserToken[];

      return res;
    },
  });
};
