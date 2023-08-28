import React, { useReducer, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

type Messenger = {
  currentUser: IUser | null;
  currentChat: IUser | null;
  contacts: IUser[];
  server: IServer | null;
};

const initialState: Messenger = {
  server: null,
  contacts: [],
  currentChat: null,
  currentUser: null,
};

export const MessengerContext = React.createContext({
  messState: initialState,
});

const MessengerProvider = ({ children }: { children: React.ReactNode }) => {
  const [messState, dispatchMessState] = useReducer(
    (_state: Messenger, newState: Messenger) => ({
      ...newState,
    }),
    initialState
  );

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      dispatchMessState({
        ...messState,
        currentUser: {
          userId: user.id,
          username: `${user.firstName} ${user.lastName}`,
          avatarImage: user.imageUrl,
          email: user.emailAddresses[0].emailAddress,
        },
      });
    }
  }, [user]);

  return (
    <MessengerContext.Provider value={{ messState }}>
      {children}
    </MessengerContext.Provider>
  );
};

export default MessengerProvider;
