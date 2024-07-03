import { Container, Typography } from "@mui/material";
import { useGetUserTokens } from "../../hooks/useGetUserTokens";

export const UserTokenType = () => {
  const tokens = useGetUserTokens("token");

  console.log("TOKENS: ", tokens);
  return (
    <Container>
      <Typography variant="h1">User Token Type</Typography>
    </Container>
  );
};
