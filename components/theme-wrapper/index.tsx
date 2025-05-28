"use client";

import type { AppProps } from "next/app";
import GlobalStyle from "../ui/GlobalStyleWrapper";
import { ThemeProvider } from "styled-components";
import { RootState } from "@/redux/store";
import { lightMode, darkMode } from "@/utils/colors";
import { useSelector } from "react-redux";

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector((state: RootState) => state.app.theme);
  const themeObject = theme === "lightMode" ? lightMode : darkMode;

  return (
    <ThemeProvider theme={themeObject}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
