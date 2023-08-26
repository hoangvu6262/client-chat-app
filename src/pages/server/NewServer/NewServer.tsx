import React, { useRef } from "react";
import ServerModal from "../../../components/server/ServerModel/ServerModal";

type Props = {};

const NewServer = (props: Props) => {
  const refModal = useRef(null);

  return (
    <div>
      <ServerModal ref={refModal} />
    </div>
  );
};

export default NewServer;
