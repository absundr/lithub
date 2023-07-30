import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const shadows = {
  outline: "0 0 0 3px var(--chakra-colors-pink-500)",
};

const fonts = {
  heading: `'Noto Sans', sans-serif`,
  body: `'Poppins', sans-serif`,
};

export const theme = extendTheme({
  fonts,
  colors,
  shadows,
});
