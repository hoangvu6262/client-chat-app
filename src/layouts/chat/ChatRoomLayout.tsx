import React from "react";
import { Outlet } from "react-router-dom";
import "./styles.scss";
import { useUser } from "@clerk/clerk-react";

type Props = {};

const ChatRoomLayout = (props: Props) => {
  const { isLoaded, isSignedIn, user } = useUser();

  console.log(isLoaded, isSignedIn, user);
  return (
    <div className="chat-container">
      <Outlet />
    </div>
  );
};

export default ChatRoomLayout;
