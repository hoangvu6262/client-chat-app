import React, { useContext } from "react";

import Welcome from "../../../components/chat/Welcome/Welcome";
import ChatContainer from "../../../components/chat/ChatContainer/ChatContainer";
import { MessengerContext } from "../../../configs/context/MessengerContext";

const Messenger: React.FC = (): JSX.Element => {
  const { messState } = useContext(MessengerContext);
  const { currentUser, currentChat } = messState;

  return (
    <>
      {!currentChat ? (
        <Welcome username={currentUser ? currentUser.username : ""} />
      ) : (
        <ChatContainer currentChat={currentChat} />
      )}
    </>
  );
};

export default Messenger;
