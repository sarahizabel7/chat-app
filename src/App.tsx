import ContactsProvider from "./providers/ContactsProvider/ContactsProvider";
import UserSessionProvider from "./providers/UserSessionProvider/UserSessionProvider";
import { Home } from "./pages";
import { ThemeProvider } from "@mui/material";
import MessagesProvider from "./providers/ChatProvider/ChatProvider";
import { useMainTheme } from "./theme";

function App() {
  const theme = useMainTheme();
  return (
    <ThemeProvider theme={theme}>
      <UserSessionProvider>
        <ContactsProvider>
          <MessagesProvider>
            <Home />
          </MessagesProvider>
        </ContactsProvider>
      </UserSessionProvider>
    </ThemeProvider>
  );
}

export default App;
