import {
  getDefaultConfig,
  RainbowKitProvider,
  type Locale,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";

import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const config = getDefaultConfig({
  appName: "Technical Hub",
  projectId: "HUB_FRONTEND",
  chains: [mainnet],
  ssr: true,
});

const queryClient = new QueryClient();

const theme = createTheme({
  shape: {
    borderRadius: 16,
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { locale } = useRouter() as { locale: Locale };
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <AppCacheProvider {...pageProps}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            {ready ? (
              <RainbowKitProvider locale={locale}>
                <SessionProvider session={session}>
                  <Component {...pageProps} />
                </SessionProvider>
              </RainbowKitProvider>
            ) : null}
          </ThemeProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </AppCacheProvider>
  );
};

export default MyApp;
