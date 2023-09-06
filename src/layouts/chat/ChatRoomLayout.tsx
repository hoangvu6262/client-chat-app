import React from "react";
import { Outlet } from "react-router-dom";
import Channel from "../../components/chat/Channels/Channels";

const ChatRoomLayout = () => {
  return (
    <React.Fragment>
      <Channel />
      <Outlet />
    </React.Fragment>
  );
};

export default ChatRoomLayout;
