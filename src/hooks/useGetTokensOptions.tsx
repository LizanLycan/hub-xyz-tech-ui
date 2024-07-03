import { useQuery } from "@tanstack/react-query";
import { useChainId } from "wagmi";
import { type OptionsTokenFromExplorer } from "../schemas/tokens.schema";
import { useSession } from "next-auth/react";
import { API_URL } from "../utils/constants";

export const useGetTokenOptions = (term?: string) => {
  const chainId = useChainId();
  const { data } = useSession();

  return useQuery({
    queryKey: ["tokenOptions", chainId, term],
    enabled: !!chainId && !!term,
    queryFn: async () => {
      const response = await fetch(`${API_URL}/token/findTokens?term=${term}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data?.user.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = (await response.json()) as OptionsTokenFromExplorer;

      return res;
    },
  });
};
