import { useRef } from "react";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Divider from "@mui/material/Divider";

import { ChannelModalRefType } from "../ChannelModal/ChannelModal";
import { InviteModalRefType } from "../../server/InviteModal/InviteModal";
import ChannelModal from "../ChannelModal/ChannelModal";
import InviteModal from "../../server/InviteModal/InviteModal";

type Props = {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleAddChannel: (data: IChannel) => void;
};

const MenuDropdown = ({ anchorEl, handleClose, handleAddChannel }: Props) => {
  const open = Boolean(anchorEl);

  const channelRef = useRef<ChannelModalRefType>(null);
  const inviteRef = useRef<InviteModalRefType>(null);

  const handleOpenChannelModal = () => {
    channelRef.current?.onOpen();
  };

  const handleOpenInviteModal = () => {
    inviteRef.current?.onOpen();
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: "black",
            color: "#8e8f8e",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            padding: "5px 10px",
            mt: 1.5,
            width: 200,
            "& svg": {
              width: 19,
              height: 19,
            },
            " & .MuiMenuItem-root": {
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#3f3f46",
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleOpenInviteModal}
          style={{
            color: "#818cf8",
          }}
        >
          Invite People{" "}
          <GroupAddOutlinedIcon
            style={{
              color: "#818cf8",
            }}
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Server Settings <SettingsOutlinedIcon />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Manage Members <GroupOutlinedIcon />
        </MenuItem>
        <MenuItem onClick={handleOpenChannelModal}>
          Create Channel <TvOutlinedIcon />
        </MenuItem>
        <Divider
          style={{
            borderColor: "#8e8f8e",
          }}
        />
        <MenuItem
          onClick={handleClose}
          style={{
            color: "#f43f5f",
          }}
        >
          Delete Server{" "}
          <DeleteOutlineOutlinedIcon
            style={{
              color: "#f43f5f",
            }}
          />
        </MenuItem>
      </Menu>
      <ChannelModal ref={channelRef} addChannel={handleAddChannel} />
      <InviteModal ref={inviteRef} />
    </>
  );
};

export default MenuDropdown;
