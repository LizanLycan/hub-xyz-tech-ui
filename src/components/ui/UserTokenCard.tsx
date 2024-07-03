import { Avatar, Box, Card, Typography } from "@mui/material";
import { type UserToken } from "../../schemas/tokens.schema";
import { blue } from "@mui/material/colors";
import TollIcon from "@mui/icons-material/Toll";
import TokenIcon from "@mui/icons-material/Token";

export const UserTokenCard = ({ token }: { token: UserToken }) => {
  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 2, gap: 2 }}>
      {token.logo ? (
        <Avatar src={token.logo} alt={token.symbol} />
      ) : (
        <Avatar sx={{ bgcolor: blue.A700 }}>{token.symbol[0]}</Avatar>
      )}
      {token.type === "token" ? (
        <TollIcon fontSize="large" color="secondary" />
      ) : (
        <TokenIcon fontSize="large" color="secondary" />
      )}
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Typography variant="h6" noWrap>
          [{token.symbol}] {token.name}
        </Typography>
        <Typography variant="body2" noWrap color={"GrayText"}>
          {token.address}
        </Typography>
      </Box>
    </Card>
  );
};
