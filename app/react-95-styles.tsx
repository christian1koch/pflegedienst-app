"use client";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { styleReset } from "react95";
import original from "react95/dist/themes/original";

export function React95Styles({ children }: { children: React.ReactNode }) {
  const GlobalStyles = createGlobalStyle`
    ${styleReset}
    @font-face {
        font-family: 'ms_sans_serif';
        src: url('/ms_sans_serif.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
    }
    @font-face {
        font-family: 'ms_sans_serif';
        src: url('/ms_sans_serif_bold.woff2') format('woff2');
        font-weight: bold;
        font-style: normal;
    }
    body {
        font-family: 'ms_sans_serif';
    }
    `;
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={original}>{children}</ThemeProvider>
    </>
  );
}
