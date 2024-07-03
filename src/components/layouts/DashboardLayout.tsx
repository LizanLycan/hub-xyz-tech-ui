import type { PropsWithChildren } from "react";
import RootLayout from "./RootLayout";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <RootLayout>
      <AppBar position="fixed" color="secondary">
        <Container maxWidth="xl">
          <Toolbar>
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
            <Link href={"/track-projects"}>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                sx={{ mr: 2, flexGrow: 1 }}
              >
                Add projects
              </Button>
            </Link>
            <ConnectButton />
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </RootLayout>
  );
}
