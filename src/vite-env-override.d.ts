// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { CustomTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CustomTheme {
    sizes?: {
      drawerWidth?: number;
    };
  }

  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}
