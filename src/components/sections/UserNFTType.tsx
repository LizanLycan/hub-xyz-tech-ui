import { Container, Typography } from "@mui/material";
import { useGetUserTokens } from "../../hooks/useGetUserTokens";

export const UserNFTType = () => {
  const tokens = useGetUserTokens("nft");

  console.log("TOKENS: ", tokens);

  return (
    <Container>
      <Typography variant="h1">User NFT Type</Typography>
    </Container>
  );
};
