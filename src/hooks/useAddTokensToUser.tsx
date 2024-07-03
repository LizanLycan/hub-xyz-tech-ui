"use client";

import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { type TokenSchema, type AddTokenBody } from "../schemas/tokens.schema";
import { API_URL } from "../utils/constants";

export const useAddTokensToUser = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const { data } = useSession();

  return useMutation({
    onSuccess: () => {
      onSuccess();
    },
    onError: () => {
      onError();
    },
    mutationFn: async (tokens: AddTokenBody[]) => {
      console.log(tokens);
      const response = await fetch(
        `${API_URL}/token/addTokensToUser?user=${data?.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data?.user.access_token}`,
          },
          body: JSON.stringify(tokens),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = (await response.json()) as Promise<TokenSchema[]>;

      return res;
    },
  });
};
