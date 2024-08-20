import { useMediaQuery, useTheme } from "@mui/material";

const useDetectDevice = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return {
    isMobile: !matches,
    isDesktop: matches,
  };
};

export { useDetectDevice };
