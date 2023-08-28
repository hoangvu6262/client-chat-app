import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { NavLink } from "react-router-dom";

import "./styles.scss";

type Props = {
  listServers: any;
};

type serverItemProps = { serverName: string; serverImage: string; id: string };

const ServerItem: React.FC<serverItemProps> = ({
  serverName,
  serverImage,
  id,
}) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `avatar-image ${isActive ? "active" : "inactive"} `
      }
      to={id}
    >
      <Avatar
        alt={serverName}
        src={serverImage}
        sx={{ width: 45, height: 45 }}
      />
    </NavLink>
  );
};

const ServerItems: React.FC<Props> = ({ listServers }) => {
  const renderServerList = () => {
    return (
      listServers &&
      listServers.map((server: any) => {
        return (
          <ServerItem
            key={server._id}
            id={server._id}
            serverName={server.name}
            serverImage={server.imageUrl}
          />
        );
      })
    );
  };

  return (
    <div className="server-list">
      <Stack direction="column" gap={2}>
        {renderServerList()}
      </Stack>
    </div>
  );
};

export default ServerItems;
