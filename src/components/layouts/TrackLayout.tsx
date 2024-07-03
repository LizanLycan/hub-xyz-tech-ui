import type { PropsWithChildren } from "react";
import RootLayout from "./RootLayout";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function TrackLayout({ children }: PropsWithChildren) {
  return (
    <RootLayout>
      <AppBar position="fixed" color="secondary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href={"/dashboard"}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <KeyboardBackspaceIcon />
              </IconButton>
            </Link>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
                flexGrow: 1,
              }}
            >
              HUB XYZ
            </Typography>
            <ConnectButton />
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </RootLayout>
  );
}
