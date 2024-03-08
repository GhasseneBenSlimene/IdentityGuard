import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    if (!user) {
      axios
        .get("/Profile")
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => console.log(`UserContextProvider error: ${err}`));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
