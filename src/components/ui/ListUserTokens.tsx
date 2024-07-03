import { Grid } from "@mui/material";
import { type UserToken } from "../../schemas/tokens.schema";
import { UserTokenCard } from "./UserTokenCard";

export const ListUserTokens = ({ tokens }: { tokens: UserToken[] }) => {
  return (
    <Grid container spacing={2} sx={{ py: 8 }}>
      {tokens?.map((token, index) => (
        <Grid key={`${token.name}.${index}`} item xs={12}>
          <UserTokenCard token={token} />
        </Grid>
      ))}
    </Grid>
  );
};
