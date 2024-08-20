import { createTheme } from "@mui/material";
import { useDetectDevice } from "./hooks";

const useMainTheme = () => {
  const { isDesktop } = useDetectDevice();

  const theme = createTheme({
    sizes: {
      drawerWidth: isDesktop ? 400 : 60,
    },
    // TODO: Add custom palette here
  });

  return theme;
};

export { useMainTheme };
