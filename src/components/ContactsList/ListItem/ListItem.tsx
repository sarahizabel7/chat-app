import {
  ListItem as MuiListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Avatar,
} from "@mui/material";
import deepOrange from "@mui/material/colors/deepOrange";
import { Contact } from "../../../types";
import { useDetectDevice } from "../../../hooks";

type ListItemProps = {
  contact: Contact;
  onSelect: (contactId: string) => void;
  selected: boolean;
};

const ListItem = ({ contact, onSelect, selected }: ListItemProps) => {
  const { isDesktop, isMobile } = useDetectDevice();

  return (
    <MuiListItem disablePadding>
      <ListItemButton
        onClick={() => onSelect(contact.id)}
        selected={selected}
        disableGutters={isMobile}
        sx={{ justifyContent: "center" }}
      >
        <ListItemAvatar sx={{ minWidth: isMobile ? "auto" : "56px" }}>
          <Avatar
            sx={{ bgcolor: deepOrange[500] }}
            alt={contact.name}
            src={contact.avatar}
          />
        </ListItemAvatar>
        {isDesktop && (
          <ListItemText primary={contact.name} secondary={contact.phone} />
        )}
      </ListItemButton>
    </MuiListItem>
  );
};

export { ListItem };
