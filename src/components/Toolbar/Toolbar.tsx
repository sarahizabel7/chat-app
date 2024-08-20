import { indigo, lightBlue } from "@mui/material/colors";
import { Avatar, Toolbar as MuiToolbar, Typography } from "@mui/material";
import { useContacts } from "../../hooks";

const Toolbar = () => {
  const { contactsList, selectedContactId } = useContacts();

  const selectedContact = contactsList.find(
    (contact) => contact.id === selectedContactId
  );

  return (
    <MuiToolbar style={{ gap: 10, backgroundColor: indigo[400] }}>
      <Avatar
        sx={{ bgcolor: lightBlue[200] }}
        alt={selectedContact?.name}
        src={selectedContact?.avatar}
      />

      <Typography variant="h6" noWrap component="div">
        {selectedContact?.name}
      </Typography>
    </MuiToolbar>
  );
};

export { Toolbar };
