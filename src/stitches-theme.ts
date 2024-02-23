import { createStitches } from "@stitches/react";

const BREAKPOINTS = {
  tabletMin: 550,
  laptopMin: 1100,
  desktopMin: 1500,
};

export const { styled, css } = createStitches({
  media: {
    tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
    laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
    desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`,
  },
  theme: {
    colors: {
      // primary: "hsl(214, 100%, 50%)",
      // primaryLight: "hsl(214, 100%, 70%)",
      // primaryDark: "hsl(214, 100%, 30%)",
      // secondary: "hsl(0, 100%, 50%)",
      // secondaryLight: "hsl(0, 100%, 70%)",
      // secondaryDark: "hsl(0, 100%, 30%)",
      // background: "hsl(0, 0%, 95%)",
      // backgroundDark: "hsl(0, 0%, 10%)",
      // text: "hsl(0, 0%, 20%)",
      // textLight: "hsl(0, 0%, 80%)",
      // textDark: "hsl(0, 0%, 10%)",
    },
  },
});
