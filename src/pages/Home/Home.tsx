import { AppBar, Box, styled, useTheme } from "@mui/material";
import { ChatDisplay } from "../../components/ChatDisplay";
import { ContactsList } from "../../components/ContactsList";
import { useContacts } from "../../hooks";
import { Toolbar } from "../../components/Toolbar";

const Home = () => {
  const { contactsList, setSelectedContactId } = useContacts();
  const theme = useTheme();

  const drawerWidth = theme.sizes?.drawerWidth;

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <AppBar
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar />
      </AppBar>
      <Offset />
      <Box display="flex" height="100%" width="100%">
        <ContactsList contacts={contactsList} onSelect={setSelectedContactId} />
        <ChatDisplay />
      </Box>
    </Box>
  );
};

export { Home };

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
