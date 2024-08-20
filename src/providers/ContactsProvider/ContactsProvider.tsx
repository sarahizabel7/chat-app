import { createContext, useState, useCallback, useEffect } from "react";
import { Contact } from "../../types";
import { contacts } from "../../mocks";
import { useUserSession } from "../../hooks";
import { DEFAULT_API_TIMEOUT } from "../../consts";

type ContactsContextType = {
  selectedContactId: string;
  contactsList: Contact[];
  setSelectedContactId: (contactId: string) => void;
  setContactsList: (contacts: Contact[]) => void;
  loading: boolean;
};

const noop = () => {};
const ContactsContext = createContext<ContactsContextType>({
  selectedContactId: "",
  contactsList: [],
  setSelectedContactId: noop,
  setContactsList: noop,
  loading: true,
});

const ContactsProvider = ({ children }: { children: React.ReactElement }) => {
  const { loggedUser } = useUserSession();
  const [selectedContactId, setSelectedContactId] = useState<string>(
    contacts[0].id
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [contactsList, setContactsList] = useState<Contact[]>([]);

  const setSelectedContact = useCallback((contactId: string) => {
    setSelectedContactId(contactId);
  }, []);

  const setContactsListFn = useCallback((contacts: Contact[]) => {
    setContactsList(contacts);
  }, []);

  const fetchContacts = () => {
    setLoading(true);
    setTimeout(() => {
      setContactsList(contacts);
      setLoading(false);
    }, DEFAULT_API_TIMEOUT);
  };

  useEffect(() => {
    if (loggedUser?.sessionToken) fetchContacts();
  }, [loggedUser?.sessionToken]);

  return (
    <ContactsContext.Provider
      value={{
        selectedContactId,
        contactsList,
        setSelectedContactId: setSelectedContact,
        setContactsList: setContactsListFn,
        loading,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
export { ContactsContext };
