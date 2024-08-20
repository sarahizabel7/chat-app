import { createContext, useState, useCallback } from "react";
import { User } from "../../types";
import { user } from "../../mocks";

type UserSessionContextType = {
  loggedUser: User | null;
  setLoggedUser: (user: User) => void;
};

const noop = () => {};
const UserSessionContext = createContext<UserSessionContextType>({
  loggedUser: null,
  setLoggedUser: noop,
});

const UserSessionProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [loggedUser, setLoggedUser] = useState<User>(user);

  const setLoggedUserFn = useCallback((user: User) => {
    setLoggedUser(user);
  }, []);

  return (
    <UserSessionContext.Provider
      value={{
        loggedUser,
        setLoggedUser: setLoggedUserFn,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};

export default UserSessionProvider;
export { UserSessionContext };
