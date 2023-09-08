import ClearAllIcon from "@mui/icons-material/ClearAll";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import MissedVideoCallOutlinedIcon from "@mui/icons-material/MissedVideoCallOutlined";

const types = {
  text: ClearAllIcon,
  audio: KeyboardVoiceOutlinedIcon,
  video: MissedVideoCallOutlinedIcon,
};

type Props = {
  type: ChannelType;
};

const ChannelIcon: React.FC<Props> = ({ type }) => {
  const ChannelIcons = types[type];

  return (
    <>
      <ChannelIcons />
    </>
  );
};

export default ChannelIcon;
