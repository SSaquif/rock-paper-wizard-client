import { globalCss } from "@stitches/react";

const globalStyles = globalCss({
  // Use dvh/dvw & use percentage-based heights as fallback (need to test if fallback works)
  "html,body": {
    height: `100%; height: 100dvh`,
    width: `100%; width: 100dvw`,
  },
  // inherit height and width from parent
  "#root": {
    height: "inherit",
    width: "inherit",
  },
});

export default globalStyles;
