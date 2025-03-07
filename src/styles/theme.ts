import { createTheme } from "@mantine/core";
export const theme = createTheme({
  /** Put your mantine theme override here */

  primaryColor: "admin",
  primaryShade: { light: 4, dark: 6 },
  colors: {
    admin: [
      "#cffce5",
      "#a3f7d0",
      "#67eeb8",
      "#2bdc9b",
      "#07ca89",
      "#009e6c",
      "#007e5a",
      "#016448",
      "#02523d",
      "#002e23",
    ],
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
  },
  radius: {
    md: "0.625rem",
  },
});
