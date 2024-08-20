import { useContext } from "react";
import { UserSessionContext } from "../providers/UserSessionProvider";

const useUserSession = () => {
  return useContext(UserSessionContext);
};

export { useUserSession };
