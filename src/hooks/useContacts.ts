import { useContext } from "react";
import { ContactsContext } from "../providers/ContactsProvider";

const useContacts = () => {
  return useContext(ContactsContext);
};

export { useContacts };
