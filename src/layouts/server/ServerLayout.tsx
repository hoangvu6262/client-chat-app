import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

import MessengerProvider from "../../configs/context/MessengerContext";
import ServerSideBar from "../../components/server/ServerSidebar/ServerSideBar";
import Welcome from "../../components/chat/Welcome/Welcome";
import "./styles.scss";

const ServerLayout: React.FC = () => {
  const { channelId } = useParams();

  return (
    <MessengerProvider>
      <div className="chat-container">
        <div className="container">
          <ServerSideBar />
          <Outlet />
          {!!!channelId && <Welcome />}
        </div>
      </div>
    </MessengerProvider>
  );
};

export default ServerLayout;
