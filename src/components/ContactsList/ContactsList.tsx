import { Divider, Drawer, List, Toolbar, useTheme } from "@mui/material";
import { Contact } from "../../types";
import { useContacts } from "../../hooks";
import { ListItem } from "./ListItem/ListItem";
import { SkeletonList } from "./ListItem/SkeletonList";

type ContactsListProps = {
  contacts: Contact[];
  onSelect: (contactId: string) => void;
};

function ContactsList({ contacts, onSelect }: ContactsListProps) {
  const { selectedContactId, loading } = useContacts();
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: theme.sizes?.drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: theme.sizes?.drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List disablePadding>
        {!loading ? (
          contacts.map((contact) => (
            <div key={contact.id}>
              <ListItem
                contact={contact}
                selected={selectedContactId === contact.id}
                onSelect={onSelect}
              />
              <Divider />
            </div>
          ))
        ) : (
          <SkeletonList />
        )}
      </List>
    </Drawer>
  );
}

export { ContactsList };
