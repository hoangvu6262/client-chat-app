import { useContext } from "react";
import { Outlet } from "react-router-dom";
import MessengerProvider from "../../configs/context/MessengerContext";
import ServerSideBar from "../../components/server/ServerSidebar/ServerSideBar";
import Contact from "../../components/chat/Contact/Contact";
import { MessengerContext } from "../../configs/context/MessengerContext";

import "./styles.scss";

import { QueryClient, QueryClientProvider } from "react-query";

type Props = {};

// Create a client
const queryClient = new QueryClient();

const ChatRoomLayout = (props: Props) => {
  const { messState } = useContext(MessengerContext);
  const { contacts } = messState;

  const handleChatChange = (contact: IUser) => {
    // setCurrentChat(contact);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <MessengerProvider>
        <div className="chat-container">
          <div className="container">
            <ServerSideBar />
            <Contact contacts={contacts} changeChat={handleChatChange} />
            <Outlet />
          </div>
        </div>
      </MessengerProvider>
    </QueryClientProvider>
  );
};

export default ChatRoomLayout;
