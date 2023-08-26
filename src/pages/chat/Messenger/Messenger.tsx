import React, { useState } from "react";
import Contact from "../../../components/chat/Contact/Contact";
import Welcome from "../../../components/chat/Welcome";
import ChatContainer from "../../../components/chat/ChatContainer/ChatContainer";

const Messenger: React.FC = (): JSX.Element => {
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState<IUser | null>(null);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const handleChatChange = (contact: IUser) => {
    setCurrentChat(contact);
  };

  return (
    <div className="container">
      <Contact contacts={contacts} changeChat={handleChatChange} />
      {!currentChat ? <Welcome /> : <ChatContainer currentChat={currentChat} />}
    </div>
  );
};

export default Messenger;
