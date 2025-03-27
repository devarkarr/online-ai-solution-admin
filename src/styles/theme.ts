import { createTheme } from "@mantine/core";
export const theme = createTheme({
  /** Put your mantine theme override here */

  primaryColor: "admin",
  primaryShade: { light: 4, dark: 6 },
  colors: {
    admin: [
      "#fff6d4",
      "#ffeaa8",
      "#ffda70",
      "#ffbd37",
      "#ffa710",
      "#f48c06",
      "#c76907",
      "#9e520e",
      "#7f450f",
      "#452105",
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
