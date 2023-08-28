import React, { useState } from "react";
import "./styles.scss";
import { useParams } from "react-router-dom";
import serverAPI from "../../../api/severApi";
import { useQuery } from "react-query";

type Props = {
  contacts: IUser[];
  changeChat: (contact: IUser) => void;
};

const Contact: React.FC<Props> = ({
  contacts = [],
  changeChat,
}): JSX.Element => {
  const [server, setServer] = useState<IServer | null>(null);

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

  // const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
  // const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
  // const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
  // const members = server?.members.filter((member) => member.userId !== profile.id)

  return (
    <div className="contact-container">
      <div className="brand">
        <h3>{server?.name}</h3>
      </div>
      <div className="contacts"></div>
    </div>
  );
};

export default Contact;
