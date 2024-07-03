"use client";

import * as React from "react";
import { getSession } from "next-auth/react";
import { type NextPageContext } from "next";
import TrackLayout from "../components/layouts/TrackLayout";
import {
  AppBar,
  Backdrop,
  Button,
  Card,
  Container,
  type Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Link from "next/link";
import { SearchBar } from "../components/ui/SearchBar";
import { useSearchingTokenInfo } from "../stores/useSearchingTokenInfo";
import { useGetTokenOptions } from "../hooks/useGetTokensOptions";
import { ListSelectedTokens } from "../components/ui/ListSelectedTokens";
import { useAddTokensToUser } from "../hooks/useAddTokensToUser";
import { useAlerts } from "../stores/useAlerts";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";

export default function TrackProjects() {
  const router = useRouter();
  const state = useSearchingTokenInfo((state) => state);
  const options = useGetTokenOptions(state.term);
  const alerts = useAlerts((state) => state);
  const addTokensToUser = useAddTokensToUser({
    onSuccess: () => {
      alerts.onSuccess("Tokens added to user");
      void router.push("/dashboard");
    },
    onError: () => {
      alerts.onError("Error adding tokens to user");
    },
  });

  return (
    <TrackLayout>
      <Container maxWidth="md" sx={{ pt: 12 }}>
        <Card sx={{ position: "sticky", top: 72, zIndex: 1 }} elevation={16}>
          <SearchBar
            onChange={state.setValue}
            onInput={state.setTerm}
            loading={options.isLoading}
            options={options.data}
          />
        </Card>
        <ListSelectedTokens
          tokens={state.value ?? []}
          onCheckedBookmark={(checked, index) => {
            state.setBookmarked(checked, index);
          }}
          onDelete={(index) => {
            state.deleteValue(index);
          }}
        />
      </Container>
      <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }} color="default">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href={"/dashboard"}>
              <Button
                variant="text"
                startIcon={<KeyboardBackspaceIcon />}
                size="large"
              >
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Back
                </Typography>
              </Button>
            </Link>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ ml: "auto", mr: { md: 8, xs: 4 }, py: 2, px: 8, my: 2 }}
              disabled={!state.value?.length}
              onClick={() => {
                if (!state.value) return;

                addTokensToUser.mutate(
                  state.value.map((token) => ({
                    address: token.address,
                    tokenId: Number(token.tokenId),
                    bookmarked: !!token.bookmarked,
                    type: token.type,
                  }))
                );
              }}
            >
              Save
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
        }}
        open={addTokensToUser.isPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </TrackLayout>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin?callbackUrl=%2Ftrack-projects",
      },
    };
  }

  return {
    props: {},
  };
};
