import { useContext, useRef, useState } from "react";
import "./styles.scss";
import { UserButton } from "@clerk/clerk-react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "react-query";

import { MessengerContext } from "../../../configs/context/MessengerContext";
import serverAPI from "../../../api/severApi";
import ServerItems from "../ServerItems/ServerItems";
import ServerModal from "../ServerModal/ServerModal";
import { RefType } from "../ServerModal/ServerModal";

const ServerSideBar = () => {
  const [servers, setServers] = useState<IServer[]>([]);
  const modalRef = useRef<RefType>(null);
  const { messState } = useContext(MessengerContext);
  const { currentUser } = messState;

  // Queries
  useQuery<IServer[], Error>({
    queryKey: ["getAllServerByUserId", currentUser?.userId],
    queryFn: async () => {
      return await serverAPI.getAllServerByUserId(currentUser?.userId);
    },
    enabled: !!currentUser?.userId,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      setServers(res);
    },
  });

  const handleOpenModal = () => {
    modalRef.current?.onToggle();
  };

  return (
    <div className="server-sidebar">
      <div className="server-sidebar__add">
        <IconButton
          aria-label="Add server"
          size="medium"
          onClick={handleOpenModal}
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
        <hr></hr>
      </div>
      <div className="server-sidebar__main">
        <ServerItems listServers={servers} />
      </div>
      <div className="server-sidebar__current-user">
        <UserButton afterSignOutUrl="/" />
      </div>
      <ServerModal ref={modalRef} />
    </div>
  );
};

export default ServerSideBar;
