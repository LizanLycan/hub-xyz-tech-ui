import { z } from "zod";

export const TokenTypes = ["token", "nft"] as const;
export const TokenType = z.enum(TokenTypes);
export type TokenType = z.infer<typeof TokenType>;

export const TokenSchema = z.object({
  id: z.string(),
  address: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  bookmarked: z.boolean(),
  userId: z.string(),
  tokenId: z.number(),
  type: TokenType,
});
export const UserToken = TokenSchema.extend({
  name: z.string(),
  symbol: z.string(),
  logo: z.string(),
  price: z.string(),
});
export const TokenFromExplorer = z.object({
  address: z.string(),
  name: z.string(),
  symbol: z.string(),
  logo: z.string().optional(),
  tokenId: z.number(),
  type: TokenType,
  bookmarked: z.boolean().optional(),
});
export const OptionsTokenFromExplorer = z.array(TokenFromExplorer);
export const AddTokenBodySchema = TokenSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export type TokenSchema = z.infer<typeof TokenSchema>;
export type UserToken = z.infer<typeof UserToken>;
export type TokenFromExplorer = z.infer<typeof TokenFromExplorer>;
export type OptionsTokenFromExplorer = z.infer<typeof OptionsTokenFromExplorer>;
export type AddTokenBody = z.infer<typeof AddTokenBodySchema>;
