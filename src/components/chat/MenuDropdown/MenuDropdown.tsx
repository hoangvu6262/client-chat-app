import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Divider from "@mui/material/Divider";

type Props = {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
};

const MenuDropdown = ({ anchorEl, handleClose }: Props) => {
  const open = Boolean(anchorEl);

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
          onClick={handleClose}
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
        <MenuItem onClick={handleClose}>
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
    </>
  );
};

export default MenuDropdown;
