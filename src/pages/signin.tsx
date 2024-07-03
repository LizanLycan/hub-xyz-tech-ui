"use client";

import * as React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Box, Button, Container, Typography } from "@mui/material";
import { useLogin } from "../hooks/useLogin";
import RootLayout from "@/components/layouts/RootLayout";

export default function SignIn() {
  const { address, isConnected } = useAccount();
  const login = useLogin();

  console.log({ address });

  return (
    <RootLayout>
      <Container maxWidth="xl">
        <Typography variant="h2" noWrap>
          Login
        </Typography>
        <ConnectButton />
        {isConnected && (
          <Box>
            <Box>Connected to {address}</Box>
            <Button
              onClick={async () => {
                await login.handleLogin();
              }}
            >
              Login
            </Button>
          </Box>
        )}
      </Container>
    </RootLayout>
  );
}
