import {
  Avatar,
  Backdrop,
  Box,
  Card,
  Divider,
  Grid,
  type Theme,
  Typography,
} from "@mui/material";
import { useGetUserTokens } from "../../hooks/useGetUserTokens";
import TollIcon from "@mui/icons-material/Toll";
import TokenIcon from "@mui/icons-material/Token";
import { blue } from "@mui/material/colors";
import { type TokenType } from "../../schemas/tokens.schema";
import CircularProgress from "@mui/material/CircularProgress";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export const UserTokenPanel = ({ type }: { type: TokenType }) => {
  const tokens = useGetUserTokens(type);

  return (
    <>
      <Grid container spacing={2}>
        {tokens.data?.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="center" color={"GrayText"}>
              No tokens found
            </Typography>
          </Grid>
        )}

        {!tokens.isLoading &&
          tokens.data?.map((token, index) => (
            <Grid
              key={`${token.name}.${index}`}
              item
              xs={12}
              sm={6}
              sx={{ position: "relative" }}
            >
              {token.bookmarked && (
                <BookmarkIcon
                  color={"warning"}
                  sx={{ position: "absolute", left: -2, top: 0, fontSize: 40 }}
                />
              )}

              <Card sx={{ p: 2 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}
                >
                  {token.logo ? (
                    <Avatar src={token.logo} alt={token.symbol} />
                  ) : (
                    <Avatar sx={{ bgcolor: blue.A700 }}>
                      {token.symbol[0]}
                    </Avatar>
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
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    Price
                  </Typography>
                  <Typography variant="h6" color={"GrayText"} noWrap>
                    {type === "token" ? "$" : ""} {token.price}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
        }}
        open={tokens.isPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
