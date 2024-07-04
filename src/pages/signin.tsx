"use client";

import * as React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import { useLogin } from "../hooks/useLogin";
import RootLayout from "@/components/layouts/RootLayout";

export default function SignIn() {
  const { isConnected } = useAccount();
  const login = useLogin();

  return (
    <RootLayout>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 32px)",
        }}
      >
        <Card
          elevation={8}
          sx={{
            p: 8,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" noWrap textAlign={"center"}>
            Login
          </Typography>
          <ConnectButton />
          {isConnected && (
            <Box>
              <Button
                color="secondary"
                size="large"
                variant="contained"
                onClick={async () => {
                  await login.handleLogin();
                }}
                sx={{ px: 8, py: 2 }}
              >
                <Typography variant="h6">Login</Typography>
              </Button>
            </Box>
          )}
        </Card>
      </Container>
    </RootLayout>
  );
}
