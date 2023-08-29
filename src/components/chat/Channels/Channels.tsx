import React, { useState } from "react";
import "./styles.scss";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import MissedVideoCallOutlinedIcon from "@mui/icons-material/MissedVideoCallOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import serverAPI from "../../../api/severApi";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuDropdown from "../MenuDropdown/MenuDropdown";
import { CHANNEL_TYPE, CHANNEL_TITLE } from "../../../configs/constant/channel";
import channelAPI from "../../../api/channelApi";

const Channel: React.FC = (): JSX.Element => {
  const [server, setServer] = useState<IServer | null>(null);
  const [channels, setChannels] = useState<IChannel[] | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { serverId } = useParams();

  useQuery<IServer, Error>({
    queryKey: ["getServerByServerId", serverId],
    queryFn: async () => {
      return await serverAPI.getServerByServerId(serverId);
    },
    enabled: !!serverId,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      setServer(res);
    },
  });
  useQuery<IChannel[], Error>({
    queryKey: ["getChannelByServerId", serverId],
    queryFn: async () => {
      return await channelAPI.getAllChannelByServer(serverId);
    },
    enabled: !!serverId,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      setChannels(res);
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const textChannels = channels?.filter(
    (channel) => channel.type === CHANNEL_TYPE.TEXT
  );
  const audioChannels = channels?.filter(
    (channel) => channel.type === CHANNEL_TYPE.AUDIO
  );
  const videoChannels = channels?.filter(
    (channel) => channel.type === CHANNEL_TYPE.VIDEO
  );
  // const members = server?.members.filter((member) => member.userId !== profile.id)

  const renderChannelIcon = (type: string) => {
    switch (type) {
      case CHANNEL_TYPE.AUDIO:
        return <KeyboardVoiceOutlinedIcon />;
      case CHANNEL_TYPE.VIDEO:
        return <MissedVideoCallOutlinedIcon />;
      default:
        return <ClearAllIcon />;
    }
  };

  const rederChannel = (listChannels: IChannel[], type: string) => {
    return listChannels.map((channel) => {
      return (
        <NavLink
          to={`channel/${channel._id}`}
          key={channel._id}
          className={({ isActive }) =>
            `channel-item ${isActive ? "active" : "inactive"} `
          }
        >
          {renderChannelIcon(type)}
          <p>{channel.name}</p>
        </NavLink>
      );
    });
  };

  const renderChannelContainer = (
    listChannels: IChannel[] | undefined,
    type: string
  ) => {
    if (!!listChannels?.length) {
      return (
        <div className="channel-container__main-box">
          <div className="channel-container__main-box__header">
            <h4>{CHANNEL_TITLE[type]}</h4>
            <span>
              <AddOutlinedIcon fontSize="small" />
            </span>
          </div>
          {rederChannel(listChannels, type)}
        </div>
      );
    }
  };

  return (
    <>
      <div className="channel-container">
        {!!server && (
          <>
            <div className="channel-container__header" onClick={handleClick}>
              <h3>{server?.name}</h3>
              <KeyboardArrowDownIcon />
            </div>
            <div className="channel-container__main">
              {renderChannelContainer(textChannels, CHANNEL_TYPE.TEXT)}
              {renderChannelContainer(audioChannels, CHANNEL_TYPE.AUDIO)}
              {renderChannelContainer(videoChannels, CHANNEL_TYPE.VIDEO)}
            </div>
          </>
        )}
      </div>
      <MenuDropdown anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};

export default Channel;
