import React, { useContext } from "react";

import ChatContainer from "../../../components/chat/ChatContainer/ChatContainer";
import { MessengerContext } from "../../../configs/context/MessengerContext";

const Messenger: React.FC = (): JSX.Element => {
  const { messState } = useContext(MessengerContext);
  const { currentChat } = messState;

  return (
    <>
      <ChatContainer currentChat={currentChat} />
    </>
  );
};

export default Messenger;
