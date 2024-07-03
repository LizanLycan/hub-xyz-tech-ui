"use client";

import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../utils/constants";

interface NonceResponse {
  nonce: string;
}

export const useGetNounce = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/auth/nonce`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = (await response.json()) as Promise<NonceResponse>;

      return res;
    },
  });
};
