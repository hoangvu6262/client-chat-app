import React from "react";
import { Outlet } from "react-router-dom";

const ChatRoomLayout = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default ChatRoomLayout;
