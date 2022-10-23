import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { NavigationProgress } from "@mantine/nprogress";
import { QueryClientProvider } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { queryClient } from "@/lib/react-query";
import { ColorScheme, colorSchemeAtom } from "@/stores/colorSchemeAtom";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
            <NavigationProgress />
            <NotificationsProvider>
              <ModalsProvider>
                <BrowserRouter>{children}</BrowserRouter>
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  );
};
